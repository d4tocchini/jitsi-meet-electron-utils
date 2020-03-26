const electron = require('electron');
const { app, ipcMain } = electron;
const {
    METHODS,
    POWER_MONITOR_EVENTS,
    POWER_MONITOR_EVENTS_CHANNEL,
    POWER_MONITOR_QUERIES_CHANNEL
} = require('./constants');

let browserWindow;

function _attachEvents(jitsiMeetWindow) {
    browserWindow = jitsiMeetWindow;
    let wc = jitsiMeetWindow.webContents;
    wc.once('destroyed', __detach);
    electron.powerMonitor.on('shutdown', power_on_shutdown);
    electron.powerMonitor.on('resume', power_on_resume);
    electron.powerMonitor.on('suspend', power_on_suspend);
    electron.powerMonitor.on('lock-screen', power_on_lock);
    electron.powerMonitor.on('unlock-screen', power_on_unlock);
    function power_on_shutdown() {wc.send(POWER_MONITOR_EVENTS_CHANNEL, {event:'shutdown'});}
    function power_on_resume() {wc.send(POWER_MONITOR_EVENTS_CHANNEL, {event:'resume'});}
    function power_on_suspend() {wc.send(POWER_MONITOR_EVENTS_CHANNEL, {event:'suspend'});}
    function power_on_lock() {wc.send(POWER_MONITOR_EVENTS_CHANNEL, {event:'lock-screen'});}
    function power_on_unlock() {wc.send(POWER_MONITOR_EVENTS_CHANNEL, {event:'unlock-screen'});}
    function __detach() {
        electron.powerMonitor.off('shutdown', power_on_shutdown);
        electron.powerMonitor.off('resume', power_on_resume);
        electron.powerMonitor.off('suspend', power_on_suspend);
        electron.powerMonitor.off('lock-screen', power_on_lock);
        electron.powerMonitor.off('unlock-screen', power_on_unlock);
    }
}

/**
 * The result from the querySystemIdleState or querySystemIdleTime to pass back
 * to Jitsi Meet.
 * @param id - Id of the request.
 * @param idleState - The result state retrieved.
 */
function systemIdleResult(id, idleState) {
    browserWindow.webContents.send(POWER_MONITOR_QUERIES_CHANNEL, {
        id,
        result: idleState,
        type: 'response'
    });
}

/**
 * The error result to pass back to Jitsi Meet.
 * @param id - Id of the request.
 * @param error - The error to send.
 */
function systemIdleErrorResult(id, error) {
    browserWindow.webContents.send(POWER_MONITOR_QUERIES_CHANNEL, {
        id,
        error,
        type: 'response'
    });
}

/**
 * Initializes the power monitor functionality in the main electron process.
 *
 * @param {BrowserWindow} jitsiMeetWindow - the BrowserWindow object which
 * displays Jitsi Meet
 */
module.exports = function setupPowerMonitorMain(jitsiMeetWindow) {
    if (app.isReady()) {
        _attachEvents(jitsiMeetWindow);
    } else {
        app.on('ready', () => _attachEvents(jitsiMeetWindow));
    }

    ipcMain.on(POWER_MONITOR_QUERIES_CHANNEL, (source, { id, data }) => {
        const { powerMonitor } = electron;

        switch(data.type) {
            case METHODS.queryIdleState:
                if (typeof powerMonitor.getSystemIdleState === 'function') { // electron 5+
                    systemIdleResult(id, powerMonitor.getSystemIdleState(data.idleThreshold));
                } else { // electron 4 or older
                    powerMonitor.querySystemIdleState(
                        data.idleThreshold,
                        idleState => {
                            systemIdleResult(id, idleState);
                        });
                }
                break;
            case METHODS.queryIdleTime:
                if (typeof powerMonitor.getSystemIdleTime === 'function') { // electron 5+
                    systemIdleResult(id, powerMonitor.getSystemIdleTime());
                } else { // electron 4 or older
                    powerMonitor.querySystemIdleTime(
                        idleTime => {
                            systemIdleResult(id, idleTime);
                        });
                }
                break;
            default: {
                const error = 'Unknown event type!';

                console.error(error);
                systemIdleErrorResult(id, error);
            }
        }
    });
};

/**
 * Types of METHODS.
 */
const METHODS = {
    queryIdleState: 'query-system-idle-state',
    queryIdleTime: 'query-system-idle-time'
};

/**
 * The power monitor events.
 * @type {{
 *  SUSPEND: string,
 *  LOCK_SCREEN: string,
 *  SHUTDOWN: string,
 *  ON_AC: string,
 *  ON_BATTERY: string,
 *  RESUME: string,
 *  UNLOCK_SCREEN: string}}
 */
const POWER_MONITOR_EVENTS = {
    ON_AC: 'on-ac', // win only
    ON_BATTERY: 'on-battery', // win only
    RESUME: 'resume',
    SHUTDOWN: 'shutdown', // mac / linux
    SUSPEND: 'suspend',
    LOCK_SCREEN: 'lock-screen' , // mac / win
    UNLOCK_SCREEN: 'unlock-screen'  // mac / win
};

/**
 * The name of power monitor messages exchanged with Jitsi Meet window.
 */
const POWER_MONITOR_MESSAGE_NAME = 'power-monitor';

/**
 * The name of the channel that exchange events between render and main process.
 * @type {string}
 */
const POWER_MONITOR_EVENTS_CHANNEL = 'power-monitor-events';

/**
 * The name of the channel that is used to query power monitor from render to main process.
 * @type {string}
 */
const POWER_MONITOR_QUERIES_CHANNEL = 'power-monitor-queries';

module.exports = {
    POWER_MONITOR_EVENTS,
    POWER_MONITOR_EVENTS_CHANNEL,
    POWER_MONITOR_MESSAGE_NAME,
    POWER_MONITOR_QUERIES_CHANNEL,
    METHODS
};


    // iframe.addEventListener('load', () => {

    //     iframe.contentWindow.JitsiMeetElectron = {
    //         /**
    //          * Get sources available for screensharing. The callback is invoked
    //          * with an array of DesktopCapturerSources.
    //          *
    //          * @param {Function} callback - The success callback.
    //          * @param {Function} errorCallback - The callback for errors.
    //          * @param {Object} options - Configuration for getting sources.
    //          * @param {Array} options.types - Specify the desktop source types
    //          * to get, with valid sources being "window" and "screen".
    //          * @param {Object} options.thumbnailSize - Specify how big the
    //          * preview images for the sources should be. The valid keys are
    //          * height and width, e.g. { height: number, width: number}. By
    //          * default electron will return images with height and width of
    //          * 150px.
    //          */
    //         async obtainDesktopStreams(callback, errorCallback, options = {})
    //         {
    //             try {
    //                 const sources = await electron
    //                     .desktopCapturer.getSources(options);
    //                 callback(sources);
    //              }
    //              catch(e) {
    //                  console.error(e)
    //                 errorCallback(e);
    //              }
    //                 // (error, sources) => {
    //                 //     debugger
    //                 //     if (error) {
    //                 //         errorCallback(error);
    //                 //         return;
    //                 //     }

    //                 //     callback(sources);
    //                 // });
    //         }
    //     };
    // });

const setupScreenSharingMain = require('./main');
const setupScreenSharingRender = require('./render');

module.exports = {
    setupScreenSharingMain,
    setupScreenSharingRender
};



const { ipcMain } = require('electron');

function initEventsHandler(mainWin, browserView) {
    const winContent = mainWin.webContents;
    const browserContent = browserView.webContents;

    ipcMain.handle('toogle-dev-tool', () => {
        if (winContent.isDevToolsOpened()) {
            winContent.closeDevTools();
        } else {
            winContent.openDevTools({ mode: 'detach' });
        }
    });

    ipcMain.handle('go-back', () => {
        browserContent.navigationHistory.goBack();
    });

    ipcMain.handle('can-go-back', () => {
        return browserContent.navigationHistory.canGoBack();
    });

    ipcMain.handle('go-forward', () => {
        browserContent.navigationHistory.goForward();
    });

    ipcMain.handle('refresh', () => {
        browserContent.reload();
    });

    ipcMain.handle('can-go-forward', () => {
        return browserContent.navigationHistory.canGoForward();
    });

    ipcMain.handle('go-to-page', (event, url) => {
        return browserContent.loadURL(url);
    });


    ipcMain.handle('current-url', () => {
        return browserContent.getURL();
    });
}

module.exports = { initEventsHandler };

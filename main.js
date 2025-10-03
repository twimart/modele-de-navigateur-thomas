const { app, WebContentsView, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Gestion globale des rejets de promesses non gérés
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.whenReady().then(() => {

  // BrowserWindow initiate the rendering of the angular toolbar
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Désactiver DevTools en production
      devTools: !app.isPackaged
    }
  });

  // Charger l'application Angular
  if (app.isPackaged) {
    // En mode production (packagé)
    win.loadFile(path.join(__dirname, 'dist/browser-template/browser/index.html'));
  } else {
    // En mode développement
    win.loadURL('http://localhost:4200');
    // Ouvrir DevTools uniquement en développement
    win.webContents.openDevTools({ mode: 'detach' });
  }

  // WebContentsView initiate the rendering of a second view to browser the web
  const view = new WebContentsView({
    webPreferences: {
      // Désactiver DevTools pour la vue web en production
      devTools: !app.isPackaged
    }
  });
  win.contentView.addChildView(view);

  // Always fit the web rendering with the electron windows
  function fitViewToWin() {
    const winSize = win.webContents.getOwnerBrowserWindow().getBounds();
    view.setBounds({ x: 0, y: 55, width: winSize.width, height: winSize.height });
  }

  // ÉTAPE 4: Écouter les événements de navigation de la WebContentsView
  // Mettre à jour l'URL dans la barre d'adresse lors de la navigation
  view.webContents.on('did-navigate', (event, url) => {
    win.webContents.send('update-url', url);
  });

  view.webContents.on('did-navigate-in-page', (event, url) => {
    win.webContents.send('update-url', url);
  });

  // Register events handling from the toolbar
  ipcMain.on('toogle-dev-tool', () => {
    // Permettre le toggle DevTools uniquement en développement
    if (!app.isPackaged) {
      if (view.webContents.isDevToolsOpened()) {
        view.webContents.closeDevTools();
      } else {
        view.webContents.openDevTools({ mode: 'detach' });
      }
    }
  });

  ipcMain.on('go-back', () => {
    view.webContents.navigationHistory.goBack();
  });

  ipcMain.handle('can-go-back', async () => {
    try {
      return view.webContents.navigationHistory.canGoBack();
    } catch (error) {
      console.error('Erreur can-go-back:', error);
      return false;
    }
  });

  ipcMain.on('go-forward', () => {
    view.webContents.navigationHistory.goForward();
  });

  ipcMain.handle('can-go-forward', async () => {
    try {
      return view.webContents.navigationHistory.canGoForward();
    } catch (error) {
      console.error('Erreur can-go-forward:', error);
      return false;
    }
  });

  ipcMain.on('refresh', () => {
    view.webContents.reload();
  });

  ipcMain.handle('go-to-page', async (event, url) => {
    try {
      await view.webContents.loadURL(url);
      return { success: true };
    } catch (error) {
      console.error('Erreur lors du chargement de la page:', error);
      throw error;
    }
  });

  ipcMain.handle('current-url', async () => {
    try {
      return view.webContents.getURL();
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'URL:', error);
      return '';
    }
  });

  // Register events handling from the main windows
  win.once('ready-to-show', () => {
    fitViewToWin();
    view.webContents.loadURL('https://amiens.unilasalle.fr');
  });

  win.on('resized', () => {
    fitViewToWin();
  });
});

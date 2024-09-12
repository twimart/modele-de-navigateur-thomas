const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  changeTitre: (titre) => ipcRenderer.send('set-title', titre)
})

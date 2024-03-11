import { contextBridge, ipcRenderer } from "electron";

const api = {
    closeApp: () => ipcRenderer.send('closeApp'),
    minimizeApp: () => ipcRenderer.send('minimizeApp'),
    setFullScreen: () => ipcRenderer.send('setFullScreen'),
    saveFile: () => ipcRenderer.send('saveFile'),
}

contextBridge.exposeInMainWorld('api', api);

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

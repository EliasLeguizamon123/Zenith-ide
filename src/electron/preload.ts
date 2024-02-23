import { contextBridge, ipcRenderer } from "electron";

const api = {
    closeApp: () => ipcRenderer.send('closeApp'),
}

contextBridge.exposeInMainWorld('api', api);

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

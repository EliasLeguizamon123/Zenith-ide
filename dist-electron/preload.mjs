"use strict";
const electron = require("electron");
const api = {
  closeApp: () => electron.ipcRenderer.send("closeApp")
};
electron.contextBridge.exposeInMainWorld("api", api);
electron.contextBridge.exposeInMainWorld("ipcRenderer", electron.ipcRenderer);

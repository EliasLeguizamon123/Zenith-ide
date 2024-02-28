"use strict";
const electron = require("electron");
const api = {
  closeApp: () => electron.ipcRenderer.send("closeApp"),
  minimizeApp: () => electron.ipcRenderer.send("minimizeApp"),
  setFullScreen: () => electron.ipcRenderer.send("setFullScreen")
};
electron.contextBridge.exposeInMainWorld("api", api);
electron.contextBridge.exposeInMainWorld("ipcRenderer", electron.ipcRenderer);

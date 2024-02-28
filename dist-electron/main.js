import * as url from "url";
import { app, BrowserWindow, ipcMain } from "electron";
let win;
app.whenReady().then(() => {
  win = new BrowserWindow({
    title: "Main window",
    frame: false,
    transparent: true,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      preload: url.fileURLToPath(new URL("preload.mjs", import.meta.url)),
      nodeIntegration: true,
      contextIsolation: true
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile("dist/index.html");
  }
});
ipcMain.on("closeApp", () => {
  app.quit();
});
ipcMain.on("minimizeApp", () => {
  win.hide();
});
ipcMain.on("setFullScreen", () => {
  win.setFullScreen(!win.isFullScreen());
});

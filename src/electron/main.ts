import * as url from "url";
import * as path from 'path';
import { app, BrowserWindow, ipcMain } from "electron";
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dialog } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
};

const indexHtml = join(ROOT_PATH.dist, 'dist/index.html');

app.whenReady().then(() => {
   const win = new BrowserWindow({
    title: "Main window",
    frame: false,
    transparent: true,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      preload: url.fileURLToPath(new URL("preload.mjs", import.meta.url)),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    // win.webContents.openDevTools();
  } else {
    // Load your file
    win.loadFile(indexHtml);

  }


  ipcMain.on("closeApp", () => {
    app.quit();
  });

  ipcMain.on("minimizeApp", () => {
    win.minimize();
  });

  ipcMain.on('setFullScreen', () => {
    win.setFullScreen(!win.isFullScreen());
  })

});

ipcMain.on('saveFile', () => {
  dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
})

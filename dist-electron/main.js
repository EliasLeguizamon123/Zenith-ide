import * as url from "url";
import { fileURLToPath } from "url";
import * as path from "path";
import { join } from "path";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public")
};
const indexHtml = join(ROOT_PATH.dist, "dist/index.html");
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
      contextIsolation: true
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(indexHtml);
  }
  ipcMain.on("closeApp", () => {
    app.quit();
  });
  ipcMain.on("minimizeApp", () => {
    win.minimize();
  });
  ipcMain.on("setFullScreen", () => {
    win.setFullScreen(!win.isFullScreen());
  });
});
ipcMain.on("saveFile", () => {
  dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] });
});
export {
  ROOT_PATH
};

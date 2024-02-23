import * as url from "url";
import { app, BrowserWindow } from "electron";
app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "Main window",
    webPreferences: {
      preload: url.fileURLToPath(new URL("preload.mjs", import.meta.url))
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile("dist/index.html");
  }
});

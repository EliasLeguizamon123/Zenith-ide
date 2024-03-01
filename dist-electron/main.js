import * as t from "url";
import { app as i, BrowserWindow as o, ipcMain as n } from "electron";
i.whenReady().then(() => {
  const e = new o({
    title: "Main window",
    frame: !1,
    transparent: !0,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      preload: t.fileURLToPath(new URL("preload.mjs", import.meta.url)),
      nodeIntegration: !0,
      contextIsolation: !0
    }
  });
  process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile("dist/index.html"), n.on("closeApp", () => {
    i.quit();
  }), n.on("minimizeApp", () => {
    e.minimize();
  }), n.on("setFullScreen", () => {
    e.setFullScreen(!e.isFullScreen());
  });
});

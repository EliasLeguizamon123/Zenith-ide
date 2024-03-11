import * as p from "url";
import { fileURLToPath as c } from "url";
import { app as t, BrowserWindow as d, ipcMain as o } from "electron";
import { exec as f } from "child_process";
import * as i from "path";
import { join as r } from "path";
import * as u from "os";
import * as h from "fs";
const R = c(import.meta.url), s = i.dirname(R), _ = {
  // /dist
  dist: r(s, "../.."),
  // /dist or /public
  public: r(s, t.isPackaged ? "../.." : "../../../public")
}, w = r(_.dist, "dist/index.html");
t.whenReady().then(() => {
  const e = new d({
    title: "Main window",
    frame: !1,
    transparent: !1,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      preload: p.fileURLToPath(new URL("preload.mjs", import.meta.url)),
      nodeIntegration: !0,
      contextIsolation: !0
    }
  });
  process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(w), o.on("closeApp", () => {
    t.quit();
  }), o.on("minimizeApp", () => {
    e.minimize();
  }), o.on("setFullScreen", () => {
    e.setFullScreen(!e.isFullScreen());
  }), E();
});
const E = async () => {
  f("ls -la", (e, l, F) => {
    if (e) {
      console.error(e);
      return;
    }
    const a = i.join(u.homedir(), "Desktop"), m = i.join(a, "carpeta.txt");
    h.writeFile(m, l, (n) => {
      if (n) {
        console.error(n);
        return;
      }
      console.log("File created");
    });
  });
};
export {
  _ as ROOT_PATH
};

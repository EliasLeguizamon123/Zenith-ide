import * as url from "url";
import { app, BrowserWindow, ipcMain } from "electron";
import { exec } from 'child_process';
import { join } from 'path';
import * as os from 'os';
import * as path from 'path';
import * as fs  from 'fs';
import { fileURLToPath } from 'url';

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
    transparent: false,
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

  checkFolders();
  
});


const checkFolders = async () => {
  
  exec('ls -la', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    const desktopPath = path.join(os.homedir(), 'Desktop');
    const filepath = path.join(desktopPath, 'carpeta.txt');

    fs.writeFile(filepath, stdout, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File created');
    })
    
  })
}
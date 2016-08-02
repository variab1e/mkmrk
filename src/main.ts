import electron = require("electron");
let app = electron.app;
let dialog = electron.dialog;
let BrowserWindow = electron.BrowserWindow;
let Menu = electron.Menu;

import { CONFIG } from './config'

// Global reference to the main window, so the garbage collector doesn't close it.
let mainWindow: Electron.BrowserWindow;

// Opens the main window, with a native menu bar.
function createWindow() {
  //mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow = new BrowserWindow(
    { 
    //  width: 800 ,
    //  height: 600 ,
      center: false ,
      title: CONFIG.Title ,
      icon: /** see https://github.com/electron/electron/blob/master/docs/api/native-image.md --> The window icon. On Windows it is recommended to use ICO icons to get best visual effects, you can also leave it undefined so the executable's icon will be used. **/ "",
      backgroundColor: /** String - Window's background color as Hexadecimal value, like #66CD00 or #FFF or #80FFFFFF (alpha is supported). Default is #FFF (white). **/ "#FFF",
      transparent: false
    });

  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
    {
      label: "Draw Symbol",
      submenu: [
        {
          label: "YHOO",
          click: () => {
            mainWindow.webContents.send("draw_symbol", "YHOO");
          }
        },
        {
          label: "CSCO",
          click: () => {
            mainWindow.webContents.send("draw_symbol", "CSCO");
          }
        },
        {
          label: "MSFT",
          click: () => {
            mainWindow.webContents.send("draw_symbol", "MSFT");
          }
        },
        {
          label: "Exit",
          click: () => {
            app.quit();
          }
        }
      ]
    }
  ]));

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Call 'createWindow()' on startup.
app.on("ready", () => {
  createWindow();
  if(CONFIG.Debug ) {
    BrowserWindow.addDevToolsExtension(CONFIG.DevTools.React);
    mainWindow.webContents.openDevTools();
  }
  if (process.argv[1] != "main.js") {
    mainWindow.webContents.on("did-finish-load", () => {
      mainWindow.webContents.send("load-file", process.argv[1]);
    });
  }
});

// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly
// with Cmd + Q.
app.on("window-all-closed", () => {
  //if (process.platform !== "darwin") {
    app.quit()
  //}
});

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other
// windows open.
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

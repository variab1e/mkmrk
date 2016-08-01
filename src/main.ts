import electron = require("electron");
let app = electron.app;
let dialog = electron.dialog;
let BrowserWindow = electron.BrowserWindow;
let Menu = electron.Menu;

namespace CONFIG {
  export let Debug:boolean = true;
  export let DevTools = {
    React: "/Users/ehiller/Library/Application Support/Google/Chrome/Profile 2/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0/"
  }
  
}

// Global reference to the main window, so the garbage collector doesn't close it.
let mainWindow: Electron.BrowserWindow;

// Opens the main window, with a native menu bar.
function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  let template = [
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
          label: "Foo",
          click: () => {
            mainWindow.webContents.send("draw_symbol", "YHOO");
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
  ];
  let menu: Electron.Menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  


  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Call 'createWindow()' on startup.
app.on("ready", () => {
  createWindow();
  if(CONFIG.Debug ) {
    mainWindow.webContents.openDevTools();
    BrowserWindow.addDevToolsExtension(CONFIG.DevTools.React);
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
  if (process.platform !== "darwin") {
    app.quit()
  }
});

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other
// windows open.
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


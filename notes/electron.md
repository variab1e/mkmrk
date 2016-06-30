# Electron

## Function and Execution

You must provide the relative or absolute path to the application directory that holds `package.json` in it. E.g., if `package.json` file of your app is located at `/home/user/my_awesome_app/package.json` then in order to start the app you must issue the following command:

```bash
electron /home/user/my_awesome_app
```

Also note that main property in `package.json` file indicates the entry point for your application. In your case it must be like this:

 ```javascript
 "main": "src/main.js"
 ```

## Debug

Electron consists of a main process (a custom Node.js build) and then multiple renderer processes (Chromium browser instances). The main process has access to the file system and other main system resources. The renderer processes are sandboxed. Each must be debugged in a different way.

See [Debugging the main process](http://electron.atom.io/docs/tutorial/debugging-main-process/)
[Some advice on the topic](http://stackoverflow.com/questions/31555122/debug-electron-using-visual-studio-code-on-mac)

[Debugging the rendering process](http://electron.rocks/debugging-electron-in-vs-code-revised/) must be done via the chrome-dev-tools extension in vscode.

## Chrome (Renderer) Command Line switches

<https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md>

## API Docs

<https://github.com/electron/electron/tree/master/docs/api>
# EH1 electron starting
[mkmrk github repo](https://github.com/erichiller/mkmrk)

**from electron-quickstart** This is a minimal Electron application based on the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](http://electron.atom.io/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start).

## To Use - Eric's Notes

* see the typescript transpiler `tsc`
    - [typescript docs](https://www.typescriptlang.org/docs/tutorial.html)
* use build `scripts` in `package.json`
* [example of electron typescript application](https://github.com/steve-perkins/MediaGallery/blob/master/renderer.ts)
* **DO NOT INCLUDE THE EXTENSION ON IMPORT STATEMENTS** ie. `import { Security } from './security';` NOT `import { Security } from './security.ts';`

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository`
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies and run the app
npm install && npm start
```


Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).



# GUI frameworks

* Angular2?
* [React](http://facebook.github.io/react/)

# Graphing

http://plottablejs.org/examples/finance/

https://github.com/palantir/plottable/wiki/Using-Plottable-With-Typescript-1.5

# Async Functions

_awesome_

<https://templecoding.com/blog/2016/02/17/async-await-with-es6-babel-and-typescript/>
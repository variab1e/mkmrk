
# installation & addition to package

```bash
npm install react-descktop react react-dom --save


typings install dt~react --global --save
typings install dt~react-dom --save


```

# setting up react

[tutorial](http://blog.mgechev.com/2015/07/05/using-jsx-react-with-typescript/)


http://www.typescriptlang.org/docs/handbook/react-&-webpack.html


Enable in `tsconfig.json` by adding: `"jsx": "react"`

Contents of code go into filenames with `.tsx` extension

# Rendering React / USING React

Start the rendering process 

```typescript
	UIwindow = document.getElementsByTagName("app")[0];
	DOM.render(<UIlauncher />,UIwindow);
```

* Where `UIwindow` is an HTML element in the in the actual document.
* and `UIlauncher` is the class to be rendered.
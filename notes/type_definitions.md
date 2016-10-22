# Typings

[Master Documentation](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

## @types

_**As of typescript 2.0 - typings is deprecated. You can read about it [here](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)**_

Now `npm` is used with the search format `npm install --save-dev @types/<package>` where `package` is the name of the package which you need definitions for. The definitions are installed into `node_modules/@types/<package>`. For more information, see the [typescript documentation].(https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)

_NOTE: `typings.json` and the `typings/` folder are no longer required._  

Search can be done here <https://www.npmjs.com/search?q=> for packages. OR <http://microsoft.github.io/TypeSearch/>  

### Creating @types

To define, an _@types_ package, In the `package.json`:

```json
{
  "devDependencies": {
    "@types/react-dom": "^0.14.18"
  },
  "types": "index.d.ts",
}
```

### Using definitions from a local file in `tsconfig.json` (rather than `@types`)

_For example if the types for the project react-desktop is 
Install using `npm install --save-dev file:../react-desktop.d/`

Add the `types` array to the project's `tsconfig.json`

```json
{
    "compilerOptions":
    {
        "types": [
            "react-desktop.d"
        ]
    },
    "include": [
        "node_modules/react-desktop.d"
    ],
}
```

## Repositories

[DefinitelyTyped is a central typings repository](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/react)

## Creating definition files (`*.d.ts`)

* `typings.json` is used per:
  1.  Upon `typings install <path><package>` the `typings.json` file is read.
  2. [typings.json file structure is discussed here](https://github.com/typings/discussions/issues/27)
  3. Configuration and [format of typings.json](https://github.com/typings/core/blob/master/src/interfaces/config.ts)
  + **GLOBAL DEPENDENCIES** are only listed as dependencies in `typings.json` they are printed upon install in the CLI/terminal, but are not actually installed. If the dependencies are listed as normal _dependencies_ then the entire typings of the dependency will be incorporated into the installed definition.

* The **Header** at the top of the final definition file should be [formatted](http://definitelytyped.org/guides/contributing.html) see [typescript-react](https://github.com/tastejs/todomvc/blob/gh-pages/examples/typescript-react/typings/classnames/classnames.d.ts) for an example.

* [Guide](https://typescript.codeplex.com/wikipage?title=Writing%20Definition%20%28.d.ts%29%20Files) 

* [Guide](https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html)
* [Advanced Guide](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/declaration%20files/Deep%20Dive.md)
* [Examples for Guide](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/declaration%20files/By%20Example.md)

* [Further Examples](https://github.com/typings/typings/blob/master/docs/examples.md)

* [Best Practices](http://definitelytyped.org/guides/best-practices.html)

* A discussion in **typings** about whether definition files should be in a single monolithic file or spread out across multiple files in the same style as the source itself can be found here discussing [file structure best practices](https://github.com/typings/discussions/issues/15).
    - _personally I think that the best idea is to replicate the source code structure_
    https://github.com/typings/discussions/issues?q=is%3Aissue+is%3Aclosed

* [Naming conventions for creation of typings](https://typescript.codeplex.com/wikipage?title=Writing%20Definition%20%28.d.ts%29%20Files)

* [The Typings FAQ](https://github.com/typings/typings/blob/master/docs/faq.md#writing-typings-definitions) offers some information as well on how to properly create definitions

### Closure Compiler can create Typings from JSDoc

[Closure-ts](https://github.com/teppeis/closure-ts/blob/master/README.md)

[JSDoc Tags for Closure](https://developers.google.com/closure/compiler/docs/js-for-compiler)

## Best Practices

* Start from the Project's Documentation, not their Source if possible
* Use _Namespaces_ for;
		- variable types
		- parameters
* Callbacks - (_functions as parameters_) - When writing the function signatures for these types, do not mark those parameters as optional. The right way to think of this is “What parameters will be provided?”, not “What parameters will be consumed?”.
* Extensible Declarations - using namespaces you can have a variable named the same in the current namespace, but with additional parameters...
	- [Declarations Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) for more details
* While both _Modules_ and _Namespaces_ perform the service of removing their contents from the _Global_ scope, **Modules** are more portable as they declare their dependencies internally ( with a normal `import` ) 
	
```typescript
interface SomePoint { x: number; y: number; }
declare var MyPoint: SomePoint;

interface SomePoint { z: number; }
MyPoint.z = 4; // OK
```


<https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html>


* Structure typings (of any medium-large project size) in multiple files -the same structure as the source itself; the same as if it were already a typescript library and `tsc -d` was run. <https://github.com/typings/typings/issues/354>


# Issues encountered

Experienced an issue where declaring a module after importing in declaration ( `*.d.ts` ) files would result in an error of `TS2664: Invalid module name in augmentation,`

```typescript

import { module } from 'file';

declare module 'newmodule' {
    somestuff
}
```

If I remove `import { module } from 'file';` then it would work.

As I write this on August 13th, 2016 - It appears that [Typescript 2.0 will have this fixed](https://github.com/Microsoft/TypeScript/issues/8113).

It related to how ambient modules are declared, the [spec details ambient module declarations out](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#12.2)


Can also put a catch-all `declare module '*';` statement into the file and import the file ala [typescript issue #2709](https://github.com/Microsoft/TypeScript/issues/2709).

# Examples

[typings for node by Basarat](https://github.com/basarat/ts-npm-module/blob/master/ts/typings/node/node.d.ts)

[further node typings](https://github.com/types/env-node/blob/master/0.12/node.d.ts)

[typings for knockout](https://github.com/typed-contrib/knockout/blob/master/global/index.d.ts)

[typings for expect](https://github.com/andrew-w-ross/typings-expect/blob/master/expect.d.ts)


# Typings software overview and usage (deprecated)

Typings is software to install definitions for javascript packages that were not written in typescript, and therefor do not have typings.

[typings overview](https://github.com/typings/typings)

[typings discussions on use and implementations](https://github.com/typings/discussions/issues?utf8=%E2%9C%93&q=is%3Aissue)

[typings installation](https://github.com/typings/typings/blob/master/docs/faq.md#where-do-the-type-definitions-install)

[typings Command line usage](https://github.com/typings/typings/blob/master/docs/commands.md)

## Building / '_Bundling_` typings 

`typings bundle --out <FILENAME-FOR-OUTPUT>`

The completed, **ready to use** typings are now in <FILENAME-FOR-OUTPUT>'

## How to publish typings

* [Yeoman Tool to create skeletal framework for typing/definition framework and publish to repo/npm](https://github.com/typings/generator-typings)

* How typings are resolved for npm packages, and how developers should list and create their [typings within their npm packages](https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html)
		- more discussion on the matter is in the [typings faq](https://github.com/typings/typings/blob/master/docs/faq.md#should-i-use-the-typings-field-in-packagejson)



----
# TESTING MARKDOWN IN VSCODE
----


## Fenced code blocks inside ordered and unordered lists

1. This is a numbered list.
2. I'm going to include a fenced code block as part of this bullet:

    ```
    Code
    More Code
    ```

3. We can put fenced code blocks inside nested bullets, too.
   1. Like this:
        ```c
        printf("Hello, World!");
        ```

   2. The key is to indent your fenced block by **(4 * bullet_indent_level)** spaces.
   3. Also need to put a separating newline above and below the fenced block.
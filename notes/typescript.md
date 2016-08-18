# Typescript

[handbook](https://www.typescriptlang.org/docs/tutorial.html)

[Official Wiki](https://github.com/Microsoft/TypeScript/wiki)

[Full Language Specification](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md)

## Module Resolution

http://www.typescriptlang.org/docs/handbook/module-resolution.html

_Importing Untyped Modules_

source material can be found in TypeScript/issues:
* #3019
* #6615

Typescript uses a difference module import format depending on whether the module has type definitions or not. Type definitions are natural if written in Typescript, otherwise they must be provided in the form of a definition file, typically a `.d.ts` also called a `typing`. The format for importing modules is the following...

For untyped modules use:

```typescript
let foo = require('foo');
```

(and)

For typed modules:

```typescript
import foo from 'foo';
```




## tsc (transpiler)

https://www.typescriptlang.org/docs/handbook/compiler-options.html

## tsconfig.json

https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

## tslint

[How to configure tslint.json](https://github.com/Microsoft/vscode-go/blob/master/tslint.json)

[TSLint vscode extension](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

## Debug

[How to debug Typescript in vscode](http://stackoverflow.com/questions/31169259/how-to-debug-typescript-files-in-visual-studio-code?rq=1)



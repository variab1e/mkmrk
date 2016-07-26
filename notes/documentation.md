# Documentation

## JSDOC

[overview](https://dzone.com/articles/introduction-jsdoc)

[official docs](http://usejsdoc.org/)

### General format

Typical format for a `symbol` (any item to be notated upon) is:
```js
/**
 * <description goes here>
 * @param {param-type} <param-name> - <param-description>
 * ....param(s).....
 * @returns {return-type} <return-description>
 */
```

_an alternate formula is_

```js
/**
 * @type {symbol-type}
 * @desc <description>
 */

```

_see `@param` below_

Also can terminate with `@throws {exceptionType} <description>`

Variables would use only the description(`@description`,`@desc`,or first line) and `@type` fields of the above listed fields.



### @param

[@param](http://usejsdoc.org/tags-param.html)

Is a parameter (input value) to a method or function.

```js
/**
 * @param {type} [varname] - description
 */
```

A variable in square brackets `[` and `]` signifies it is optional.

If a parameter can have multiple types, enter them with a vertical pipe separating them `|` like this `@param {type1|type2} description`.

# TypeDoc

[TypeDoc](http://typedoc.io/guides/usage.html)

## Usage

From the project root `typedoc --options typedoc.json src`

_where `src` is the directory relative to the project root containing the typescript source files, AND:_

**`typedoc.json` is:**

```json
{
  "module": "commonjs",
  "target": "es6",
  "moduleResolution": "node",

  "emitDecoratorMetadata": "true",
  "experimentalDecorators": "true",
  "mode": "modules",
  "out": "doc",
  "theme": "default",
  "ignoreCompilerErrors": "true",
  "preserveConstEnums": "true",
  "stripInternal": "true",
  "suppressExcessPropertyErrors": "true",
  "suppressImplicitAnyIndexErrors": "true"
}
```

## Pattern Matching

Uses [minimatch](https://github.com/isaacs/minimatch) - which is the same pattern matching as **node.js**

[Source Code using minimatching](https://github.com/TypeStrong/typedoc/blob/53bb762ad208f2be266ece767f6204159ce71a0d/src/lib/application.ts#L253)


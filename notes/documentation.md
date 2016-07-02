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
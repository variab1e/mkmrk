# Typings

## Typings software overview and usage

[typings overview](https://github.com/typings/typings)

[typings installation](https://github.com/typings/typings/blob/master/docs/faq.md#where-do-the-type-definitions-install)

[typings Command line usage](https://github.com/typings/typings/blob/master/docs/commands.md)

## Repositories

[DefinitelyTyped is a central typings repository](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/react)

## Creating definition files (`*.d.ts`)

* [Guide](https://typescript.codeplex.com/wikipage?title=Writing%20Definition%20%28.d.ts%29%20Files) 

* [Best Practices](http://definitelytyped.org/guides/best-practices.html)

* [file structure best practices](https://github.com/typings/discussions/issues/15)

* [Naming conventions for creation of typings](https://typescript.codeplex.com/wikipage?title=Writing%20Definition%20%28.d.ts%29%20Files)

* [The Typings FAQ](https://github.com/typings/typings/blob/master/docs/faq.md#writing-typings-definitions) offers some information as well on how to properly create definitions

## How to publish typings

* [Yeoman Tool to create skeletal framework for typing/definition framework and publish to repo/npm](https://github.com/typings/generator-typings)

* How typings are resolved for npm packages, and how developers should list and create their [typings within their npm packages](https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html)
		- more discussion on the matter is in the [typings faq](https://github.com/typings/typings/blob/master/docs/faq.md#should-i-use-the-typings-field-in-packagejson)




# Best Practices

* Start from the Project's Documentation, not their Source if possible
* Use _Namespaces_ for;
		- variable types
		- parameters
* Callbacks - (_functions as parameters_) - When writing the function signatures for these types, do not mark those parameters as optional. The right way to think of this is “What parameters will be provided?”, not “What parameters will be consumed?”.
* Extensible Declarations - using namespaces you can have a variable named the same in the current namespace, but with additional parameters...
	- [Declarations Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) for more details
	
```typescript
interface SomePoint { x: number; y: number; }
declare var MyPoint: SomePoint;

interface SomePoint { z: number; }
MyPoint.z = 4; // OK
```

* xxx

<https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html>

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
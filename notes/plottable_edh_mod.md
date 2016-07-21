
# Render path

1. Plot.renderImmediately()
2. Plot._paint()
3. _ANON_
4. Drawer.draw()




_extentsForProperty

# DrawStep

1. Applies attributes to datums to be drawn; such as `fill` and `stroke`
2. attributes to SVG elements
3. classname to svg elements

# Type `Accessor<T>`

```typescript
export interface Accessor<T> {
	(datum: any,
	index: number,
	dataset: Dataset): T;
}
```

# Type `Projector`

Retrieves a scaled datum property and passes the result of `Accessor` through `Scale`

```typescript
export type Projector = 
	(
		datum: any, 
		index: number, 
		dataset: Dataset
	) => any;
```

# type `AttributeToProjector`

A mapping from attributes (x, fill, etc) to function which retrieves to data

```typescript
type AttributeToProjector = {
	[attr:string]: Projector 
}
```

# type `AppliedProjector`

Projector which is attached to Dataset and returns attribute values for datum/index

```typescript
type AppliedProjector = (
	datum: any,
	index: number
): any;
```

# interface `Entity`

```typescript
interface Entity <C extends Component> {
	datum: any,
	position: Point,
	selection: d3.Selection<any>,
	component: C
}
```

# interface `PlotEntity`

```typescript
export interface PlotEntity extends Entity<Plot> {
	dataset: Dataset;
	index: number;
	component: Plot;
}
```

# Notes to Self

I am entirely unsure what `Plot.animated()` does, it appears that absolutely nothing uses it. It returns whether a plot will be animated.

`Plot._animateOnNextRender()` is run when `this._animate && this.dataChanged` evaluate to **true**

`Plot._dataChanged` is **true** when `Plot.anchor()` and `Plot.datasetupdate()` ...Bad note... validate?

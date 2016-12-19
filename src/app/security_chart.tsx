import * as React from 'react';

import { Security } from '../core/security';
import { elog } from '../lib/elog';

let fs = require("fs");
let Plottable = require("Plottable");
let d3 = require("d3");
let rd3 = require('react-d3-library');
let RD3Component = rd3.Component;


let cssPositiveColor = "GREEN";
let cssNegativeColor = "RED";

export class SecurityChart extends React.Component<any, any> {

	static defaultProps = {
		color: '#cc7f29',
		theme: 'light'
	};

	state = {
		d3: ""
	}

	_isMounted: boolean = false;

	constructor() {
		super();

	}

	/**
	 * componentDidMount fires when this component is loaded by React and ready for use
	 * It will fire once only
	 */
	componentDidMount() {
	//	this._isMounted = true;
		this.setState({d3: this.node(null)});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	node = data => {

		let node = document.createElement('div');

		let arg = "YHOO";
		elog(`loading security history for '${arg}'`);
		var stock = new Security(arg);
		stock.loadHistory("2016-01-14", "2016-02-26");
		let dataset = new Plottable.Dataset(stock.history, { name: stock.symbol });


		/** Create the SVG element and append to the DOM */
		let chartMain = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		chartMain.setAttribute("width", "550px");
		chartMain.setAttribute("height", "400px");
		//let svgNS = svg.namespaceURI;
		chartMain.id = "chartMain";
		node.appendChild(chartMain);

		/** Create the plottable scales */
		/** xScale is of type time */
		var xScale = new Plottable.Scales.Time();
		var xAxis = new Plottable.Axes.Time(xScale, "bottom");
		xAxis.formatter(Plottable.Formatters.multiTime());
		/** yScale is numeric/linear and formatted as currency */
		var yScale = new Plottable.Scales.Linear();
		var yAxis = new Plottable.Axes.Numeric(yScale, "left");
		yAxis.formatter(Plottable.Formatters.currency());
		var colorScale = new Plottable.Scales.Color();

		//	var dayRangePlot = new Plottable.Plots.Segment()
		var dayRangePlot = new Plottable.Plots.MarketBar()
			.attr("stroke-width", 1)
			.attr("stroke", function (d) { return (d.open > d.close ? cssPositiveColor : cssNegativeColor) })
			.x(function (d, index, dataset) { elog(`from d.x(${d.x}=>`, d); return d.x; }, xScale)
			.y(function (d, index, dataset) { elog(`from d.y(${d.y}=>`, d); return d.y; }, yScale)
			//		.attr("stroke", function (d, i, dataset) { return dataset.metadata().name; }, colorScale)
			//		.addDataset(new Plottable.Dataset(stock.history.getSeries(), { name: stock.symbol }))
			.addDataset(dataset)
			//		.showAllData();
			.autorangeMode("y");
		var pzi = new Plottable.Interactions.PanZoom(xScale, null);
		pzi.attachTo(dayRangePlot);

		let output = d3.select("hoverFeedbback");
		let outputDefaultText = "Closest:";
		output.text(outputDefaultText);

		//let plots = new Plottable.Components.Group([dayRangePlot, dayOpenPlot, dayClosePlot,symbolPlot]);
		let plots = new Plottable.Components.Group([dayRangePlot]);
		let chart = new Plottable.Components.Table([
			[yAxis, plots],
			[null, xAxis],
			//		[null, miniChart],
			//		[null, sparklineXAxis]
		]);

		d3.select(chartMain).on("mount", function() {
			chart.renderTo("svg#chartMain");

			elog(`x.domain=${xScale.domain()},x.range=${xScale.range()},y.domain=${yScale.domain()},y.range=${yScale.range()}`)

			let crosshair = new Crosshair(dayRangePlot);
			var pointer = new Plottable.Interactions.Pointer();
			pointer.onPointerMove(p => {
				let nearestEntity = dayRangePlot.entityNearest(p);
				if (nearestEntity.datum == null) {
					return;
				}
				crosshair.drawAt(nearestEntity.position);
				let datum = nearestEntity.datum;
				output.text("Closest: (" + datum.date.toLocaleString() + ", " + datum.close.toFixed(2) + ")");
			});
			pointer.onPointerExit(function () {
				crosshair.hide();
				output.text(outputDefaultText);
			});
			pointer.attachTo(dayRangePlot);

			/**
			 * WHAT TO RETURN ---
			 * NOT TO RENDER!!!!
			 */
			
		});
		

		return node
	}

	render() {
		return (
		<div>
			<RD3Component data={this.state.d3} />
		</div>
		)
	}

}


class Crosshair {

	private _crosshairContainer;
	private _vline;
	private _circle;

	constructor(private _plot) {
		this._crosshairContainer = this._plot.foreground().append("g").style("visibility", "hidden");
		this._vline = this._crosshairContainer.append("line")
			.attr("stroke", "black")
			.attr("y1", 0)
			.attr("y2", this._plot.height());
		this._circle = this._crosshairContainer.append("circle")
			.attr("stroke", "black")
			.attr("fill", "white")
			.attr("r", 3);
	}
	drawAt(p) {
		this._vline.attr({
			x1: p.x,
			x2: p.x
		});
		this._circle.attr({
			cx: p.x,
			cy: p.y
		});
		this._crosshairContainer.style("visibility", "visible");
	}

	hide() {
		this._crosshairContainer.style("visibility", "hidden");
	}
}



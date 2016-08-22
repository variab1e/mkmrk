import electron = require("electron");
import { Security } from './core/security';
import { elog } from './lib/elog';
import { Day } from './core/day';

import * as React from 'react';
import * as DOM from 'react-dom';
import { UIlauncher , UIwindow } from './app/frame';

let ipcRenderer = electron.ipcRenderer;
let fs = require("fs");
let Plottable = require("Plottable");
let d3 = require("d3");

let cssPositiveColor = "GREEN";
let cssNegativeColor = "RED";

// Upon startup
DOM.render(<UIlauncher />,UIwindow);

// Receive log messages from the main process, which cannot access the dev tools console directly.
ipcRenderer.on("send-console", (event, arg) => {
	elog(arg);
});

/**
 * Render the graph of the input stock ticker.
 * @param {string} event
 * @param {string} arg - intended to be the stock ticker
 */
ipcRenderer.on("draw_symbol", (event, arg) => {
	/** Load the security */
	elog(`loading security history for '${arg}'`);
	var stock = new Security(arg);
	stock.loadHistory("2016-01-14", "2016-02-26");
	let dataset = new Plottable.Dataset(stock.history, { name: stock.symbol });


	/** Create the SVG element and append to the DOM */
	let chartMain = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	chartMain.setAttribute("width", "100%");
	chartMain.setAttribute("height", "400px");
	//let svgNS = svg.namespaceURI;
	chartMain.id = "chartMain";
	document.body.appendChild(chartMain);

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

/**
	let sparklineXScale = new Plottable.Scales.Time();
	let sparklineXAxis = new Plottable.Axes.Time(sparklineXScale, "bottom");
	let sparklineYScale = new Plottable.Scales.Linear();
	let sparkline = new Plottable.Plots.Line();
	sparkline.x(function (d) { return d.x; }, sparklineXScale).y(function (d) { return d.y; }, sparklineYScale);
	sparkline.attr("stroke", function (d, i, dataset) { return dataset.metadata().name; }, colorScale);
	sparkline.addDataset(dataset);
**
	let dragBox = new Plottable.Components.XDragBoxLayer();
	dragBox.resizable(true);
	dragBox.onDrag(function (bounds) {
		var min = sparklineXScale.invert(bounds.topLeft.x);
		var max = sparklineXScale.invert(bounds.bottomRight.x);
	});
	dragBox.onDragEnd(function (bounds) {
		if (bounds.topLeft.x === bounds.bottomRight.x) {
			xScale.domain(sparklineXScale.domain());
		}
	})

	xScale.onUpdate(function () {
		dragBox.boxVisible(true);
		let xDomain = xScale.domain();
		dragBox.bounds({
			topLeft: { x: sparklineXScale.scale(xDomain[0]), y: null },
			bottomRight: { x: sparklineXScale.scale(xDomain[1]), y: null }
		});
	});
	var miniChart = new Plottable.Components.Group([sparkline, dragBox]);
*/
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
	/** only set rowWeight if I have more than 2x2 grid for chart/Components.Table */
	//chart.rowWeight(2, 0.2);
	/** render the chart to the SVG element */
	chart.renderTo("svg#chartMain");

	elog(`x.domain=${xScale.domain()},x.range=${xScale.range()},y.domain=${yScale.domain()},y.range=${yScale.range()}`)

	let crosshair = new Crosshair(dayRangePlot);
	var pointer = new Plottable.Interactions.Pointer();
	pointer.onPointerMove( p => {
		let nearestEntity = dayRangePlot.entityNearest(p);
		if (nearestEntity.datum == null) {
			return;
		}
		crosshair.drawAt(nearestEntity.position);
		let datum = nearestEntity.datum;
		output.text("Closest: (" + datum.date.toLocaleString() + ", " + datum.close.toFixed(2) + ")");
	});
	pointer.onPointerExit(function() {
		crosshair.hide();
		output.text(outputDefaultText);
	});
	pointer.attachTo(dayRangePlot);

});


class Crosshair {

	private _crosshairContainer;
	private _vline;
	private _circle;

	constructor(private _plot){
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



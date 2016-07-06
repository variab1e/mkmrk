import electron = require("electron");
import { Security } from './security';
import { eLog } from './elog';
import { Day } from './day';
let ipcRenderer = electron.ipcRenderer;
let fs = require("fs");
let Plottable = require("Plottable");
let d3 = require("d3");


// Receive log messages from the main process, which cannot access the dev tools console directly.
ipcRenderer.on("send-console", (event, arg) => {
	console.log(arg);
});

/**
 * Render the graph of the input stock ticker.
 * @param {string} event
 * @param {string} arg - intended to be the stock ticker
 */
ipcRenderer.on("draw_symbol", (event, arg) => {
	/** Load the security */
	eLog(`loading security history for '${arg}'`);
	var stock = new Security(arg);
	stock.loadHistory("2016-01-14", "2016-02-26");

	/** Create the SVG element and append to the DOM */
	let chartMain = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	//chartMain.setAttribute("width","100%");
	//chartMain.setAttribute("height","100%");
	//let svgNS = svg.namespaceURI;
	chartMain.id = "chartMain";
	document.body.appendChild(chartMain);

	/** Create the plottable scales */
	/** xScale is of type time */
	var xScale = new Plottable.Scales.Time();
	var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
//	xAxis.formatter(Plottable.Formatters.multiTime());
	/** yScale is numeric/linear and formatted as currency */
	var yScale = new Plottable.Scales.Linear();
	var yAxis = new Plottable.Axes.Numeric(yScale, "left");
	yAxis.formatter(Plottable.Formatters.currency());
	var colorScale = new Plottable.Scales.Color();

	console.log(`creating graph with series1= ${arg}`)
	//var series1 = new Plottable.Dataset(stock.history.getSeries(), { name: "series1" });


	var plot = new Plottable.Plots.Segment()
//		.x(function (d) { return new Day(d.date).toDate(); }, xScale)
//		.y(function (d) { return d.close; }, yScale)
//		.x2(function (d) { return new Day(d.date).toDate(); }, xScale)
//		.y2(function (d) { return d.open; }, yScale)
		.x(function (d) { return d.x; }, xScale)
		.y(function (d) { return d.y; }, yScale)
		.x2(function (d) { return d.x2; }, xScale)
		.y2(function (d) { return d.y2; }, yScale)
		.attr("stroke", function (d, i, dataset) { return dataset.metadata().name; }, colorScale)
		.addDataset(new Plottable.Dataset(stock.history.getSeries(), { name: stock.symbol }))
	//	.autorangeMode("y");
	
/** 
	var sparklineXScale = new Plottable.Scales.Time();
	var sparklineXAxis = new Plottable.Axes.Time(sparklineXScale, "bottom");
	var sparklineYScale = new Plottable.Scales.Linear();
	var sparkline = new Plottable.Plots.Line();
	sparkline.x(function (d) { return d.x; }, sparklineXScale).y(function (d) { return d.y; }, sparklineYScale);
	sparkline.attr("stroke", function (d, i, dataset) { return dataset.metadata().name; }, colorScale);
	sparkline.addDataset(series1);//.addDataset(series2);

	var dragBox = new Plottable.Components.XDragBoxLayer();
	dragBox.resizable(true);
	dragBox.onDrag(function (bounds) {
		var min = sparklineXScale.invert(bounds.topLeft.x);
		var max = sparklineXScale.invert(bounds.bottomRight.x);
		xScale.domain([min, max]);
	});
	dragBox.onDragEnd(function (bounds) {
		if (bounds.topLeft.x === bounds.bottomRight.x) {
			xScale.domain(sparklineXScale.domain());
		}
	});

	xScale.onUpdate(function () {
		dragBox.boxVisible(true);
		var xDomain = xScale.domain();
		dragBox.bounds({
			topLeft: { x: sparklineXScale.scale(xDomain[0]), y: null },
			bottomRight: { x: sparklineXScale.scale(xDomain[1]), y: null }
		});
	});
	var miniChart = new Plottable.Components.Group([sparkline, dragBox]);

	var pzi = new Plottable.Interactions.PanZoom(xScale, null);
	pzi.attachTo(plot);

	var output = d3.select("#hoverFeedback");
	var outputDefaultText = "Closest:"
	output.text(outputDefaultText);
**/
	var chart = new Plottable.Components.Table([
		[yAxis, plot],
		[null, xAxis],
//		[null, miniChart],
//		[null, sparklineXAxis]
	]);
	chart.rowWeight(2, 0.2);
	/** render the chart to the SVG element */
	chart.renderTo("svg#chartMain");
/** 
 * is this usable in node?
 * http://stackoverflow.com/questions/33141679/how-to-resize-chart-in-plottable-js
	window.addEventListener("resize", function() {
		plot.redraw();
	});
	**/
/** 
	//var crosshair = createCrosshair(plot);
	var pointer = new Plottable.Interactions.Pointer();
	pointer.onPointerMove(function (p) {
		var nearestEntity = plot.entityNearest(p);
		if (nearestEntity.datum == null) {
			return;
		}
		//crosshair.drawAt(nearestEntity.position);
		var datum = nearestEntity.datum;
		output.text("Closest: (" + datum.x.toLocaleString() + ", " + datum.y.toFixed(2) + ")");
	});
	pointer.onPointerExit(function () {
		//crosshair.hide();
		output.text(outputDefaultText);
	});
	pointer.attachTo(plot);
	**/
});
/** 
	var crosshairContainer = plot.foreground().append("g").style("visibility", "hidden");
class crosshair {
	
	crosshair.vLine = crosshairContainer.append("line")
					.attr("stroke", "black")
					.attr("y1", 0)
					.attr("y2", plot.height());
	crosshair.circle = crosshairContainer.append("circle")
					.attr("stroke", "black")
					.attr("fill", "white")
					.attr("r", 3);
	drawAt(p) {
		crosshair.vLine.attr({
			x1: p.x,
			x2: p.x
		});
		crosshair.circle.attr({
			cx: p.x,
			cy: p.y
		});
		crosshairContainer.style("visibility", "visible");
	}
	crosshair.hide = function() {
		crosshairContainer.style("visibility", "hidden");
	}
	return crosshair;
}



**/





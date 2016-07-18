import electron = require("electron");
import { Security } from './security';
import { elog } from './elog';
import { Day } from './day';
let ipcRenderer = electron.ipcRenderer;
let fs = require("fs");
let Plottable = require("Plottable");
let d3 = require("d3");

let cssPositiveColor = "GREEN";
let cssNegativeColor = "RED";


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

	/** Create the SVG element and append to the DOM */
	let chartMain = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	chartMain.setAttribute("width","100%");
	chartMain.setAttribute("height","800px");
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
	//yAxis.formatter(Plottable.Formatters.currency());
	//var colorScale = new Plottable.Scales.Color();

	elog(`creating graph with series1= ${arg}`)
	//var series1 = new Plottable.Dataset(stock.history.getSeries(), { name: "series1" });

	let dataset = new Plottable.Dataset(stock.history, { name: stock.symbol });

//	var dayRangePlot = new Plottable.Plots.Segment()
	var dayRangePlot = new Plottable.Plots.MarketBar()
		.attr("stroke-width", 1)
		.attr("stroke", function(d) { return (d.open > d.close ? cssPositiveColor : cssNegativeColor)})
		.x(function (d,index,dataset) { console.log(`from d.x(${d.x}=>`,d); return d.x; }, xScale)
		.y(function (d,index,dataset) { console.log(`from d.y(${d.y}=>`,d); return d.y; }, yScale)
//		.attr("stroke", function (d, i, dataset) { return dataset.metadata().name; }, colorScale)
//		.addDataset(new Plottable.Dataset(stock.history.getSeries(), { name: stock.symbol }))
		.addDataset(dataset)
		.showAllData();
//		.autorangeMode("y");

	//let plots = new Plottable.Components.Group([dayRangePlot, dayOpenPlot, dayClosePlot,symbolPlot]);
	let plots = new Plottable.Components.Group([dayRangePlot]);
	let chart = new Plottable.Components.Table([
		[yAxis, plots],
		[null, xAxis],
//		[null, miniChart],
//		[null, sparklineXAxis]
	]);
//	chart.rowWeight(2, 0.2);
	/** render the chart to the SVG element */
	chart.renderTo("svg#chartMain");

console.log(`x.domain=${xScale.domain()},x.range=${xScale.range()},y.domain=${yScale.domain()},y.range=${yScale.range()}`)

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





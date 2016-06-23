import electron = require("electron");
import { Security } from './security';
let ipcRenderer = electron.ipcRenderer;
let fs          = require("fs");
let Plottable   = require("Plottable");


// Receive log messages from the main process, which cannot access the dev tools console directly.
ipcRenderer.on("send-console", (event, arg) => {
  console.log(arg);
});

ipcRenderer.on("draw_symbol", (event, arg) => {
  //now lets test the security bit
  console.log("looking up security now!");
  var stock = new Security('YHOO');
  stock.getHistory("2016-01-14","2016-01-15")
	.then(json => console.log(json))
	.catch(reason => console.log("ERROR:" + reason))

  makeBasicChart();
});

function makeBasicChart() {
	
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //let svgNS = svg.namespaceURI;
  svg.id = "tutorial-result";
  document.body.appendChild(svg);

	var xScale = new Plottable.Scales.Linear();
	var yScale = new Plottable.Scales.Linear();

	var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
	var yAxis = new Plottable.Axes.Numeric(yScale, "left");

	var plot = new Plottable.Plots.Line();
	plot.x(function(d) { return d.x; }, xScale);
	plot.y(function(d) { return d.y; }, yScale);

	var data = [
	  { "x": 0, "y": 1 },
	  { "x": 1, "y": 2 },
	  { "x": 2, "y": 4 },
	  { "x": 3, "y": 8 }
	];

	var dataset = new Plottable.Dataset(data);
	plot.addDataset(dataset);

	var chart = new Plottable.Components.Table([
	  [yAxis, plot],
	  [null, xAxis]
	]);

	chart.renderTo("svg#tutorial-result");
}
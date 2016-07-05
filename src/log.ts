require('source-map-support').install({
	environment: 'node'
});


/**
 * eLog - displays calling line number & message & dumps vars as pretty json string
 * @param {string} msg - string to display in log message
 * @param {any} dispVars - any number of variables (ellipsis , aka Rest parameters) to dump
 */
export function eLog(msg:string,...dispVars:any[]){
	let stackLine = (new Error).stack.split("\n")[2];
	console.log(`caller_line#1=${stackLine}`)
	let caller_line = stackLine.slice(stackLine.lastIndexOf('/'),stackLine.lastIndexOf(')'))
	// if there is no `/` then use filename without a prefixed path
	console.log(`caller_line#2a=[${caller_line}]`)
	console.log(caller_line.length)
	if ( caller_line.length == 0 ) {
		caller_line = stackLine.slice(stackLine.lastIndexOf('('),stackLine.lastIndexOf(')'))
		console.log(`caller_line#2b=[${caller_line}]`)
	}
	let filename_base = caller_line.slice(0+1,caller_line.indexOf(':'));
	let line_no = caller_line.slice(caller_line.indexOf(':')+1,caller_line.lastIndexOf(':'));
	let line_pos = caller_line.slice(caller_line.lastIndexOf(':')+1);
	console.log(`filename_base=${filename_base}\nline_no=${line_no}\nline_pos=${line_pos}`)
	console.log(`eLog->Line#${caller_line}->${msg}->`);

	//let sourceMap = new SourceMapConsumer(fs.readFileSync(filename_base));


	// throw the current line
	console.log(JSON.stringify((new Error).stack.split("\n"),null,2));
	
	dispVars.forEach(value => {
		console.log(JSON.stringify(value,null,2));
	});
}

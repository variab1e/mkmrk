require('source-map-support').install({
	environment: 'node'
});


/**
 * eLog - displays calling line number & message & dumps vars as pretty json string
 * @param {string} msg - string to display in log message
 * @param {any} dispVars - any number of variables (ellipsis , aka Rest parameters) to dump
 * {@link https://github.com/evanw/node-source-map-support usable by typescript node-source-map-support module}
 * {@link https://github.com/mozilla/source-map/ Mozilla source-map library & project}
 * {@link http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/ good introduction to sourcemaps}
 */
export function eLog(msg:string,...dispVars:any[]){
	/**
	 * go one line back for the caller
	 * @type {string}
	 */
	let stackLine = (new Error).stack.split("\n")[2];
	/**
	 * retrieve the file basename & positional data, after the last `/` to the `)` 
	 */
	// 
	let caller_line = stackLine.slice(stackLine.lastIndexOf('/'),stackLine.lastIndexOf(')'))
	/**
	 *  test for no `/` ; if there is no `/` then use filename without a prefixed path
	 */ 
	if ( caller_line.length == 0 ) {
		caller_line = stackLine.slice(stackLine.lastIndexOf('('),stackLine.lastIndexOf(')'))
	}
	// 
	/**
	 * filename_base - parse out the file basename; remove first `/` char and go to `:`
	 */
	let filename_base = caller_line.slice(0+1,caller_line.indexOf(':'));
	/**
	 * line_no - parse out the line number ; remove first `:` char and go to 2nd `:`
	 */
	let line_no = caller_line.slice(caller_line.indexOf(':')+1,caller_line.lastIndexOf(':'));
	/**
	 * line_pos - line positional - from the last `:` to the end of the string
	 */
	let line_pos = caller_line.slice(caller_line.lastIndexOf(':')+1);
	console.log(`eLog called by ${filename_base} on line# ${line_no} @ char# ${line_pos} said:\n${msg}`);
	// print out the input variables as pretty JSON strings
	dispVars.forEach(value => {
		console.log(JSON.stringify(value,null,2));
	});
}

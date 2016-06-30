
/**
function logEr(err: Error){
	let json:string  = JSON.stringify(err.stack);
	console.log(json);
}

function getErrorObject(){
    try { throw Error('') } catch(err) { return err; }
}

var err = getErrorObject();
var caller_line = err.stack.split("\n")[4];
var index = caller_line.indexOf("at ");
var clean = caller_line.slice(index+2, caller_line.length);

var caller_line = (new Error).stack.split("\n")[4]

**/


export function errorHandler(error, errorInstance){
    this.errorMessage = error;
    this. errorInstance = errorInstance;
}
errorHandler.prototype. displayErrors = function(){
    //add the empty error trace to your message
    this.errorMessage += '  stack trace: '+ this. errorInstance.stack;
    throw new Error(this.errorMessage);
}
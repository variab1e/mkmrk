
function getContent(url){
	// returns promise
	// use like:
	// getContent(addrOfFile).then(content => { console.log(content) });
	return fetch(url)
	.then(function (response) {
		return response.text();
	})
}

function sitePath(url){
	
	var sitePath = url.substring(url.indexOf('//')+2)
	
	sitePath = sitePath.substring(sitePath.indexOf('/'));
	return sitePath;
}

exports.fetch = function(load, fetch){
	return new Promise(function(resolve, reject){
		
		var addrOfFile = sitePath(load.address);

		// for options look at sass.options -->
		// see https://github.com/medialize/sass.js/
		var options = { }; // nothing for now

		System.import('sass.sync.js')
		.then( sass => {
			// figure out the basedir of the main.scss file to tell sass.js what's what
			var basedir = addrOfFile.substring(0, addrOfFile.lastIndexOf('/'));
			
			// sass has a default of /sass/ not real sure why, I try not to question things anymore
			sass._path = basedir;
			
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// NOTE: modify libsass (aka sass.js to point to your libsass.js.mem if it is not in the root of your site.)
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			
			// set the importer function
			sass.importer(
				function(request, done){
					//console.log("importer says(obj/request.current):");
					//console.log(request);
					//console.log(request.current)
					var path = request.resolved
					//debugger;
					getContent(path).then(
						content => {
							content
							//console.log("received content in importer:");
							//console.log(content);
							//console.log("sending path="+path);
							done({content,path})
						}
					)
				}
			)
			
			getContent(addrOfFile).then(
				content => { 
					//console.log("content="+content)
					sass.compile(content, options, result => {
						if (result.status === 0) {
							console.log("seems we had success. Don't hold your breath. Once doesn't a pattern make");
							const style = document.createElement('style');
							style.textContent = result.text;
							style.setAttribute('type', 'text/css');
							document.getElementsByTagName('head')[0].appendChild(style);
							resolve('');
						} else {
							console.log("Ah. The familiar stench of failure.")
							reject(result.formatted);
						}
				});

			});
		}).catch(
			err => reject(err)
		);

	})
	.then(function(){
		return '';
	})
}

var fs = require('fs')
  , exec = require('child_process').exec

var rmdir = require( '..' );
var a  = __dirname + '/assets';
var b = __dirname + '/copy';

exec('cp -R '+a+' '+b, function(e){
	if (e) throw e
	console.assert(fs.existsSync(b))
	rmdir(b, function (e){
	  if(e) throw e
	  console.assert(!fs.existsSync(b))
	  console.log('done!')
	});
})


var exec = require('child_process').exec
  , rmdirSync = require('../sync')
  , rmdir = require( '..' )
  , fs = require('fs')

var a  = __dirname + '/assets'
var b = __dirname + '/copy'

exec('cp -R '+a+' '+b, function(e){
	if (e) throw e
	console.assert(fs.existsSync(b))
	rmdir(b).read(function(){
		if (fs.existsSync(b)) throw new Error(b + ' still exists')
		console.log('done async!')
		
		exec('cp -R '+a+' '+b, function(e){
			if (e) throw e
			console.assert(fs.existsSync(b))
			rmdirSync(b)
			if (fs.existsSync(b)) throw new Error(b + ' still exists')
			console.log('done sync!')
		})
	})
})

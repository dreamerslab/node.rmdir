
var join = require('path').join
	, fs = require('fs')

/**
 * rm -r path
 *
 * @param {String} dir
 */

module.exports = function rmdirp(dir){
	fs.readdirSync(dir).forEach(function(file){
		file = join(dir, file)
		var stat = fs.lstatSync(file)
		if (stat.isDirectory()) rmdirp(file)
		else fs.unlinkSync(file)
	})
	fs.rmdirSync(dir)
}
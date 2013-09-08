
var join = require('path').join
var fs = require('fs')

module.exports = exports = remove

/**
 * rm whatever happens to be at `path`
 *
 * @param {String} path
 * @param {Function} cb
 * @api public
 */

function remove(path){
	fs.lstatSync(path).isDirectory()
		? rmdir(path)
		: rmfile(path)
}

/**
 * rm file or symlink
 *
 * @param {String} path
 * @return {Result}
 * @api public
 */

var rmfile = exports.file = fs.unlinkSync

/**
 * empty dir and remove it
 *
 * @param {String} path
 * @return {Result}
 * @api public
 */

var rmdir = exports.dir = function(path){
	fs.readdirSync(path).forEach(function(name){
		remove(join(path, name))
	})
	fs.rmdirSync(path)
}
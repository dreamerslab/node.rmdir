
var each = require('foreach/async')
var fs = require('lift-result/fs')
var lift = require('lift-result')
var join = require('path').join

module.exports = exports = remove

/**
 * rm whatever happens to be at `path`
 *
 * @param {String} path
 * @param {Function} cb
 * @api public
 */

function remove(path){
	return dispatch(fs.lstat(path), path)
}

/**
 * rm file or symlink
 *
 * @param {String} path
 * @return {Result}
 * @api public
 */

var rmfile = exports.file = fs.unlink

/**
 * empty dir and remove it
 *
 * @param {String} path
 * @return {Result}
 * @api public
 */

var rmdir = exports.dir = function(path){
	return each(fs.readdir(path), function(name){
		return remove(join(path, name))
	}).then(function(){
		return fs.rmdir(path)
	})
}

/**
 * dispatch on the type of `stat`
 *
 * @param {Stat} stat
 * @param {String} path
 * @return {Result}
 * @api private
 */

var dispatch = lift(function(stat, path){
	return stat.isDirectory()
		? rmdir(path)
		: rmfile(path)
})
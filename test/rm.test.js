
var exec = require('child_process').exec
var assert = require('better-assert')
var when = require('result').read
var fs = require('fs')

var copy = __dirname + '/copy'

beforeEach(function(done){
	exec('cp -Rf ' + __dirname + '/assets ' + copy, done)
})

afterEach(function(done){
	exec('rm -Rf ' + copy, done)
})

test('../index.js')
test('../sync.js')

function test(imp){
	var rmdir = require(imp)
	imp = require('path').basename(imp)

	describe('remove.file()', function(){
		it(imp, function(done){
			var file = copy + '/config.yml'
			assert(fs.existsSync(file))
			when(rmdir.file(file), function(){
				assert(!fs.existsSync(file))
				done()
			})
		})
	})

	describe('remove.dir()', function(){
		it(imp, function(done){
			assert(fs.existsSync(copy))
			when(rmdir.dir(copy), function(){
				assert(!fs.existsSync(copy))
				done()
			})
		})
	})

	describe('remove()', function(){
		it(imp, function(done){
			assert(fs.existsSync(copy))
			when(rmdir(copy), function(){
				assert(!fs.existsSync(copy))
				done()
			})
		})
	})
}
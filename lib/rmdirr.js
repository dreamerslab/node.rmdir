/*!
 * rmdirr
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Remove all files in the given _path recursively.
 */
var fs = require( 'fs' );

function rmdirr ( path, callback ){
  var _path = /.*\/$/.test( path ) ? path : path + '/';

  fs.readdir( _path, function ( err, files ){
    var i = files.length;
    
    if( err ) throw err;

    if( i === 0 ){
      fs.rmdirSync( _path );
      callback && callback();
    }else{
      files.forEach( function ( file ){
        var file_path, stats;

        file_path = _path + file;
        stats     = fs.lstatSync( file_path );
        
        i--;
        
        if( stats.isDirectory()){
          rmdirr( file_path );
          return;
        }

        if( stats.isFile()){
          fs.unlinkSync( file_path );
          ( i === 0 ) && rmdirr( _path );
        }
      });
    }

  });
}



rmdirr.version = '0.0.1';

module.exports = rmdirr;

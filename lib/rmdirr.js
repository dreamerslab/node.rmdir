/*!
 * rmdirr
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview 
 * Remove all files in the given _path recursively.
 */
var fs = require( 'fs' );

function rmdirr ( path ){
  var _path = /.*\/$/.test( _path ) ? path : path + '/';
  
  fs.readdir( _path, function ( err, files ){
    if( err ) throw err;
    
    if( files.length === 0 ){
      fs.rmdirSync( _path );
    }else{
      files.forEach( function ( file ){
        var file_path = _path + file + "/";
        
        fs.stat( file_path, function ( err, stats ){
          if( stats.isDirectory()){
            rmdirr( file_path );
            
            return;
          }
          
          if( stats.isFile()){
            fs.unlinkSync( file_path );
          }
        });
      });
    }

  });
}



packer.version = '0.0.1';

module.exports = rmdirr;

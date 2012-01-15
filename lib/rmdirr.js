/*!
 * rmdirr
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Remove all files in the given path recursively.
 */
var fs   = require( 'fs' );
var path = require( 'path' );

function rmdirr( dir, callback ){
  var _dir   = /.*\/$/.test( dir ) ? dir : dir + '/';
  var _files = [];
  var _dirs  = [];

  fs.readdir( _dir, function ( err, files ){
    var pending;

    if( err ) return callback( err );

    pending = files.length;

    _dirs.push( _dir );

    if( !pending ){
      fs.rmdirSync( _dir );
      return callback( null, _dirs, _files );
    }

    files.forEach( function ( file ){
      file = _dir + file;

      fs.stat( file, function ( err, stat ){
        if( stat && stat.isDirectory()){
          _dirs.push( file );

          rmdirr( file, function ( err, dirs, files ){
            _files = _files.concat( files );

            if( !--pending ){
              _dirs.forEach( function ( dir ){
                if( path.existsSync( dir )){
                  fs.rmdirSync( dir );
                }
              });
              callback( null, _dirs, _files );
            }
          });

          return;
        }

        _files.push( file );
        fs.unlinkSync( file );

        if( !--pending ){
          _dirs.forEach( function ( dir ){
            if( path.existsSync( dir )){
              fs.rmdirSync( dir );
            }
          });
          callback( null, _dirs, _files );
        }
      });
    });
  });
};

rmdirr.version = "0.0.1";



module.exports = rmdirr;
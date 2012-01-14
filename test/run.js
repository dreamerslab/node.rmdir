var rmdir = require( '../lib/rmdirr' ),
    path  = __dirname + '/assets';

rmdirr( __dirname + '/assets', function ( err, dirs, files ){
  console.log( dirs );
  console.log( files );
  console.log( 'all files are removed' );
});
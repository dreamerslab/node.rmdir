var rmdir = require( '../lib/rmdirr' );
var path  = __dirname + '/assets';

rmdir( __dirname + '/assets', function ( err, dirs, files ){
  console.log( dirs );
  console.log( files );
  console.log( 'all files are removed' );
});
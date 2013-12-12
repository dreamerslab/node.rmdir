var rmdir = require( '../lib/rmdir' );
var path  = __dirname + '/assets';

rmdir( __dirname + '/assets', function ( err, dirs, files ){
  if( err ) return console.log( 'err', err );
  console.log( 'dirs', dirs );
  console.log( 'files', files );
  console.log( 'all files are removed' );
});

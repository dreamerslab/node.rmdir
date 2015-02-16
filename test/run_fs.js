var rmdir = require( '../lib/rmdir' );
var path  = __dirname + '/assets';

rmdir( __dirname + '/assets', { fs: require( 'fs' )}, function ( err, dirs, files ){
  if( err ) return console.log( 'err', err );
  console.log( 'dirs : \n', dirs );
  console.log( 'files : \n', files );
  console.log( 'all files are removed' );
});

var rmdir = require( '../lib/rmdirr' ),
    path  = __dirname + '/assets';

rmdir( path , function (){
  console.log( 'all files removed' );
});

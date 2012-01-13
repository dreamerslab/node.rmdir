var rmdirr = require( '../lib/rmdirr' ),
    path   = __dirname + '/assets';

rmdirr( path , function (){
  console.log( 'all files removed' );
});

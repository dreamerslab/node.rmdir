# rmdir

Remove all files in the given path recursively. This is equivilent to the unix command `rm -r`.

## Installation

    npm install rmdir

## API

### rmdir(path:String, cb:Function)

#### Arguments

> path

    type: String
    desc: The directory to remove

> callback

    type: Function
    desc: The callback to be called after all files are removed.
    arguments:
      err:
        type: Error

## Example

    var rmdir = require( 'rmdir' );
    rmdir('/path/to/the/dir', function (err){
      console.log('all files are removed');
    });

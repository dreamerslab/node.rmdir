# rmdir

Remove all files in the given path recursively. This is equivilent to the unix command `rm -r`.

## Installation

    npm install rm-r

then in your app

```js
var rm = require('rm-r')
```

## API

This package contains two implementations sync and async. Both have the same API and test suite but the async version returns [results](//github.com/jkroso/result).

## remove(path)

  rm whatever happens to be at `path`

## rmfile(path)

  rm file or symlink

## rmdir(path)

  empty dir and remove it

## Example

```js
rm('/path/to/the/thing/you/want/gone')
rm.file('/path/to/a/file')
rm.dir('/path/to/a/dir')
```
/*!
 * rmdir
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Remove all files in the given path recursively.
 */
var fs = require('fs');

function rmdir(dir, options, callback) {
  if (typeof options === 'undefined') {
    callback = function () {};
    options = {};
  }

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var xfs = options.fs || fs;

  xfs.lstat(dir, function (err, stat) {
    var is_dir = stat && stat.isDirectory();
    var _dir = is_dir ? dir + '/' : dir;
    var _files = [];
    var _dirs = [];

    if (err) return callback(err, _dirs, _files);

    if (!is_dir) {
      return xfs.unlink(_dir, function (err) {
        return err ? callback(err, _dirs, _files) : callback(null, _dirs, _files);
      });
    }

    xfs.readdir(_dir, function (err, files) {
      var pending;

      if (err) return callback(err);

      pending = files.length;

      _dirs.push(_dir);

      if (!pending) {
        return xfs.rmdir(_dir, function (err) {
          return err ? callback(err, _dirs, _files) : callback(null, _dirs, _files);
        });
      }

      files.forEach(function (file) {
        file = _dir + file;

        xfs.lstat(file, function (err, stat) {
          function rm_all_dirs(callback) {
            if (!--pending) {
              if (!_dirs.length) return callback();

              var promises = _dirs.map(function (dir) {
                return new Promise(function (resolve, reject) {
                  xfs.exists(dir, function (exists) {
                    if (!exists) return resolve();

                    xfs.rmdir(dir, function (err) {
                      if (err) return reject(err);

                      resolve();
                    });
                  });
                });
              });

              Promise.all(promises)
                .then(function () {
                  callback(null, _dirs, _files);
                })
                .catch(function (err) {
                  if (err) callback(err, _dirs, _files);
                });
            }
          }

          if (stat && stat.isDirectory()) {
            _dirs.push(file);

            rmdir(file, function (err, dirs, files) {
              _files = _files.concat(files);

              rm_all_dirs(callback);
            });

            return;
          }

          _files.push(file);
          xfs.unlink(file, function (err) {
            if (err) return callback(err);

            rm_all_dirs(callback);
          });
        });
      });
    });
  });
};

/**
 * @public
 */
rmdir.version = JSON.parse(
  fs.readFileSync(__dirname + '/../package.json', 'utf8')
).version;

/**
 * Exports module.
 */
module.exports = rmdir;

var packer = require('../index'),
    path   = __dirname + '/assets/';

packer({
  log: true,
  type: 'js',
  input: [
    path + 'dojo.js',
    path + 'jquery.js',
    path + 'prototype.js'
  ],
  output: path + 'pack.min.js'
});

packer({
  log: true,
  minify: true,
  type: 'css',
  input: [
    path + 'reset.css',
    path + 'reset-html5.css'
  ],
  output: path + 'pack.min.css'
});

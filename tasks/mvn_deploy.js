/*
 * grunt-mvn-deploy
 * https://github.com/ryanaghdam/grunt-mvn-deploy
 *
 * Copyright (c) 2013 Ryan Aghdam
 * Licensed under the MIT license.
 */

"use strict";

var semver = require("semver");

module.exports = function(grunt) {
  grunt.registerMultiTask("mvn", "Package and deploy to Maven", function() {
    var options = this.options();
    grunt.log.writeln(options);
  });
};

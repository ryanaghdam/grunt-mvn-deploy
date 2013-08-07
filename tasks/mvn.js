/*
 * grunt-mvn-deploy
 * https://github.com/ryanaghdam/grunt-mvn-deploy
 *
 * Copyright (c) 2013 Ryan Aghdam
 * Licensed under the MIT license.
 */

"use strict";

var fs = require("fs");
var path = require("path");
var glob = require("glob");
var ZipWriter = require("moxie-zip").ZipWriter;

module.exports = function(grunt) {
  /**
   * Given an instance of Grunt, a property name, and a default value, attempt to
   * retrieve and return the property with the given name. If it does not exist,
   * the default value is returned.
   */
  var g = function(prop, defaultValue) {
    var value = grunt.config.get(prop);
    if(value) {
      return value;
    } else {
      return defaultValue;
    }
  };

  // Read package.json
  var pkg = grunt.file.readJSON("package.json");

  /**
   * Store all variables in grunt.config.
   *
   * Target is one of: "snapshot", "release". Default to SNAPSHOT.
   */
  grunt.registerTask("mvn:preprocess", function(target) {
    grunt.config.set("mvn.debug", g("mvn.options.debug", false));
    grunt.config.set("mvn.groupId", g("mvn.package.groupId"));
    grunt.config.set("mvn.artifactId", g("mvn.package.artifactId", pkg.name));

    // Snapshot/Release dependant variables.
    if(target === "release") {
      grunt.config.set("mvn.repositoryUrl", g("mvn.release.url"));
      grunt.config.set("mvn.repositoryId", g("mvn.release.id"));
      grunt.config.set("mvn.version", g("mvn.package.version", pkg.version));
    } else {
      grunt.config.set("mvn.repositoryUrl", g("mvn.snapshot.url"));
      grunt.config.set("mvn.repositoryId", g("mvn.snapshot.id"));
      grunt.config.set("mvn.version", g("mvn.package.version", pkg.version) + "-SNAPSHOT");
    }

    // Finally, filename, which is dependant on the artifactId and version.
    grunt.config.set("mvn.file", grunt.config.get("mvn.artifactId") + "-" + grunt.config.get("mvn.version") + ".war");
  });

  /**
   * Create a WAR of the selected sources.
   */
  grunt.registerTask("mvn:package", function() {
    // Create a new Zip file
    var zip = new ZipWriter();

    // Add each source file
    //
    // options.sources is a list of globbing patterns.  Iterate over each
    // globbing pattern to retrieve a list of matched files; add each of those
    // files to the ZIP file.
    grunt.config.get("mvn.package.sources").forEach(function(e, i, a) {
      glob.sync(e).forEach(function(f, j, b) {
        if(fs.statSync(f).isFile()) {
          zip.addFile(f, f);
        }
      });
    });

    // Write the zip file
    zip.saveAs(g("mvn.file"), function() {
      grunt.verbose.writeln("Wrote " + g("mvn.file"));
    });
  });

  /**
   * Deploy the appropriate WAR to the appropriate repository.  Appropriate.
   */
  grunt.registerTask("mvn:deploy", function() {
    // Set up arguments
    var args = ["deploy:deploy-file", "-Dpackaging=war"];
    if(g("mvn.debug")) args.push("--debug");
    if(g("mvn.repositoryId")) args.push("-DrepositoryId=" + g("mvn.repositoryId"));
    args.push("-Dfile=" + g("mvn.file"));
    args.push("-DgroupId=" + g("mvn.groupId"));
    args.push("-DartifactId=" + g("mvn.artifactId"));
    args.push("-Dversion=" + g("mvn.version"));
    args.push("-Durl=" + g("mvn.repositoryUrl"));
    grunt.verbose.writeln("Running: mvn " + args.join(" "));

    var done = this.async();
    grunt.util.spawn({cmd: "mvn", args: args}, function(err, result, code) {
      if(err) {
        grunt.log.error().error("deploy failed.");
        grunt.verbose.write(result.stdout + "\n");
      } else {
        grunt.verbose.ok();
        grunt.verbose.write(result.stdout + "\n");
      }
      done(err);
    });
  });

  // Snapshot and Release tasks
  grunt.registerTask("mvn:snapshot", ["mvn:preprocess:snapshot", "mvn:package", "mvn:deploy"]);
  grunt.registerTask("mvn:release", ["mvn:preprocess:release", "mvn:package", "mvn:deploy"]);
};

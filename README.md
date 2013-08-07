# grunt-mvn-deploy

> Deploy node projects to Maven.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```shell
npm install grunt-mvn-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile
with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mvn-deploy');
```

## The "mvn_deploy" task

### Overview

In your project's Gruntfile, add a section named `mvn_deploy` to the data
object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mvn: {
    options: {
      debug: true // Optional boolean
    },
    package: {
      groupId: "com.example", // Required
      artifactId: "project",  // Optional, defaults to npm package name
      sources: ["dist/**"],   // Required, sources to package
      version: "6.6.6"        // Optional, defaults to npm version
    },
    snapshot: {
      url: "http://maven.example.com/snapshots",  // Required
      id: "example-snaps" // Optional, useful if auth. is required.
    },
    release: {
      url: "http://maven.example.com/releases",  // Required
      id: "example-releases" // Optional, useful if auth. is required.
    }
  }
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [Grunt](http://gruntjs.com/).

## Release History

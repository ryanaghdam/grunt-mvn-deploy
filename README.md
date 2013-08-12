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

### Options

#### options.debug
Type: `Boolean`  
Default: false

Whether or not the `--debug` flag should be passed to maven.

#### package.groupId
Type: `String`  
Required

Maven `groupId`, e.g. `com.yourcompany`.


#### package.artifactId
Type: `String` 
Default: `name` field in `package.json`

Name of artifact to publish.  This field will default to the `name` field in `package.json`.

#### package.sources
Type: `Array` 
Required

A list of glob-compatible paths to include in the package.

#### package.version
Type: `String` 
Default: `version` field in `package.json`

The version of the artifact to publish.  This field will default to the `version` field in `package.json`.

If publishing to a snapshot respository `-SNAPSHOT` will automatically be appended.

#### snapshot.url
Type: `String` 
Required

URL to your snapshots repository

#### snapshot.id
Type: `String` 
Optional

The `id` of the snapshot repository if it is defined in your `settings.xml` file.  This option is useful if your repository requires authentication.

#### release.url
Type: `String` 
Required

URL to your snapshots repository

#### release.id
Type: `String` 
Optional

The `id` of the snapshot repository if it is defined in your `settings.xml` file.  This option is useful if your repository requires authentication.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [Grunt](http://gruntjs.com/).

## Release History

### 0.5.5

- Updated documentation

- Added "mvn" and "maven" keywords to package file.

### 0.5.1

- Removed unused semver dependency

- Replaced adm-zip with mozie-zip.

### 0.5.0

Initial release.

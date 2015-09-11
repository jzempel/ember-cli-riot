# ember-cli-riot

Use [Riot](https://muut.com/riotjs/) to compile your ember-cli app's tag
files. This plugin extends
[broccoli-riot](https://github.com/jzempel/broccoli-riot) by
adding `riotjs` to your app's bower and compiling tags for distribution.

## Installation

```$ ember install git+https://git@github.com:jzempel/ember-cli-riot.git```

## Usage

You can configure which tags to compile by specifying them in your
`Brocfile.js`.

```js
var app = new EmberApp({
  riotOptions: {
    inputTrees: [
      {
        tree: 'node_modules',
        srcDir: 'rg-modal/src',
        files: ['rg-modal.tag']
      }
    ]
  }
});
```

* **`inputTrees`**: An ordered list of trees (or single tree) containing
  tag files to compile.

  * **`.tree`**: Either a string that references an app directory or a
    broccoli tree structure.

  * **`.srcDir`**: A string representing the portion of the input tree
    to start from.

  * **`.include`**: One or more expresions (regex, glob, or function)
    used to identify files to include.

  * **`.exclude`**: Just like `.include`, except exactly the opposite.

  * **`.files`**: One or more relative tag file paths.

  * **`.options`**: Any specified options are passed to the Riot
    [compiler](https://muut.com/riotjs/compiler.html#pre-processors).

* **`outputFile`**: By default, compiled riot tags are added to
  `vendor.js`. Specify `outputFile` to generate a separate JS in the
  app's `dist` folder.

Remember to [mount](https://muut.com/riotjs/guide/#mounting) the tags
you are using in your page.

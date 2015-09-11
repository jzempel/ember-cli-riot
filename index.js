/* jshint node: true */
'use strict';

var RiotCompiler = require('broccoli-riot');
var funnel = require('broccoli-funnel');
var path = require('path');
var util = require('util');

module.exports = {
  name: 'ember-cli-riot',

  treeForPublic: function() {
    var options = this.app.options.riotOptions || {};

    if (options.inputTrees && options.outputFile) {
      return this._tree(options);
    }
  },

  treeForVendor: function() {
    var options = this.app.options.riotOptions || {};

    if (options.inputTrees && !options.outputFile) {
      options.outputFile = this.name + '.js';

      return this._tree(options);
    }
  },

  included: function(app) {
    this._super.included(app);

    app.import(path.join(app.bowerDirectory, 'riotjs', 'riot.js'));

    if (app.env !== 'test') {
      try {
        app.import(path.join('vendor', this.name + '.js'));
      } catch (e) {
        // No vendor Riot file was compiled.
      }
    }
  },

  _tree: function(options) {
    var inputTrees = options.inputTrees;

    if (!util.isArray(inputTrees)) {
      inputTrees = [inputTrees];
    }

    return new RiotCompiler(inputTrees.map(function(inputTree) {
      return funnel(inputTree.tree, {
        srcDir: inputTree.srcDir,
        include: inputTree.include,
        exclude: inputTree.exclude,
        files: inputTree.files,
        options: inputTree.options
      });
    }), options.outputFile);
  }
};

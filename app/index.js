'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ProjectGenerator = yeoman.generators.Base.extend({
	getName: function(){
		var done = this.async();

		require('child_process').exec('npm whoami', function(stdin, stdout){
			this.defaultName = stdout.trim();
			done();
		}.bind(this));
	},

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Project generator.'));

    var prompts = [{
      name: 'projectName',
      message: 'project name'
    }, {
      name: 'description',
      message: 'description'
    }, {
    	name: 'author',
    	message: 'author',
    	default: this.defaultName
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.description = props.description;
      this.author = props.author;

      done();
    }.bind(this));
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');

    this.copy('gitattributes', '.gitattributes');
    this.copy('gitignore', '.gitignore');

    this.copy('bower.json', 'bower.json');
    this.copy('package.json', 'package.json');
    this.copy('component.json', 'component.json');

    this.copy('index.js', 'index.js');
    this.copy('readme.md', 'readme.md');
  }
});

module.exports = ProjectGenerator;

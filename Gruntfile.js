module.exports = function(grunt) {
  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'build/js/<%= pkg.name %>.js'
      }
    }
    ,
    /* CSS Min */
    cssmin: {
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'build/css/<%= pkg.name %>.css': ['src/css/**/*.css']
        }
      }
    }
    ,
    /* Copy */
    copy: {
      main: {
        files: [
          /**
           * Bower components
           */
          // Backbone
          {
            cwd : 'src/bower_components/backbone/',
            expand: true,
            src: [
              '*.js'
            ], 
            dest: 'build/bower_components/backbone/', 
          },
          // Underscore
          {
            cwd : 'src/bower_components/underscore/',
            expand: true,
            src: [
              '*.js',
              '*.map'
            ], 
            dest: 'build/bower_components/underscore/', 
          },
          // Highcharts
          {
            cwd : 'src/bower_components/highcharts/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/bower_components/highcharts/', 
          },
          // Bootstrap
          {
            cwd : 'src/bower_components/bootstrap/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/bower_components/bootstrap/', 
          },
          // Font Awesome CSS
          {
            cwd : 'src/bower_components/components-font-awesome/css/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/bower_components/components-font-awesome/css/', 
          },
          // Moment
          {
            cwd : 'src/bower_components/moment/',
            expand: true,
            src: [
              '**/*.js',
              '*.map'
            ], 
            dest: 'build/bower_components/moment/', 
          },
          // jQuery
          {
            cwd : 'src/bower_components/jquery/dist/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/bower_components/jquery/dist/', 
          },
          // Font Awesome Fonts
          {
            cwd : 'src/bower_components/components-font-awesome/fonts/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/bower_components/components-font-awesome/fonts/', 
          },
          // Font Awesome CSS
          {
            cwd : 'src/bower_components/components-font-awesome/fonts/css/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/bower_components/components-font-awesome/fonts/css/', 
          },
          /**
           * JavaScript Files
           */
          {
            cwd : 'src/js/',
            expand: true,
            src: [
              '*.js'
            ], 
            dest: 'build/js/',
          },
          /**
           * Assets
           */
          {
            cwd : 'src/img/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/img/', 
          },
          /**
           * Templates
           */
          {
            cwd : 'src/templates/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/templates/', 
          },
          /**
           * Data
           */
          {
            cwd : 'src/data/',
            expand: true,
            src: [
              '**'
            ], 
            dest: 'build/data/', 
          },
          /**
           * Index.html
           */
          {
            src: 'src/index.html', 
            dest: 'build/index.html'
          }
        ],
      },
    }
    /* Node  */
    ,
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          keepalive: true,
          port: 35729,
          base: 'build'
        }
      }
    }
    ,
    /* Clean */
    clean: ["build"]
    , 
    watch: {
      scripts: {
        files: ['src/js/*.js','src/css/*.css','src/*.html'],
        tasks: ['clean', 'uglify', 'csslint', 'cssmin', 'copy'],
        options: {
          spawn: true,
          livereload: true,
        },
      },
    },
    /* CSS Lint */
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      lax: {
        options: {
          import: false
        },
        src: ['src/css/**/*.css']
      }
    }
  });
  

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // load the css minifier
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // load the css linter 
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // load the file copier
  grunt.loadNpmTasks('grunt-contrib-copy');

  // load the clean pluging
  grunt.loadNpmTasks('grunt-contrib-clean');

  // node server
  grunt.loadNpmTasks('grunt-contrib-connect');

  // grunt contribute watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'csslint', 'cssmin', 'copy', 'connect']);

  // Build
  grunt.registerTask('build', ['clean', 'uglify', 'csslint', 'cssmin', 'copy']);

  // Start Server
  grunt.registerTask('server', ['connect']);

};
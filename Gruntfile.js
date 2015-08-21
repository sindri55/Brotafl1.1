module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
      dev: {
        options: {
          compress: false,
          yuicompress: true,
          optimization: 0,
          strictImports: true
        },
        files: [
          {"dist/brotafl.css": "src/less/brotafl.less"}
        ]
      },
      production: {
        options: {
          paths: ["src/less"],
          //compress: true,
          cleancss: true
        },
        files: [
          {"dist/brotafl.min.css": "src/less/brotafl.less"}
        ]
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 5 versions']
        },
        files: [
          {'dist/brotafl.css': 'dist/brotafl.css'},
          {'dist/brotafl.min.css': 'dist/brotafl.min.css'}
        ]
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'src/less/**/*.less'],
      tasks: ['jshint', 'concat', 'uglify', 'less', 'autoprefixer', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'autoprefixer', 'watch']);
};
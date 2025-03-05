module.exports = function(grunt) {
	var path = require('path'),
		gc = {
			default: [
				"clean:all",
				"concat",
				"uglify",
				"less",
				"autoprefixer",
				"group_css_media_queries",
				"cssmin",
				"compress"
			]
		};

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		clean: {
			options: {
				force: true
			},
			all: [
				'parfenovka/js/',
				'parfenovka/css/',
				'test/'
			]
		},
		concat: {
			options: {
				separator: "\n",
			},
			appjs: {
				src: [
					"bower_components/fancybox/src/js/core.js",
					// обработка ссылок на видео
					// YouTube, RUTUBE, Viemo
					'src/media.js',
					"bower_components/fancybox/src/js/guestures.js",
					"bower_components/fancybox/src/js/slideshow.js",
					"bower_components/fancybox/src/js/fullscreen.js",
					"bower_components/fancybox/src/js/thumbs.js",
					"bower_components/fancybox/src/js/hash.js",
					"bower_components/fancybox/src/js/wheel.js",
				],
				dest: 'parfenovka/js/jquery.fancybox.js'
			},
			main: {
				src: [
					'src/main.js'
				],
				dest: 'parfenovka/js/main.js'
			},
			css: {
				src: [
					'bower_components/fancybox/src/css/*.css'
				],
				dest: 'test/css/jquery.fancybox.css'
			}
		},
		uglify: {
			options: {
				sourceMap: false,
				compress: {
					drop_console: false
	  			},
	  			output: {
					ascii_only: true
				}
			},
			app: {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'parfenovka/js/jquery.fancybox.js',
							'parfenovka/js/main.js'
						],
						dest: path.normalize(path.join(__dirname, 'parfenovka', 'js')),
						filter: 'isFile',
						rename: function (dst, src) {
							return path.normalize(path.join(dst, src.replace('.js', '.min.js')));
						}
					}
				]
			}
		},
		less: {
			css: {
				options : {
					compress: false,
					ieCompat: false,
				},
				files : {
					'test/css/main.css' : [
						'src/main.less'
					],
					'test/css/admin.css' : [
						'src/admin.less'
					]
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: [
					"last 5 version"
				],
				cascade: true
			},
			css: {
				files: {
					'test/css/main.css' : [
						'test/css/main.css'
					],
					'test/css/admin.css' : [
						'test/css/admin.css'
					],
					'test/css/jquery.fancybox.css' : [
						'test/css/jquery.fancybox.css'
					],
				}
			}
		},
		group_css_media_queries: {
			group: {
				files: {
					'parfenovka/css//main.css': [
						'test/css/main.css'
					],
					'parfenovka/css//admin.css': [
						'test/css/admin.css'
					],
					'parfenovka/css//jquery.fancybox.css': [
						'test/css/jquery.fancybox.css'
					]
				}
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			minify: {
				files: {
					'parfenovka/css/main.min.css' : ['parfenovka/css/main.css'],
					'parfenovka/css/admin.min.css' : ['parfenovka/css/admin.css'],
					'parfenovka/css/jquery.fancybox.min.css' : ['parfenovka/css/jquery.fancybox.css']
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: 'parfenovka.zip'
				},
				files: [
					{
						expand: true,
						cwd: '.',
						src: [
							'parfenovka/**'
						],
						dest: '/'
					},
				],
			},
		},
	});
	grunt.registerTask('default',	gc.default);
};
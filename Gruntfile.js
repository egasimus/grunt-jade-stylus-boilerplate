module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/*
			TASKS
		*/

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/fonts/',
                        src: ['**/**'],
                        dest: 'stage/fonts'
                    },
                    {
                        expand: true,
                        cwd: 'src/images/',
                        src: ['**/**'],
                        dest: 'stage/images'
                    },
                    {
                        expand: true,
                        cwd: 'src/scripts/',
                        src: ['**/**.js'],
                        dest: 'stage/scripts'
                    }
                ]
            }
        },

        stylus: {
            compile: {
                files: [
                    {
                        src: 'src/styles/style.styl',
                        dest: 'stage/styles/style.css'
                    }
                ]
            }
        },

        jade: {
            compile: {
                expand: true,
                cwd: 'src/pages/',
                src: '**/*.jade',
                dest: 'stage/',
                ext: '.html',
            }
        },

        watch: {
            files: ['src/**/*'],
            tasks: ['stylus:compile', 'jade:compile', 'copy:main'],
		},

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'stage'
                }
            }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-connect')

    grunt.registerTask('default', ['connect:server', 'watch'])
    grunt.registerTask('build', ['stylus', 'jade', 'copy:main']);
};

/*
 * Copyright (C) 2014 rocco
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        develop: {
            server: {
                tasks   : ['node-inspector'],
                file    : './app.js',
                nodeArgs: ['--debug']
            }
        },

        watch: {
            js: {
                tasks  : ['develop'],
                options: {
                    nospawn: true
                },
                files  : [
                    './app.js',
                    './lib/**/*.js'
                ]
            }
        },

        'node-inspector': {
            dev: {
                options: {
                    'web-port'      : 8080,
                    'web-host'      : 'localhost',
                    'debug-port'    : 5857,
                    'save-live-edit': true,
                    'hidden'        : [
                        'docs',
                        'nbproject',
                        'node_modules',
                        'test'
                    ]
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-develop');
    grunt.loadNpmTasks('grunt-node-inspector');

    // Register tasks
    grunt.registerTask('default', ['develop:server', 'node-inspector:dev', 'watch']);
};

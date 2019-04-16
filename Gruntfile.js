let node_modules = 'node_modules'



module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    let pkg = grunt.file.readJSON('package.json');
    let license = `
/*
 * ${pkg.name} v${pkg.version}
 * https://github.com/ansiboy/chitu-react
 *
 * Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 * Licensed under the MIT License.
 *
 */`;

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'dist/index.js': ['out/index.js']
                }
            },
            options: {
                banner: license,
                browserifyOptions: {
                    standalone: pkg.name,
                },
                external: ['react', 'react-dom', 'maishu-chitu', 'maishu-chitu-service'],
                transform: ['browserify-css'],
                // alias: [
                //     `./node_modules/maishu-chitu/out/index.js:maishu-chitu`,
                //     `./node_modules/maishu-chitu-service/out/index.js:maishu-chitu-service`,
                // ],
            }
        },
        concat: {
            chitudts: {
                options: {
                    stripBanners: true,
                    banner: license
                },
                src: ['./dist/index.js'],
                dest: './dist/index.js'
            },

        },
        requirejs: {
            dev: {
                options: {
                    baseUrl: `./`,
                    include: ['./out/index.js'],
                    exclude: [
                        "maishu-chitu",
                        "maishu-chitu-service",
                        "react",
                        "react-dom"
                    ],
                    // name: 'maishu-chitu-react',
                    out: `dist/index.js`,
                    optimize: "none",
                    paths: {
                        "maishu-chitu-service": "empty:",
                        "maishu-chitu": "empty:",
                        "react": "empty:",
                        "react-dom": "empty:"
                    },
                    shim: {


                    },

                },
            }
        },
        shell: {
            src: {
                command: `tsc -p src`
            }
        },
    })

    grunt.registerTask('default', ['shell', 'requirejs', 'concat']);
}
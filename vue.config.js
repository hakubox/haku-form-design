const webpack = require('webpack');
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: 'assemblyscript-typescript-loader',
                    include: /assembly/, //to avoid a conflict with other ts file who use 'ts-load',so you can division them with prop 'include'
                    options: {
                        limit: 1000,
                        name: `static/assembly/[name].[hash:8].wasm`
                    }
                }
            ]
        },
        resolve: {
            alias: {
                '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/config/icons.ts')
            }
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|jp/),
            new MonacoWebpackPlugin({
                languages: ['javascript', 'typescript', 'css', 'scss', 'html', 'json', 'csharp']
            })
            // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-antDesign',
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: path.resolve(__dirname, './src/components'),
                        minChunks: 3,
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    },
    css: {
        sourceMap: true,
        requireModuleExtension: true,
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
            sass: {
                prependData: `@import "~@/assets/scss/variables.scss";`
            }
        },
        modules: true
    },

    pwa: {
        name: 'demo',
        msTileColor: '#42B983'
    },

    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: false
        },
        apollo: {
            enableMocks: true,
            enableEngine: true
        }
    }
};

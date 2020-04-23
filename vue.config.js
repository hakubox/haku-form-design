const webpack = require('webpack');
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devServer: {
        disableHostCheck: true
    },
    runtimeCompiler: true,
    chainWebpack(config) {
        // 换肤loader[scss]
        const scss = config.module.rule('scss').toConfig();
        const useable_scss = { ...scss.oneOf[3], test: /\.lazy\.scss$/ };
        useable_scss.use = [...useable_scss.use];
        useable_scss.use[0] = { loader: 'style-loader', options: { injectType: 'lazySingletonStyleTag' } };
        config.module.rule('scss').merge({
            oneOf: [useable_scss]
        });

        // 换肤loader[less]
        const less = config.module.rule('less').toConfig();
        const useable_less = { ...less.oneOf[3], test: /\.lazy\.less$/ };
        useable_less.use = [...useable_less.use];
        useable_less.use[0] = { loader: 'style-loader', options: { injectType: 'lazySingletonStyleTag' } };
        config.module.rule('less').merge({
            oneOf: [useable_less]
        });
    },
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
        sourceMap: process.env.NODE_ENV !== 'production',
        requireModuleExtension: true,
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
            scss: {
                prependData: `@import "~@/assets/scss/variables.scss";`
            }
        }
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

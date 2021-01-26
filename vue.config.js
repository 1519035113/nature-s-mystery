//加载path模块
const path = require('path')
//定义resolve方法，把相对路径转换成绝对路径
const resolve = dir => path.join(__dirname, dir)

const CompressionWebpackPlugin = require('compression-webpack-plugin')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';

// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'nprogress': 'NProgress',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
        'echarts': 'echarts'
    },
    // cdn的css链接
    css: [
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css',
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    // cdn的js链接
    js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
        'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
        'https://unpkg.com/element-ui/lib/index.js',
        'https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js'
    ]
}

module.exports = {
    //去除生产环境的productionSourceMap
    productionSourceMap: false,
    publicPath: './',
    // 配置开发服务器
    outputDir: 'dist', // 打包后文件的目录 （默认为dist）
    assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录  默认为‘’没有单独目录js/css/img在根目录中。
    devServer: {
        port: 8888,
        // 配置端口号
        open: true,
        // 配置服务器自动打开浏览器
        https: true,
        // 是否开启https协议
        host: 'localhost',
        //设置主机名
        proxy: {
            '/api': {
                target: 'http://admintest.happymmall.com/',
                changeOrigin: true, // 开启代理
                pathRewrite: { // 重写路径
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {

        // ============注入cdn start============
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn
            return args
        })
        // ============注入cdn start============
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'))


    },
    configureWebpack: config => {

        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals

        plugins = [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                // test: /\.js$|\.html$|\.json$|\.css/,
                test: /\.js$|\.json$|\.css/,
                threshold: 10240, // 只有大小大于该值的资源会被处理
                minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                // deleteOriginalAssets: true // 删除原文件
            })
        ];
        // config.plugins.push(
        //     new UglifyJsPlugin({
        //         uglifyOptions: {
        //             compress: {
        //                 drop_console: true, //console
        //                 pure_funcs: ['console.log'] //移除console
        //             }
        //         },
        //         parallel: true
        //     }),
        // )
        // 公共代码抽离
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100
                    },
                    common: {
                        chunks: 'all',
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: 'common',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        }
    },

}
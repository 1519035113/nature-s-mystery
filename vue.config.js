module.exports = {
    publicPath: './',
    // 配置开发服务器
    devServer: {
        port: 8000,
        // 配置端口号
        open: true,
        // 配置服务器自动打开浏览器
        https: true,
        // 是否开启https协议
        host: 'localhost',
        //设置主机名
        proxy: {
            '/api': {
                target: '',
                changeOrigin: true, // 开启代理
                pathRewrite: { // 重写路径
                    '^/api': ''
                }
            }
        }
    }
}
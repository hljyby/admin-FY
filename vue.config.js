module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://fy.hljzztech.com/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },

    },
    transpileDependencies: [
        // 'element-ui'
    ]
}
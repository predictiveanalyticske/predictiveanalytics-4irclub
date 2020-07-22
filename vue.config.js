// vue.config.js
module.exports = {
chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].minify.removeAttributeQuotes = false;
            return args;
        })
},
configureWebpack: {
  output: {
    publicPath: '/', // if you don't put the "/" here, you get this error:
  },  
},
}
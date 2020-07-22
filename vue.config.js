// vue.config.js
module.exports = {
configureWebpack: {
  output: {
    publicPath: '/', // if you don't put the "/" here, you get this error:
  },  
}
}
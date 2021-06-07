const merge = require('webpack-merge');
var prodEnv = require('./prod.env')
const path = require('path')
module.exports = merge(prodEnv,{
    NODE_ENV: 'development',
    BASE_URL:'https://192.168.0.121',
    
})
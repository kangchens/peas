//babel.config.js
module.exports = {
    presets:[
        "@babel/preset-env",
        // {
        //     "useBuiltIns":"usage",
        //     "corejs":3
        // }
    ],
    plugins: [
        // 添加这个
       '@babel/plugin-syntax-dynamic-import'
    ]
}

module.exports = {
    NODE_ENV:'production',
    BASE_URL:'https://192.168.0.01',
    resolve:{
        extensions: ['.js', '.vue', '.json','ts'],
        alias:{
            'Utilities': path.resolve(__dirname, 'src/'),
        }
    }
}
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * https://momentjs.com/docs/
 */
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

/**
 * webpack url https://www.cnblogs.com/brandonhulala/p/6057378.html
 */

let port = 8806;
let publicPath = `/`;
const PUB_HOST = '';
const DEV_HOST = '';
const os = require('os');
///获取本机ip///
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
/**
 * 
 */
var proxyIP = '139.224.211.130';
/**
 * 林哥哥代理
 */
//proxyIP = '192.168.4.206';
const myHost = getIPAdress();
module.exports = {
    mode: 'development',
    entry: "./src/main.ts",
    devtool: 'inline-source-map',
    context: path.join(__dirname, '../'),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "assert/js/bundle.[hash:8].js",
        chunkFilename: 'vconfigs/[name].[hash:8].js',
        publicPath
    },
    devServer: {
        //璁剧疆鍩烘湰鐩綍缁撴瀯
        contentBase: path.resolve(__dirname, '../dist'),
        //鏈嶅姟鍣ㄧ殑IP鍦板潃锛屽彲浠ヤ娇鐢↖P涔熷彲浠ヤ娇鐢╨ocalhost
        host: myHost,
        //鏈嶅姟绔帇缂╂槸鍚﹀紑鍚�
        compress: true,
        hot: true,
        port: port,
        open: true,
        historyApiFallback: {
            rewrites: [
                { from: /^[a-zA-Z\d\/]+$/, to: '/index.html' }
            ]
        },
        proxy: {
            "/api": `http://${proxyIP}:8800`,
            "/socket": {
                target: `http://${proxyIP}:8800`,
                ws: true,
            }
        }
    },
    resolve: {
        extensions: ['.vue', ".ts", ".js", ".less", ".css"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/] }
        },
        //  使用vue-loader 加载 .vue 结尾的文件
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // 杩欓噷鍙互鎸囧畾涓�涓� publicPath
                        // 榛樿浣跨敤 webpackOptions.output涓殑publicPath
                        publicPath: '../../../'
                    },
                },
                'css-loader',
            ],
        },
        {
            test: /\.less$/,
            use:
                [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 杩欓噷鍙互鎸囧畾涓�涓� publicPath
                            // 榛樿浣跨敤 webpackOptions.output涓殑publicPath
                            publicPath: '../../../'
                        }
                    },
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, "../src/assert/style/theme.less")
                            ]
                        }
                    }
                ],
        },
        {
            test: /\.(jpe?g|png|gif|bmp|webp|svg)$/,
            // 规则 limit给定的是图片的大小 如果我们给定图片的大小大于等于我们给定的limit 则不会被转为base64编码
            //反之会被转换name=[hash:8]-[name].[ext] 前面加hash值区分图片 名字原样输出
            loader: 'url-loader?limit=8192&name=assert/img/[hash:8].[name].[ext]'
        },
        {
            test: /\.(woff|eot|ttf|woff2)$/,
            // 规则 limit给定的是图片的大小 如果我们给定图片的大小大于等于我们给定的limit 则不会被转为base64编码
            //反之会被转换name=[hash:8]-[name].[ext] 前面加hash值区分图片 名字原样输出
            loader: 'url-loader?limit=8192&name=assert/fonts/[hash:8].[name].[ext]'
        }]
    },
    externals: {

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../index.html"), // 婧愭ā鏉挎枃浠�
            filename: './index.html', // 杈撳嚭鏂囦欢銆愭敞鎰忥細杩欓噷鐨勬牴璺緞鏄痬odule.exports.output.path銆�
            showErrors: true,
            hash: true,
            inject: 'body',
            templateParameters: {
                mode: 'dev'
            }
        }),
        new webpack.DefinePlugin({
            HOST: JSON.stringify(process.env.NODE_ENV === 'production' ? PUB_HOST : DEV_HOST),
            MODE: JSON.stringify('dev')
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['zh-cn', 'en'],
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            },
            canPrint: true
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
            publicPath
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/assert/data/geo.json",
                    to: 'assert/data/geo.json'
                },
                {
                    from: "src/service/meta",
                    to: 'assert/meta'
                },
                {
                    from: "src/assert/img",
                    to: 'assert/img'
                }
            ]
        })
    ]
};
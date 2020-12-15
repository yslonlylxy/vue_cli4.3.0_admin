const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Version = new Date().getTime();
module.exports = {
	/* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
	/* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
	// publicPath: process.env.NODE_ENV === "production" ? "/public/" : "./",
	publicPath: "./",
	/* 输出文件目录：在npm run build时，生成文件的目录名称 */
	outputDir: "dist",
	/* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
	assetsDir: "assets",
	/* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
	productionSourceMap: false,
	/* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
	filenameHashing: false,
	/* 代码保存时进行eslint检测 */
	lintOnSave: true,
	/* webpack-dev-server 相关配置 */
	devServer: {
		/* 自动打开浏览器 */
		open: true,
		/* 设置为0.0.0.0则所有的地址均能访问 */
		host: "0.0.0.0",
		port: 8081,
		https: false,
		hotOnly: false
	},
	pages: {
		index: {
			// page 的入口
			entry: 'src/main.js',
			// 模板来源
			template: 'public/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'Index Page',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		}
	},
	configureWebpack: { // webpack 配置
		/*打包配置版本号*/
		output: {/*模块名称+时间戳*/
			// filename: `assets/js/[name].${Version}.js`,
			// chunkFilename: `assets/js/[name].${Version}.js`
			filename: `assets/js/[name].js`,
			chunkFilename: `assets/js/[name].js`
		},
		// 修改打包后css文件名
		plugins: [
			new MiniCssExtractPlugin({
				// filename: `assets/css/[name].${Version}.css`,
				// chunkFilename: `assets/css/[name].${Version}.css`
				filename: `assets/css/[name].css`,
				chunkFilename: `assets/css/[name].css`
			})
		]
	},
	// // 修改打包后img文件名
	// chainWebpack: config => {
	// 	config.module
	// 		.rule('images')
	// 		.use('url-loader')
	// 		.tap(options => {
	// 			return {
	// 				limit: 4096,
	// 				fallback: {
	// 					loader: 'file-loader',
	// 					options: {
	// 						name: `img/[name].${Version}.[ext]`
	// 					}
	// 				}
	// 			};
	// 		})
	// }
};
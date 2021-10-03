# Command Line

1. `npm init -y`
2. `npm install webpack webpack-cli --save-dev`
3. `npm install --save-dev html-webpack-plugin`
4. `npm install --save-dev style-loader css-loader`
5. `npm install --save-dev webpack-dev-server`
6. `npm install -D babel-loader @babel/core @babel/preset-env webpack`

# Package.json

```json
"private": "true",
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "build": "webpack",
   "start": "webpack serve --open"
},
```

# Webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		index: './src/app.js',
	},
	devServer: {
		static: './dist',
	},
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Weather App',
			template: './src/index.html',
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { targets: 'defaults' }]],
						cacheDirectory: true,
					},
				},
			},
		],
	},
};
```

# GIT

Intialize git, make first commit and push to github.

## Download script to push to dis to gh-pages

`wget https://github.com/X1011/git-directory-deploy/raw/master/deploy.sh && chmod +x deploy.sh`

`bash ./deploy.sh`

## Links for more info

-   https://gist.github.com/cobyism/4730490
-   https://github.com/X1011/git-directory-deploy

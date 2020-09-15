const tailwindcss = require('tailwindcss');
const isDev = process.env.NODE_ENV === 'development';
const plugins = [ tailwindcss('./tailwind.config.js') ];

module.exports = {
	plugins: plugins
}
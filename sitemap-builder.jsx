
require('@babel/register');
const Sitemap = require('react-router-sitemap').default;
const routes = require('./src/Routes').default;

(
	new Sitemap(routes)
		.build('https://www.booksonwall.art')
		.save('./sitemap.xml')
	//	.save('./sitemap.xml', '/public/')
);

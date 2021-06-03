
require('@babel/register');

const { createWriteStream } = require('fs');
const { SitemapStream } = require('sitemap');


let menu = [];
menu['en'] = require('./src/i18n/locales/en.json').menu;
menu['es'] = require('./src/i18n/locales/es.json').menu;
menu['fr'] = require('./src/i18n/locales/fr.json').menu;
menu['it'] = require('./src/i18n/locales/it.json').menu;
menu['pt'] = require('./src/i18n/locales/pt.json').menu;
const locales = ['en','es', 'fr', 'pt', 'it'];
let menuRoutes = [];
menuRoutes = [...menuRoutes, {url: "/", changefreq: 'daily', priority: 0.3 }];
locales.map(lang => {
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].explore, changefreq: 'daily', priority: 0.3 }];

	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].create, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].collaborate, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].info, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].connect, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].articles, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].stories, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].community, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].projects, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].applications, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].services, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].support, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].partner, changefreq: 'daily', priority: 0.3 }];
	menuRoutes = [...menuRoutes,{url: "/"+menu[lang].terms, changefreq: 'daily', priority: 0.3 }];
	return lang;
});
// Creates a sitemap object given the input configuration with URLs
const sitemap = new SitemapStream({ hostname: 'https://www.booksonwall.art' });

const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);
menuRoutes.map(m => sitemap.write(m));
sitemap.end();

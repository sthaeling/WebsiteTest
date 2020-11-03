const express = require('express');
const path = require('path');
const robots = require('express-robots-txt');
const PORT = process.env.PORT || 80;

var sass = require('sass');
sass.render({file: 'public/stylesheets/_index.scss'}, function (err, result) {})

express()
    .use(express.static(path.join(__dirname, 'public')))

    .use(robots(__dirname + '/robots.txt'))
    .use(robots({ UserAgent: '*', Disallow: '/' }))
    .use(robots({ UserAgent: '*', Disallow: '/', Sitemap: 'http://www.kellario.de/sitemap.xml' }))

    .get('/',(req, res) => res.render('pages/index'))
    .get('/snake',(req, res) => res.render('pages/snake/main'))
    .get('/commands', (req, res) => res.render('pages/commands/main'))
    .get('/orbiter', (req, res) => res.render('pages/orbiter/main'))
    .get('/robots.txt', (req, res) => res.renderFile('robots.txt'))
    .get('/sitemap.xml', (req, res) => res.render('sitemap.xml'))

    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

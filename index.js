const express = require('express');
const path = require('path');
const robots = require('express-robots-txt');
const PORT = process.env.PORT || 80;
const PORTDEFAULT = process.env.PORT || 8000;
const PORTSSL = process.env.PORT || 443;

var sass = require('sass');
sass.render({file: 'public/stylesheets/_index.scss'}, function (err, result) {})

var http = express();

http.get('*', function(req, res) {
    res.redirect('https://www.kellario.de'+ req.url);
})

http.listen(PORT, () => console.log(`Redirecting from ${ PORT }`));
http.listen(PORTDEFAULT, () => console.log(`Redirecting from ${ PORTDEFAULT }`));

const https = require("https"),
    fs = require("fs");

var key = fs.readFileSync(`/root/user/.ssl/kellario.key`),
    cert = fs.readFileSync(`/root/user/.ssl/primary.crt`),
    ca = fs.readFileSync(`/root/user/.ssl/intermediate.crt`);

const options = {
    key: key,
    cert: cert,
    ca: ca
};

const app = express();

app
    .use(express.static(path.join(__dirname, 'public')))

    .use(robots(__dirname + '/robots.txt'))
    .use(robots({ UserAgent: '*', Disallow: '/no-bots', Sitemap: `http://www.${ process.env.HOST }.de/sitemap.xml` }))

    .get('/',(req, res) => res.render('pages/index'))
    .get('/snake',(req, res) => res.render('pages/snake/main'))
    .get('/commands', (req, res) => res.render('pages/commands/main'))
    .get('/orbiter', (req, res) => res.render('pages/orbiter/main'))
    .get('/robots.txt', (req, res) => res.renderFile('robots.txt'))
    .get('/sitemap.xml', (req, res) => res.renderFile('sitemap.xml'))

    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
;

https.createServer(options, app).listen(PORTSSL, console.log(`Listening on ${ PORTSSL }`));

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 80;

var sass = require('sass');
sass.render({file: 'public/stylesheets/_index.scss'}, function (err, result) {})

express()
    .use(express.static(path.join(__dirname, 'public')))

    .get('/',(req, res) => res.render('pages/index'))
    .get('/snake',(req, res) => res.render('pages/snake/main'))
    .get('/commands', (req, res) => res.render('pages/commands/main'))
    .get('/orbiter', (req, res) => res.render('pages/orbiter/main'))

    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

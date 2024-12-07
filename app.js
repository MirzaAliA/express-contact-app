const express = require('express');
const app = express();
const port = 3000;
const {loadContact} = require('./utils/db');
const {check, validationResult} = require('express-validator');



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Halaman Home'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman About'
    })
})

app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Halaman Tambah Data Contact'
    })
})

app.post('/contact', [
    check('email', 'Email tidak valid!').isEmail(),
    check('noHP', 'Nomor HP tidak valid!').isMobilePhone('id-ID')
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('add-contact', {
            title: 'Tambah Data Contact',
            errors: errors.array()
        })
    } else {
        const contacts = await loadContact();
        const addContact = new contacts(req.body);
        addContact.save();
        res.redirect('/contact');
    }
})

app.get('/contact/:id', async (req, res) => {
    const contacts = await loadContact();
    contacts.find({ _id: `${req.params.id}` }).then((contact) => {
        res.render('detail', {
            title: 'Halaman Detail Contact',
            contact: contact[0]
        })
    })
})

app.get('/contact', async (req, res) => {
    const contacts = await loadContact();
    contacts.find().sort({nama: 1}).then((contacts) => {
        res.render('contact', {
            title: 'Halaman Contact',
            contacts: contacts
        })
    })
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h4>404 Not Found</h4>');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
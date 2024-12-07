const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contactSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    noHP: {
        type: String,
        required: true
    }
});


async function loadContact() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/zakk-contact-app');

        const Contact = mongoose.model('Contact', contactSchema, 'contacts');
        return Contact;
    }
    catch (error) {
        console.error(error);
    }
}



module.exports = { loadContact }
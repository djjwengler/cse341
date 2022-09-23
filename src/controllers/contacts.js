const mongodb = require('../database/connect')
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();

const getAllContacts = async (req, res, next) => {
    const contacts = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').find();
    contacts.toArray().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    });
};

const getOneContact = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').find({_id: contactId});
    contact.toArray().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data[0]);
    });
};

module.exports = { getAllContacts, getOneContact }
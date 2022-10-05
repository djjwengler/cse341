const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();

const getAllContacts = async (req, res) => {
  // #swagger.description = 'See all contacts'
  try {
    const contacts = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('contacts')
      .find();
    contacts.toArray().then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneContact = async (req, res) => {
  // #swagger.description = 'See one contact'
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('contacts')
      .find({ _id: contactId });
    contact.toArray().then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createContact = async (req, res) => {
  // #swagger.description = 'Create new contact'
  try {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const create = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('contacts')
      .insertOne(newContact);
    if (create.acknowledged) {
      res.status(201).json(create);
    } else {
      res
        .status(500)
        .json(
          create.error || 'An error occurred while creating the contact. Please try again later.'
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteContact = async (req, res) => {
  // #swagger.description = 'Delete contact by ID'
  try {
    const contactId = new ObjectId(req.params.id);
    const deleteContact = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('contacts')
      .deleteOne({ _id: contactId });
    console.log(deleteContact);
    if (deleteContact.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          deleteContact.error ||
            'An error occurred while deleting the contact. Please try again later.'
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateContact = async (req, res) => {
  // #swagger.description = 'Update contact by ID'
  try {
    const contactId = new ObjectId(req.params.id);
    const updateContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const update = await mongodb
      .getDatabase()
      .db(process.env.DB_NAME)
      .collection('contacts')
      .replaceOne({ _id: contactId }, updateContact);
    console.log(update);
    if (update.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          update.error || 'An error occurred while updating the contact. Please try again later.'
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllContacts, getOneContact, updateContact, deleteContact, createContact };

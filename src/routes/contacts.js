const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

//retrieves all Contacts
routes.get('/', contactsController.getAllContacts);

//retrieves one contact by ID
routes.get('/:id', contactsController.getOneContact);

module.exports = routes;
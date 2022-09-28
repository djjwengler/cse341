const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

//retrieves all Contacts
routes.get('/', contactsController.getAllContacts);

//retrieves one contact by ID
routes.get('/:id', contactsController.getOneContact);

//updates one contact by ID
routes.put('/:id', contactsController.updateContact);

//deletes one contact by ID
routes.delete('/:id', contactsController.deleteContact);

//creates one contact
routes.post('/', contactsController.createContact);

module.exports = routes;

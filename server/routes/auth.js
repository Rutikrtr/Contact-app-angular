const express = require('express');

const Router = express.Router();

const {AddNewContact,GetAllContacts,EditContact,DeleteContact} = require('../controllers/contact')

Router.get("/GetAllContacts",GetAllContacts)

Router.post("/AddNewContact",AddNewContact)
Router.post("/EditContact/:contactId", EditContact);
Router.delete("/DeleteContact/:contactId", DeleteContact);


module.exports = Router;

// http://localhost:6001/api/contact/GetAllContacts
const Contact = require('../models/MemberDetails')

exports.AddNewContact = async(req,res) => {
    try{
        const { firstname, lastname, email } = req.body;
        const contact = await Contact.create({
            firstname,
            lastname,
            email
        })
        return res.status(200).json({
            success:true,
            message:"Member is Register SuccessFull",
            contact
        })
    }
    catch (e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Contact not register"
        })
    }
}

exports.GetAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find(); // Retrieves all contacts from the database
        if (contacts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No contacts found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Contacts fetched successfully",
            contacts
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve contacts"
        });
    }
}


exports.EditContact = async (req, res) => {
    try {
        const { contactId } = req.params; // Assuming the contactId is passed as a URL parameter
        const { firstname, lastname, email } = req.body; // Data to be updated
        
        // Find the contact by contactId and update it
        const contact = await Contact.findByIdAndUpdate(
            contactId, 
            { firstname, lastname, email },
            { new: true } // Returns the updated document
        );
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            contact
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Failed to update contact"
        });
    }
}


exports.DeleteContact = async (req, res) => {
    try {
        const { contactId } = req.params; // Assuming the contactId is passed as a URL parameter
        
        // Find the contact by contactId and remove it
        const contact = await Contact.findByIdAndDelete(contactId);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Failed to delete contact"
        });
    }
}

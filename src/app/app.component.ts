import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Add FormsModule here
})
export class AppComponent {
  title = 'contacts-app';
  contacts: any[] = []; // Array to store contacts data
  apiUrl = 'http://localhost:6001/api/contact/GetAllContacts'; // URL for getting contacts
  addContactUrl = 'http://localhost:6001/api/contact/AddNewContact'; // URL for adding a new contact
  showModal = false; // Controls the visibility of the modal
  contactToEdit: any = null; // Model for the contact to edit

  constructor() {
    this.getContacts(); // Fetch contacts on component initialization
  }

  // Function to get contacts from backend
  async getContacts(): Promise<void> {
    try {
      const response = await axios.get(this.apiUrl);
      if (response.data.success) {
        this.contacts = response.data.contacts;
      } else {
        console.error('Failed to fetch contacts:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  // Function to open the modal
  openModal(contact: any = null) {
    this.showModal = true;
    if (contact) {
      this.contactToEdit = { ...contact }; // Clone the contact to avoid direct mutation
    } else {
      this.contactToEdit = { firstname: '', lastname: '', email: '' }; // Reset form for adding
    }
  }

  // Function to close the modal
  closeModal() {
    this.showModal = false;
    this.contactToEdit = null; // Reset the contact object
  }

  // Function to add a new contact
  async addNewContact() {
    try {
      const response = await axios.post(this.addContactUrl, this.contactToEdit);
      if (response.data.success) {
        this.contacts.push(response.data.contact); // Add new contact to the list
        this.closeModal(); // Close the modal
        console.log('Contact added successfully');
      } else {
        console.error('Failed to add contact:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  }

  // Function to update an existing contact
  async updateContact() {
    try {
      // Assuming contactToEdit contains the updated contact details and _id
      const response = await axios.post(
        `http://localhost:6001/api/contact/EditContact/${this.contactToEdit._id}`, // Include contactId in URL
        {
          firstname: this.contactToEdit.firstname,
          lastname: this.contactToEdit.lastname,
          email: this.contactToEdit.email
        }
      );
  
      if (response.data.success) {
        // Handle successful contact update
        const index = this.contacts.findIndex(contact => contact._id === this.contactToEdit._id);
        if (index !== -1) {
          this.contacts[index] = response.data.contact; // Update contact in the list
        }
        this.closeModal(); // Close modal
        console.log('Contact updated successfully');
      } else {
        console.error('Failed to update contact:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }
  
  

  // Function to trigger the edit contact modal
  editContact(contact: any) {
    this.openModal(contact); // Open modal and pass contact to edit
  }

  // Function to delete a contact
  
  deleteContact(contactId: string) {
    if (confirm('Are you sure you want to delete this contact?')) {
      axios.delete(`http://localhost:6001/api/contact/DeleteContact/${contactId}`)
        .then(() => {
          // Remove the contact from the list after deletion
          this.contacts = this.contacts.filter(contact => contact._id !== contactId);
        })
        .catch(error => {
          console.error('Error deleting contact', error);
        });
    }
  }
  
}

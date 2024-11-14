import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'YoUR BackEnd URl';

  // Get all contacts
  async getContacts(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}GetAllContacts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  // Add new contact
  async addContact(contact: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}AddNewContact`, contact);
      return response.data;
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  }

  // Edit existing contact
  async updateContact(contactId: string, contact: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}EditContact/${contactId}`, contact);
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }

  // Delete a contact
  async deleteContact(contactId: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}DeleteContact/${contactId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }
}

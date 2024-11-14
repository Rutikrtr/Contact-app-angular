import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  // Load contacts from the service
  async loadContacts(): Promise<void> {
    const data = await this.contactService.getContacts();
    if (data.success) {
      this.contacts = data.contacts;
    } else {
      console.error('Failed to fetch contacts');
    }
  }

  editContact(contact: any) {
    // Emit event to parent or use a service to trigger modal
  }

  deleteContact(contactId: string) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(contactId).then(() => {
        this.contacts = this.contacts.filter(contact => contact._id !== contactId);
      }).catch((error : any) => {
        console.error('Error deleting contact', error);
      });
    }
  }
}

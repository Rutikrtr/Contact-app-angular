// src/app/contact/contact.component.ts
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contacts: any[] = [];
  contact = {
    firstname: '',
    lastname: '',
    email: '',
  };
  editingContact: any = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  addContact(): void {
    this.contactService.addContact(this.contact).subscribe((data) => {
      this.contacts.push(data);
      this.resetForm();
    });
  }

  editContact(contact: any): void {
    this.editingContact = { ...contact };
  }

  updateContact(): void {
    this.contactService.updateContact(this.editingContact._id, this.editingContact).subscribe((data) => {
      this.getContacts();
      this.editingContact = null;
    });
  }

  deleteContact(id: string): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter((c) => c._id !== id);
    });
  }

  resetForm(): void {
    this.contact = { firstname: '', lastname: '', email: '' };
  }
}

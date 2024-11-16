import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  @Input() contactToEdit: any = null;
  @Output() refreshContacts = new EventEmitter<void>();

  contact: any = {};

  constructor(private contactService: ContactService) {}

  ngOnChanges(): void {
    if (this.contactToEdit) {
      this.contact = { ...this.contactToEdit }; // Clone the contact for editing
    } else {
      this.contact = { firstname: '', lastname: '', email: '' }; // Initialize a new contact
    }
  }
  
  async handleSubmit() {
    try {
      if (this.contact._id) {
        // Edit contact
        await this.contactService.updateContact(this.contact._id, this.contact);
      } else {
        // Create new contact
        await this.contactService.createContact(this.contact);
      }
      this.refreshContacts.emit(); // Notify parent to refresh the contact list
      this.closeModal();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  }

  closeModal() {
    this.contactToEdit = null;
    this.refreshContacts.emit(); // Reset parent state
  }
}
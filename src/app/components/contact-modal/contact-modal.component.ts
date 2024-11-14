import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() contactToEdit: any;
  @Output() refreshContacts = new EventEmitter<void>();

  constructor(private contactService: ContactService) {}

  // Close the modal and reset
  closeModal() {
    this.contactToEdit = null;
  }

  // Handle submit for add or update contact
  async handleSubmit() {
    if (this.contactToEdit._id) {
      await this.contactService.updateContact(this.contactToEdit._id, this.contactToEdit);
    } else {
      await this.contactService.addContact(this.contactToEdit);
    }
    this.refreshContacts.emit();
    this.closeModal();
  }
}

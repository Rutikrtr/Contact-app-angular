import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include FormsModule
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  filteredContacts: any[] = []; // Filtered list of contacts
  searchTerm: string = ''; // Search term
  selectedFilter: string = 'none'; // Default filter selection
  @Output() editContact = new EventEmitter<any>();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  async loadContacts(): Promise<void> {
    try {
      const data = await this.contactService.getContacts();
      if (data.success) {
        this.contacts = data.contacts;
        this.filteredContacts = [...this.contacts]; // Initialize filtered contacts
        this.applyFilter(); // Apply default filter
      } else {
        console.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  }

  handleEdit(contact: any) {
    this.editContact.emit(contact); // Emits `null` for Create
  }

  async deleteContact(contactId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await this.contactService.deleteContact(contactId);
        this.contacts = this.contacts.filter((c) => c._id !== contactId);
        this.filterContacts(); // Reapply filter after deletion
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  }

  filterContacts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredContacts = this.contacts.filter(
      (contact) =>
        contact.firstname.toLowerCase().includes(term) ||
        contact.lastname.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term)
    );
    this.applyFilter(); // Ensure filters are applied after search
  }

  applyFilter(): void {
    if (this.selectedFilter === 'none') {
      this.filteredContacts = [...this.contacts]; // Reset to original order
      this.filterContacts(); // Reapply search filter
      return;
    }

    const sortKey = this.selectedFilter.includes('firstname') ? 'firstname' : 'lastname';
    const sortOrder = this.selectedFilter.includes('asc') ? 1 : -1;

    this.filteredContacts.sort((a, b) =>
      a[sortKey].localeCompare(b[sortKey]) * sortOrder
    );
  }
}

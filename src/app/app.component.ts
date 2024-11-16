import { Component } from '@angular/core';
import { ContactListComponent } from './components/contact-list/contact-list.component'
import {ContactModalComponent} from './components/contact-modal/contact-modal.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports:[ContactListComponent,ContactModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contactToEdit: any = null;

  openModal(contact: any) {
    this.contactToEdit = contact;
  }

  refreshContacts() {
    this.contactToEdit = null; // Reset the modal state
  }
}
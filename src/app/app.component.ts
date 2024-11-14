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
  title = 'contacts-app';
  contactToEdit: any = null;

  openModal(contact: any = null) {
    this.contactToEdit = contact ? { ...contact } : { firstname: '', lastname: '', email: '' };
  }

  refreshContacts() {
    this.contactToEdit = null;
  }
}

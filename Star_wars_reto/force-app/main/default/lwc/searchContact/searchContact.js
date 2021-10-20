
import { LightningElement, wire } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 300;

export default class SearchContact extends LightningElement {
    busqueda = '';

    @wire(findContacts, { busqueda: '$busqueda' })
    contacts;

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const busqueda = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.busqueda = busqueda;
        }, DELAY);
    }
}
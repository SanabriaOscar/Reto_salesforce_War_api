    import { LightningElement, wire, api, track } from 'lwc';
    import { ShowToastEvent } from 'lightning/platformShowToastEvent';
    import getContacts from '@salesforce/apex/ContactController.getContacts'
    import getNameById from '@salesforce/apex/ContactController.getNameById'
    import NAME_FIELD from '@salesforce/schema/Contact.LastName';
    import HEIGHT_FIELD from '@salesforce/schema/Contact.Height__c';
    import GENDER_FIELD from '@salesforce/schema/Contact.Gender__c';
    import HAIR_FIELD from '@salesforce/schema/Contact.Hair_color__c';
    import EYE_FIELD from '@salesforce/schema/Contact.Eye_color__c';
    import URL_FIELD from '@salesforce/schema/Contact.URL__c';
    import HOME_FIELD from '@salesforce/schema/Contact.Homeworld__c';
    import NUMBER_FIELD from '@salesforce/schema/Contact.Number_character__c';
    

    export default class ContactController extends LightningElement {
        @track contact;
        @track error;
        @wire (getNameById,{searchKeyNum: '$searchKey'})
        wiredContacs({data, error}){
            if(data) {
                this.contact =data;
                this.error = undefined;
            }else {
                this.contact =undefined;
                this.error = error;
            }
        }
        handleKeyChange(event){
            this.searchKey = event.target.value;
        }
    //otras cosas
        contactColumns = [
            { label: 'Name', fieldName: 'LastName' },
            { label: 'Height', fieldName: 'Height__c' },
            { label: 'Gender', fieldName: 'Gender__c' },
            { label: 'Hair Color', fieldName: 'Hair_color__c' },
            { label: 'Eye Color', fieldName: 'Eye_color__c' },
            { label: 'URL', fieldName: 'URL__c' },
            { label: 'Home World', fieldName: 'Homeworld__c' },
            { label: 'Number Character', fieldName: 'Number_character__c' },
        ];
        contact = NAME_FIELD;
      fields = [NAME_FIELD, HEIGHT_FIELD, GENDER_FIELD, HAIR_FIELD, EYE_FIELD, URL_FIELD, HOME_FIELD, NUMBER_FIELD];
      
        @wire(getContacts)
        contacts;
        @api objectApiName;
        handleSuccess(event) {
            const evt = new ShowToastEvent({
                title: "Contact Created",
                message: "Record ID: " + event.detail.id,
                variant: "success"
            });
            this.dispatchEvent(evt);
        }
        
        @track searchKey;

	
    }


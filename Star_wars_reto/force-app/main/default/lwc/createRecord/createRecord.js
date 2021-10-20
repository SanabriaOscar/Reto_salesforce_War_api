import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContacts from '@salesforce/apex/ContactController.getContacts'
import getNameById from '@salesforce/apex/ContactController.getNameById'
import CleanStatus from '@salesforce/schema/Account.CleanStatus';

export default class ContactController extends LightningElement {
    @track
    
  @track searchKey; 
  @track fields=[];
  @track error;
   
    @wire (getNameById,{searchKeyNum: '$searchKey'})
    wiredContacs({data, error}){
        if(data) {
            this.fields = data;
            console.log(this.fields.gender);
            if(this.fields.detail){
                this.notFound();
                console.log('not found!!!!!');
                this.fields=null;
            }
            else{
                console.log('disable ejecutado');
                this.handleGenderChange();
            }
            this.error = undefined;
        }else {
            this.fields =undefined;
            this.error = error;
        }
    }
     
    /* handleGenderChange(event) {
         if (!event.target.value){
            event.target.reportValidity();
            this.disabled = true;
        }else {
         this.disabled = false;
         console.log('test');
        }  
    }*/


    notFound(){
        const evt = new ShowToastEvent({
            title: "API response",
            message: "Character not found!!!!! ",
            variant: "error"
        });
        this.dispatchEvent(evt);
    }
    
    

    handleKeyChange(event){
    
        this.searchKey = event.target.value;
        
    }

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
  
  
    @wire(getContacts)
    contacts;
 
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Contact Created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
    
 


}


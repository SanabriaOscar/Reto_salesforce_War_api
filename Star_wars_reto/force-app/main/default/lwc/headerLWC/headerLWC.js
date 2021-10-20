import { LightningElement, track, wire } from 'lwc';
import getNameById from '@salesforce/apex/ContactController.getNameById'
export default class headerLWC extends LightningElement {
  
  @track searchKey;
	@track contacts;
	@track error;
	@wire (getNameById,{searchKeyNum: '$searchKey'})
	wiredContacs({data, error}){
		if(data) {
			this.contacts =data;
			this.error = undefined;
		}else {
			this.contacts =undefined;
			this.error = error;
		}
	}
	handleKeyChange(event){
		this.searchKey = event.target.value;
	}
}
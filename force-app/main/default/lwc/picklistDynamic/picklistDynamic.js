import { LightningElement, track,wire } from 'lwc';
import TechdicerChannel from '@salesforce/messageChannel/SampleMessageChannel__c';
import {publish, MessageContext} from 'lightning/messageService'
export default class PicklistDynamic extends LightningElement {
     @wire(MessageContext)
    messageContext;
    message;

 @track value = 'inProgress';

get options() {
    return [
             { label: 'Account', value: 'Account' },
             { label: 'Lead', value: 'Lead' },
             { label: 'Contact', value: 'Contact' },
              { label: 'Opportunity', value: 'Opportunity' },
           ];
}

handleChange(event) {
        this.value = event.detail.value;
         let message = {message: this.value};
        publish(this.messageContext, TechdicerChannel, message);
        
     }
}
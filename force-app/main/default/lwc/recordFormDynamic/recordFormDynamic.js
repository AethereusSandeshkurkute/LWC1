import { LightningElement, wire,track  } from 'lwc';
import TechdicerChannel from '@salesforce/messageChannel/SampleMessageChannel__c';
import { subscribe, MessageContext } from 'lightning/messageService';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ListViewController from'@salesforce/apex/ListViewController.fetchListViews';

export default class RecordFormDynamic extends LightningElement {
  //fields = ['Name', 'AnnualRevenue', 'Industry'];
 boolVisible = false; 

  publisherMessage = '';
    subscription = null;
 
    @wire(MessageContext)
    messageContext;
 
    connectedCallback() {
        this.handleSubscribe();
    }
 
    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, TechdicerChannel, (message) => {
            console.log(message.message);
            this.publisherMessage = message.message;
            this.ShowToast('Success', message.message, 'success', 'dismissable');
            this.boolVisible = true;  
        });
    }
 
    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
      
    }

    ///Record Form
    modeName ='edit';
    objectApiName ='Lead';//this.publisherMessage;
    
    recordId = '001B000001AR4dE';
    

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
       // fields.Name = 'Tushar Sharma'; // modify a field
       // console.log('fields', fields);
       // console.log('fields 2', fields.Name);
        this.template.querySelector('lightning-record-form').submit(fields);
       ///  ListViewController({ strObjName: publisherMessage })
     }

     handleSuccess(event) {
        console.log('fields');
        const evt = new ShowToastEvent({
            title: "Account Created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.template.querySelector('form').reset();
        this.dispatchEvent(evt);
          
    }
}
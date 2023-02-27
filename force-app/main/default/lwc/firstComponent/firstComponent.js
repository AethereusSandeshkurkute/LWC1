import { LightningElement,track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class FirstComponent extends LightningElement {
@track listRecords;
  i = 0;
    @track columns  = [
        { label: 'Status', fieldName: 'status' },
        { label: 'Task Name', fieldName: 'task' }
      
    ];

@track removeValue ;
getSelectedIdAction(event)
{  
  this.listRecords = this.listRecords.filter(row => row.id !== event.detail.getSelectedRows); //worked partially
  //var listRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
 /// const selectedContactRows = event.detail.selectedRows;
  ///window.console.log('selectedContactRows# ' + JSON.stringify(selectedContactRows));

  //this.listRecords.splice(this.listRecords.findIndex(row => row.Id === selectedContactRows), 1);
 ///this.listRecords.splice(selectedContactRows, 1);   //worked partially
/// this.listRecords.splice(selectedContactRows[0],1);  //worked partially
///this.listRecords.splice(listRecords.indexOf(selectedContactRows),1);
  this.listRecords = [...this.listRecords];
}

  handleAddToArray(event) {
 
        if(event.key==='Enter')
        {
        //  if (event.target.value.length < 3) {
        //    alert("Enter atlease 3 Characters")
       //   }
           // alert('Onclick'+event.key)
          const taskName=event.target.value;
       
        let newEntry = {
           
            'status' : 'Open',
            'task' : taskName
        };


        if ( this.listRecords ) {

            this.listRecords = [...this.listRecords, newEntry ];
                    const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Task Created successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);

        } else {

            this.listRecords = [ newEntry ];

        }

        this.i++;

    }
 }
}
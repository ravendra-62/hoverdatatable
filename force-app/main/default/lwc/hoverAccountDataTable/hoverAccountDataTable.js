import { LightningElement,wire,track, api } from "lwc";
import getAccountList from "@salesforce/apex/HoverController.getAccountList";
import getContacts from "@salesforce/apex/HoverController.getContacts";
const columns = [{
    label: 'First Name',
    fieldName: 'FirstName'
},
{
    label: 'Last Name',
    fieldName: 'LastName'
},
{
    label: 'Email',
    fieldName: 'Email',
    type: 'email'
},
{
    label: 'Phone',
    fieldName: 'Phone',
}

];
export default class AccountList extends LightningElement {

@track accountId = '';
@track contacts = [];
@track columns = columns;
@track accData = [];
@track selectedAccount = '';
@track objRecordId;
connectedCallback(){
    getAccountList()
    .then(result =>{
        this.accData = result
        console.log('this.accData  ' + JSON.stringify(this.accData));
        //console.log('this.accData  ' + this.accData.fieldName);
    })
    .catch(error =>{
    });
}

showData(event) {
    //alert('HI');
    this.selectedAccount = event.currentTarget.dataset.id
   // alert('HI  ' +  this.selectedAccount );

    console.log('selectedAccount =  ' + this.selectedAccount);
    this.accountId = this.selectedAccount;  
    if (this.selectedAccount != null) {
        getContacts({
                accountId: this.selectedAccount
            })
            .then(result => {
                this.contacts = result;
            })
            .catch(error => {
                this.error = error;
            });
    }
    this.objRecordId = null
    const toolTipDiv = this.template.querySelector('div.ModelTooltip');
    toolTipDiv.style.opacity = 1;
    toolTipDiv.style.display = "block";
    window.clearTimeout(this.delayTimeout);
    
    this.delayTimeout = setTimeout(() => {
        this.objRecordId = this.selectedAccount;
    }, 50);
    
}
hideData(event){
       const toolTipDiv = this.template.querySelector('div.ModelTooltip');
        toolTipDiv.style.opacity = 0;
        toolTipDiv.style.display = "none";
}
} 
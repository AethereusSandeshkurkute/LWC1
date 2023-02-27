import { LightningElement, track, wire } from 'lwc';
//import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//import performCallout from '@salesforce/apex/WebServiceLWC.fetchWeatherInfo';
import fetchWeatherInfo from "@salesforce/apex/WebServiceLWC.fetchWeatherInfo";

//import weather from '@salesforce/resourceUrl/weather';

export default class DisplayWeatherInformation extends LightningElement {
  countryOptions = [
        { "label": "India", "value": "IN" },
        { "label": "USA", "value": "US" },
        { "label": "Turkey", "value": "TR" },
        { "label": "Australia", "value": "AU" }
    ];
 
    countryCode;
    zipCode;
    showSpinner = false;
    result = {};
    //check field validation
    handleCheckValidation() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.fieldvalidate');
        inputFields.forEach(inputField => {
            
 
            if(inputField.name == "Latitude"){
                this.countryCode = inputField.value;
            } else if(inputField.name == "Longitude"){
                this.zipCode = inputField.value;
            }
        });
        return isValid;
    }
 
    handleValidation(event) {
        if(this.handleCheckValidation()) {
            this.handleSpinner();
            //send data to server side to check wetaher
            fetchWeatherInfo({lat : this.countryCode, lan : this.zipCode})
            .then(result => {
                //do something
                console.log(result.name);
                result.temp = (result.temp - 274.15).toFixed(2);
                result.sunset = this.convertUnixToTime(result.sunset);
                result.sunrise = this.convertUnixToTime(result.sunrise);
 
                this.result = result;
 
                this.handleSpinner();
            })
            .catch((error) => {
                //Let's send the user a toast with our custom error message
                const evt = new ShowToastEvent({
                    title: "Yikes!",
                    message: error.body.message,
                    variant: "error",
                });
                this.dispatchEvent(evt);
                this.handleSpinner();
            })
        }
    }
 
    convertUnixToTime(unixtimestamp){
        console.log(unixtimestamp);
        var dt = unixtimestamp * 1000;
        var myDate = new Date(dt);
        console.log(myDate);
        return(myDate.toLocaleString());
    }
 
    handleSpinner(){
        this.showSpinner = !this.showSpinner;
    }
}
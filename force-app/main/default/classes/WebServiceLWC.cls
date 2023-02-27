global class WebServiceLWC {
 
      @AuraEnabled
    public static wrapperData fetchWeatherInfo(Decimal lat, Decimal lan){
         
        String APIKey = 'a0044bd1008903b54a7e61bc07d1de24';
        //authurize this url in remote setting 
        //String endPoint = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' +appId;
        String endPoint = 'https://fcc-weather-api.glitch.me/api/current?lat' + lat + '&lon=' +lan;
        HttpRequest request = new HttpRequest();
        HttpResponse response = new HttpResponse();
        Http http = new Http();
        request.setEndpoint(endPoint);
        request.setMethod('POST');
        response = http.send(request);
     ///   if (response.getStatusCode() == 200) {
           String jsonResponse = response.getBody();
     //   fromJSON.temp obj;
     //    obj = fromJSON.main.parse(response.getBody());
    //            system.debug('Obj'+obj); 
        
            System.debug('Response-' + jsonResponse); 
   
       return null;
    ///    } else{
    ///        throw newMessageException('Error : Please check lat or long');
    ///    }
    }
 
/*    private static AuraHandledException newMessageException(String message) {
        AuraHandledException e = new AuraHandledException(message);
        e.setMessage(message);
        return e;
    }*/
 
    public class wrapperData{
        @AuraEnabled
        public String name;
        @AuraEnabled
        public Double temp;
        @AuraEnabled
        public Integer sunset;
        @AuraEnabled
        public Integer sunrise;
        @AuraEnabled
        public Integer humidity;
        @AuraEnabled
        public Integer pressure;
      
      /*  public wrapperData(fromJSON parseData){
            cls_main te = parseData.main;
            this.name =  parseData.name;
            this.temp = te.temp;
            this.humidity = te.humidity;
            this.pressure = te.pressure;
            this.sunrise = parseData.sys.sunrise;
            this.sunset = parseData.sys.sunset;
        } */
    }
 

}
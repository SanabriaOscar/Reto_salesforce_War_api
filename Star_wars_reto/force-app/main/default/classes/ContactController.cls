public with sharing class ContactController {
    public String name {get; set;}

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return[SELECT Id, LastName, Height__c, Gender__c, Hair_color__c,
        Eye_color__c, URL__c, Homeworld__c, Number_character__c FROM Contact];
    }
    //otra prueba 
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String busqueda) {
        String key = '%' + busqueda + '%';
        return[SELECT Id, LastName FROM Contact
        WHERE LastName LIKE :key ];
    } 



    @AuraEnabled(cacheable=true)
    public static  Map<String, Object>  getNameById(Integer searchKeyNum){
       
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://swapi.dev/api/people/'+searchKeyNum);
        request.setMethod('GET');
        request.setHeader('Accept','application/json');
        request.setHeader('Content-type','application/json');
        HttpResponse response = http.send(request);
        system.debug('****response '+response.getStatusCode());
        system.debug('****response-Data '+response.getBody());
     
             Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug('Recibiendo el personaje' + result );
   
             return  result;
        //}
       
    }
    
    /*    @AuraEnabled(cacheable=true)
    public static String getNameById(Integer searchKeyNum){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://swapi.dev/api/people/'+searchKeyNum);
        request.setMethod('GET');
        request.setHeader('Accept','application/json');
        request.setHeader('Content-type','application/json');
        HttpResponse response = http.send(request);
       String results='';
        system.debug('****response '+response.getStatusCode());
        system.debug('****response '+response.getBody());
        if (response.getStatusCode() == 200) 
        {
             Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            results= string.valueof(result.get('name'));
            System.debug('Recibiendo el personaje' + results );
             System.debug( result );   
        }
        return results;
    }*/
    
    
}
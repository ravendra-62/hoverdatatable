public with sharing class HoverController {
   @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name FROM Account LIMIT 15];
    }
    @AuraEnabled
    public static List<Contact> getContacts(String accountId){
        return [SELECT Id,FirstName,LastName,Email,Phone FROM Contact where AccountId=:accountId];
         
    }  
}
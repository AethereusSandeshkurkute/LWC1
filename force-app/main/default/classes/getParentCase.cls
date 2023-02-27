public class getParentCase {

  @AuraEnabled(cacheable=true)
    public static List<case> getCaseData() {
        return [select id ,CaseNumber,Origin, Priority, ParentId,Subject from case where ParentId =null ];
    }   

 @AuraEnabled(cacheable=true)
    public static List<case> getChildCase(Id parentId) {
        return [select id ,CaseNumber,Origin, Priority, ParentId,Subject from case WHERE ParentId = :parentId ];
    }   
}
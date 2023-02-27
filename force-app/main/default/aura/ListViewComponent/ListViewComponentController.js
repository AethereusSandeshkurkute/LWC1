({
    showData : function(component, event, helper) {
        helper.showListViewData(component, event, helper);
    },
    
    onListViewChange : function(component, event, helper) {
        helper.showRecordsData(component, event, helper);
    },
    handleReceiveMessage: function (component, event, helper) {
        if (event != null) {
            const message = event.getParam('message');
            const source = event.getParam('source');
            component.set("v.receivedMessage", '' + message);
            component.set("v.inputName", '' + message);
        }
        
    }
    
})
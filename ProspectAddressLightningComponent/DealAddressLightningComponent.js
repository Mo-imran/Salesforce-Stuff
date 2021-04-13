-----------ProspectAddressLightningComponent.js-----------
({
    /*showSpinner: function(component, event, helper) {
        component.set("v.Spinner", true); 
        
   },*/
    
    hideSpinner : function(component,event,helper){
        component.set("v.Spinner", true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.Spinner", false);
            }), 3000);
    },
    onup1 : function(component, event, helper){
        var img1 = component.find("imgOver1");
        $A.util.addClass(img1,'point');
    },
    onup2 : function(component, event, helper){
        var img1 = component.find("imgOver2");
        $A.util.addClass(img1,'point');
    },
    onup3 : function(component, event, helper){
        var img1 = component.find("imgOver3");
        $A.util.addClass(img1,'point');
    },
    onup4 : function(component, event, helper){
        var img1 = component.find("imgOver4");
        $A.util.addClass(img1,'point');
    },
    onup5 : function(component, event, helper){
        var img1 = component.find("imgOver5");
        $A.util.addClass(img1,'point');
    },
    onup6 : function(component, event, helper){
        var img1 = component.find("imgOver6");
        $A.util.addClass(img1,'point');
    },
    onout1 : function(component, event, helper){
        var img1 = component.find("imgOver1");
        $A.util.removeClass(img1,'point');
    },
    onout2 : function(component, event, helper){
        var img1 = component.find("imgOver2");
        $A.util.removeClass(img1,'point');
    },
    onout3 : function(component, event, helper){
        var img1 = component.find("imgOver3");
        $A.util.removeClass(img1,'point');
    },
    onout4 : function(component, event, helper){
        var img1 = component.find("imgOver4");
        $A.util.removeClass(img1,'point');
    }, 
    onout5 : function(component, event, helper){
        var img1 = component.find("imgOver5");
        $A.util.removeClass(img1,'point');
    },
    onout5 : function(component, event, helper){
        var img1 = component.find("imgOver6");
        $A.util.removeClass(img1,'point');
    },
    
    sectionOne : function(component, event, helper) {
        helper.helperFun(component,event,'articleOne');
    },
    
    
    p1 : function(component, event, helper) {
        var action = component.get("c.getPicklistvalues1");
        action.setParams({
            'objectName': component.get("v.ObjectName"),
            'field_apiname': component.get("v.Type"),
            'nullRequired': true // includes --None--
        });
        action.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS"){
                component.set("v.Picklist1", a.getReturnValue());
                console.log('P1', component.set("v.Picklist1", a.getReturnValue()));
            } 
        });
        
        $A.enqueueAction(action);
        
    },
    p2 : function(component, event, helper) {
        var action = component.get("c.getPicklistvalues2");
        action.setParams({
            'objectName': component.get("v.ObjectName"),
            'field_apiname': component.get("v.Type2"),
            'nullRequired': true // includes --None--
        });
        action.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS"){
                component.set("v.Picklist2", a.getReturnValue());
            } 
        });
        
        $A.enqueueAction(action);
        
    },
    /*toggleSection : function(component, event, helper) {
         
        var sectionAuraId = event.target.getAttribute("data-auraId");
        var sectionDiv = component.find(sectionAuraId).getElement();
        var sectionState = sectionDiv.getAttribute('class').search('slds-is-open'); 
        if(sectionState == -1){
            sectionDiv.setAttribute('class' , 'slds-section slds-is-open');
        }else{
            sectionDiv.setAttribute('class' , 'slds-section slds-is-close');
        }
         
    },*/
    
    doInit : function(component, event, helper){
        var action = component.get("c.contactDetails");
        action.setParams({
            "recordId": component.get("v.recordId")
            
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('check 1 ', state);
            if (state === "SUCCESS") {
                
                console.log('contactrecord from init ', response.getReturnValue());
                component.set("v.contactrecord",response.getReturnValue());
                
            }
            
        });
        $A.enqueueAction(action);
        
    },
    
    handleSubmit : function(component, event, helper){
        var a = component.get("v.prop"); 
        var b = component.get("v.Occup");
        console.log('Occupancy ', component.get("v.Occup"));
        console.log('Property ', component.get("v.prop"));
        
        var action = component.get("c.updateData");
        action.setParams({
            "recordId": component.get("v.recordId"),
            "recordData": component.get("v.contactrecord"),
            "property": a,
            "occupancy": b
        });
        action.setCallback(this, function(response) {
            $A.get('e.force:refreshView').fire();
            //window.location.reload(); 
        });
        component.set("v.showInputFields", false);
        
        $A.enqueueAction(action);
        
        
    },
    /* handleSuccess: function(component, event, helper) {
        window.location.reload();
    },*/
    
    handleCancel : function(component, event, helper){
        component.set("v.showInputFields", false);
        event.preventDefault();
    },
    
    handleEdit : function(component, event, helper){
        
        component.set("v.showInputFields", true);
        
        event.preventDefault();
    }
    
})
Ext.define('Wsitms.view.base.IpController',{
	extend:'Ext.app.ViewController',
	alias:'controller.ip-patrol',
	requires:['Wsitms.model.EntityProp','Wsitms.model.EnPrStatus'],
		onAfterLayout:function(){
			//this.getViewModel().getStore('aseetStore').load();   
	   	    var store = Ext.create('Ext.data.Store', {
	    	     autoLoad: false,
	    	     model: 'EntityProp',
	    	     proxy: {
	    	         type: 'ajax',
	    	         api:{
	    	         read: '/Wsitms/state/ipPatorl'
	    	         }
	    	     }
	    	 });    	 
	    	 this.getView().setStore(store);
	    	 this.getView().getStore().load();
	    },
	    
	    ipPatrol:function(){
	    	
/*	    	var role=this.lookup('roleList').getSelectionModel().getSelection();
	    	var dataArr = [];
         	authStore.each(function (record) {
         		dataArr.push(record.data);
            });
         	var jsonData = JSON.stringify(dataArr) 
         	Ext.Ajax.request({
    			url : '/Wsitms/menu/setRoleAuth',
    			params :{'jsonData':jsonData,'ROLE_NAME':ROLE_NAME},
    			method:'POST',
    			success : function(response, opts) {
    				var respText = Ext.util.JSON.decode(response.responseText);                       
    				if(respText.success){
    					Ext.Msg.alert('提示','权限设置成功');
    					//me.getViewModel().getStore('questStore').load();
    				}else{
    					Ext.Msg.alert('提示','权限设置失败');
    				}
    			},
    			failure : function(response, opts) {
    				Ext.Msg.alert('提示','权限设置失败');
    			}
         	})*/
	    	 var store = Ext.create('Ext.data.Store', {
	    	     autoLoad: false,
	    	     model: 'EnPrStatus',
	    	 	 proxy:{
	    		 	type:'ajax',
	    			api:{
	    				read:'/Wsitms/state/ipStatus?PROPERTYNO=IP'
	    			}
	    		}
	    	 });   
	    	 
	    	 this.getView().setStore(store);
	    	 this.getView().getStore().load();
	    }
	    
})
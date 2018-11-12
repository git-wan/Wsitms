Ext.define('Wsitms.view.base.TaSpController',{
	extend:'Ext.app.ViewController',
	alias:'controller.table-space',
	requires:['Wsitms.model.EntityProp','Wsitms.model.TableSpace'],


		onAfterLayout:function(){
			//this.getViewModel().getStore('aseetStore').load(); 
	   	    var store = Ext.create('Ext.data.Store', {
	    	     autoLoad: false,
	    	     model: 'EntityProp',
	    	     proxy: {
	    	         type: 'ajax',
	    	         api:{
	    	         read: '/Wsitms/state/tableSpace'
	    	         }
	    	     }
	    	 });    	 
	    	 this.lookup('tableSpace').setStore(store);
	    	 this.lookup('tableSpace').getStore().load();
	    },
	    
	    tableSpace:function(){	
	    	var data= this.lookup('tableSpace').getSelectionModel().getSelection();
	    	var ENTITYNO= data[0].get('ENTITYNO');
	   	    var store = Ext.create('Ext.data.Store', {
	    	     autoLoad: false,
	    	     model: 'TableSpace',
	    	 	proxy:{
	    			type:'ajax',
	    			api:{
	    				read:'/Wsitms/state/queryTable?ENTITYNO='+ENTITYNO
	    			}
	    		}
	    	 });    	 
	    	 this.lookup('querySpace').setStore(store);
	    	 this.lookup('querySpace').getStore().load();
	    }
	    
})
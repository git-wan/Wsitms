Ext.define('Wsitms.view.base.DbController',{
	extend:'Ext.app.ViewController',
	alias:'controller.db-patrol',
		requires:['Wsitms.model.EntityProp'],
		onAfterLayout:function(){
			//this.getViewModel().getStore('aseetStore').load();  
	   	    var store = Ext.create('Ext.data.Store', {
	    	     autoLoad: false,
	    	     model: 'EntityProp',
	    	     proxy: {
	    	         type: 'ajax',
	    	         api:{
	    	         read: '/Wsitms/state/dbPatorl'
	    	         }
	    	     }
	    	 });    	 
	   	     this.getView().setStore(store);
	   	     this.getView().getStore().load();
	    },
	    
	    dbPatrol:function(){
	    	 var store = Ext.create('Ext.data.Store', {
	    	     autoLoad: false,
	    	     model: 'EnPrStatus',
	    	 	 proxy:{
	    		 	type:'ajax',
	    			api:{
	    				read:'/Wsitms/state/dbStatus'
	    			}
	    		}
	    	 });   
	    	 
	    	 this.getView().setStore(store);
	    	 this.getView().getStore().load();
	    
	    }
	    
})
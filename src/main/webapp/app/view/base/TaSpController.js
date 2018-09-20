Ext.define('Wsitms.view.base.TaSpController',{
	extend:'Ext.app.ViewController',
	alias:'controller.table-space',
	requires:['Wsitms.model.EntityProp'],


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
	    
})
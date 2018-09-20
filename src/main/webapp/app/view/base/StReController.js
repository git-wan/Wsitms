Ext.define('Wsitms.view.base.StReController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.state-record',
    
    onAfterLayout:function(){
    	
   /* 	var model = Ext.create("Ext.data.TreeModel", { // 定义树节点数据模型
           // extend : "Ext.data.Model",
            fields : [
            	{name : "text",type : "string",mapping:'ENTITYNAME'},
            	{name : "leaf",type : "boolean",defaultValue: true},
            	//{name : "expanded",type : "boolean",defaultValue: false},
            	
            	],
            
            	childType : 'text' 
        });*/
    	
    	
        var store = Ext.create('Ext.data.TreeStore', {
            fields : [
            	{name : "ENTITYNO",type : "string"},
            	{name : "text",type : "string",mapping:'ENTITYNAME'},
            	{name : "leaf",type : "boolean",defaultValue: true},
            	//{name : "expanded",type : "boolean",defaultValue: false},
            	
            	],
            autoLoad : false,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/init/entityList'
				}
		        },
	            root : {
	            	expanded: true,
	            }

        });
      
        
    	this.lookup('staterecord').setStore(store);
    	this.lookup('staterecord').getStore().load();
    },
    
    stateRecordClick:function(grid,record, element, rowIndex, e, eOpts){
    	var ENTITYNO=record.get('ENTITYNO');
   	    var store = Ext.create('Ext.data.Store', {
    	     autoLoad: false,
    	     model: 'EntityProp',
    	     proxy: {
    	         type: 'ajax',
    	         api:{
    	         read: '/Wsitms/init/entPropEntry?ENTITYNO='+ENTITYNO
    	         }
    	     }
    	 });    	 
    	 this.lookup('entProp').setStore(store);
    	 this.lookup('entProp').getStore().load();
    }
})
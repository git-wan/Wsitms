Ext.define('Wsitms.view.base.StLoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.state-look',
    requires:['Wsitms.model.EnPrStatus'],
    

	onAfterLayout:function(){
	    var genderStore = Ext.create("Ext.data.Store", {
	        fields: ["name", "abbr"],
	        autoLoad: true,
	        proxy: {
	            type: "ajax",
	            //actionMethods: { read: "POST" },
	            api:{
	    	         read:'/Wsitms/state/queryEntity'
	    	         }
	        }
	    });	
	    this.lookup('allEntity').setStore(genderStore);
	},
   
    queryStatus : function(){
    	var stateParams =this.lookup('stateParams');    	
    	var params = stateParams.getValues(true);//参数加连接符构成的字符串
   	    var store = Ext.create('Ext.data.Store', {
 	     autoLoad: false,
 	     model: 'EnPrStatus',
 	     proxy: {
 	         type: 'ajax',
 	         api:{
 	         read:'/Wsitms/state/queryStatus?'+params
 	         }
 	     }
 	 });    	 
 	 this.lookup('entityStatus').setStore(store);
 	 this.lookup('entityStatus').getStore().load();
    },
    
    

})
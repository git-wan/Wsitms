Ext.define('Wsitms.view.base.EntityPropController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entity-property',
    requires:[
    	'Wsitms.view.base.EntPropForm',
    ],

	onAfterLayout:function(){
    	this.getViewModel().getStore('entPropStore').load();
    	this.getViewModel().getStore('propStore').load();  	
    },

    
    addEntProp:function(){
    	var entity=this.lookup('entity').getSelectionModel().getSelection();
    	var property=this.lookup('property').getSelectionModel().getSelection();
    	if(entity.length<1){
    		Ext.Msg.alert('提示','请选择一条实体信息')
    		return false;
    	}
    	if(property.length<1){
    		Ext.Msg.alert('提示','请选择一条属性信息')
    		return false;
    	}
    	this.dialog = this.getView().add({
    		xtype : 'entprop-form',
    		viewModel : {
    			data :{
    				title:'添加实物属性'
    			},
    			
    		}    	
    	});
    	 var record = Ext.create('Wsitms.model.EntityProp', {
    		 id: 'EntityProp-1',
    		 ENTITYNO: entity[0].get('ENTITYNO'),
    		 ENTITYNAME:entity[0].get('ENTITYNAME'),
    		 PROPERTYNO:property[0].get('PROPERTYNO'),
    		 PROPERTYNAME:property[0].get('PROPERTYNAME'),
    		 PROPERTYVALUE:'',
    		 SHOWMARK:''		 
         });
    	this.lookup('entPropForm').loadRecord(record);   	
    	this.dialog.show();   
    },
    
    
    editEntProp:function(){   	
    	var entity=this.lookup('entProp').getSelectionModel().getSelection();
    	if(entity.length<1){
    		Ext.Msg.alert('提示','请选择一条实体属性信息')
    		return false;
    	}
    	this.dialog = this.getView().add({
    		xtype : 'entprop-form',
    		viewModel : {
    			data :{
    				title:'修改实物属性'
    			}
    		}    	
    	});
    	this.lookup('entPropForm').loadRecord(entity[0]);
    	this.dialog.show();   
    	this.lookup('entPropFormReset').hide();
    },
  
    resetForm:function(){
    	this.lookupReference('entPropForm').reset();    	
    },
    
    saveForm : function(){
        var me = this;
    	var userForm =this.lookup('entPropForm');
    	var id =this.lookup('primary_id').getValue();
    	var addUrl ='/Wsitms/init/addEntityProp';
    	var modUrl ='/Wsitms/init/modEntityProp';
    	var url =modUrl;
    	if(id=='EntityProp-1'){
    		url=addUrl;
    	}
    	if(userForm.isValid()){
    		userForm.submit({
    			url:url,
    			waitMsg:'正在提交数据',
    			waitTitle:'提示',
    			method:'POST',
    			success:function(form,action){
    				Ext.Msg.alert('提交成功', action.result.msg);
    				var entity=me.lookup('entity').getSelectionModel().getSelection();
    				me.entPropClick(null,entity[0], null, null, null, null);
    				me.dialog = Ext.destroy(me.dialog);
    			},
    			failure:function(form,action){
    				switch (action.failureType) {
    	            case Ext.form.action.Action.CLIENT_INVALID:
    	                Ext.Msg.alert('提交失败', '不能使用无效值提交表单字段');
    	                break;
    	            case Ext.form.action.Action.CONNECT_FAILURE:
    	                Ext.Msg.alert('提交失败', 'Ajax通信失败');
    	                break;
    	            case Ext.form.action.Action.SERVER_INVALID:
    	               Ext.Msg.alert('提交失败', action.result.msg);
    	       }
    		}
    		})
    	}  	
     },   

     closeForm : function(){
    	 this.dialog = Ext.destroy(this.dialog);
     },
  
     entPropClick:function( grid,record, element, rowIndex, e, eOpts){
    	 //var addModel =grid.getSelectionModel().getSelection()
    	var ENTITYNO=record.get('ENTITYNO');
    	 var store = Ext.create('Ext.data.Store', {
     	     autoLoad: false,
     	     model: 'EntityProp',
     	     proxy: {
     	         type: 'ajax',
     	         api:{
     	         read: '/Wsitms/init/entityPropList?ENTITYNO='+ENTITYNO
     	         }
     	     }
     	 });    	 
     	 this.lookup('entProp').setStore(store);
     	 this.lookup('entProp').getStore().load();
     }, 
     
     changeEntType:function(field, newValue, oldValue, eOpts){
    	
    	var url ='/Wsitms/init/queryEnt?'+field.name+'='+newValue;
    	if(newValue==''){
    		url='/Wsitms/init/entityList';
    	}
   	    var store = Ext.create('Ext.data.Store', {
    	     autoLoad: false,
    	     model: 'Entity',
    	     proxy: {
    	         type: 'ajax',
    	         api:{
    	         read: url
    	         }
    	     }
    	 }); 
   	 this.lookup('entity').setStore(store);
   	 this.lookup('entity').getStore().load();
     }
});

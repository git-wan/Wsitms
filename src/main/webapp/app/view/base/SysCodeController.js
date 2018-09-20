Ext.define('Wsitms.view.base.SysCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code',
    requires:[
    	//'Wsitms.view.base.PropForm',
    ],

    onAfterLayout:function(){
    	this.getViewModel().getStore('sysCodeStore').load();
    },
    
    rowclick:function( grid,record, element, rowIndex, e, eOpts){
   	 var addModel =grid.getSelectionModel().getSelection()
   	 var SYSTEMCODENAME=record.get('SYSTEMCODENAME');
/* 	 Ext.Ajax.request({
			url : '/Wsitms/init/sysCodeInfoList',
			params : {
				SYSTEMCODENAME : SYSTEMCODENAME
			},
			success : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText);                       
				Ext.Msg.alert("信息提示", respText.msg);
				me.getViewModel().getStore('departStore').load();   										
			},
			failure : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText); 
				alert(respText)
				Ext.Msg.alert("信息提示", respText.msg);
			}
		});*/
 	 

 	 var store = Ext.create('Ext.data.Store', {
 	     autoLoad: false,
 	     model: 'Wsitms.model.Syscodeinfo',
 	     proxy: {
 	         type: 'ajax',
 	         api:{
 	         read: '/Wsitms/init/sysCodeInfoList?SYSTEMCODENAME='+SYSTEMCODENAME
 	         }
 	     }
 	 });
 	 
 	  this.lookup('syscodeinfo').setStore(store);
 	 this.lookup('syscodeinfo').getStore().load();
    },
    
    onAdd:function(){
    	
    	this.displayForm(null);
    },
    
    displayForm : function(record){
    	var view = this.getView(); //得到列表页
    	this.isEdit = !!record;
    	this.dialog = view.add({
    		xtype : 'prop-form',
    		session : true,
    		viewModel : {
    			data :{
    				title: record ? '修改数据':'添加数据'
    			},
    		}    	
    	});
    	this.dialog.show();   
    
    },
    
    onEdit:function(button){
    	this.displayForm(button.getWidgetRecord());
    },
    
    onSaveClick : function(){
        
        var me = this;
        var dialog = me.dialog,
        	   form = this.lookupReference('form');
        	   isEdit = this.isEdit,
        	   id;
        
        dialog.getSession().save(); //传输修改到父会话
        if (!isEdit){
            id = dialog.getViewModel().get('theDepart').id;
            //幻影记录
            var recNew = this.getSession().getRecord('Question',id);
            me.getViewModel().getStore('departStore').add(recNew);
        
        }
        //销毁对话框
        me.dialog = Ext.destroy(me.dialog)
     	
     },

     onCloseForm : function(){
    	 this.dialog = Ext.destroy(this.dialog);
     },
     
   
});

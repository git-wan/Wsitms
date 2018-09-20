Ext.define('Wsitms.view.base.PropController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.define-property',
    requires:[
    	'Wsitms.view.base.PropForm',
    ],

    onAfterLayout:function(){
    	this.getViewModel().getStore('propStore').load();
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
    				title: record ? '修改属性':'添加属性'
    			},
    		}    	
    	});
    	this.dialog.show();   
    
    },
    
    resetForm:function(){
    	this.lookupReference('propForm').reset();    	
    },
    
    saveForm : function(){
        var me = this;
        var id =this.lookup('primary_id').getValue();
    	var userForm =this.lookup('propForm');
    	var addUrl ='/Wsitms/init/addProp';
    	var Url ='/Wsitms/init/modProp';
    	if(id==''){
    		Url=addUrl
    	}
    	if(userForm.isValid()){
    		userForm.submit({
    			url:Url,
    			waitMsg:'正在提交数据',
    			waitTitle:'提示',
    			method:'POST',
    			success:function(form,action){
    				Ext.Msg.alert('提交成功', action.result.msg);
    				me.getViewModel().getStore('propStore').load(); 
    				me.dialog = Ext.destroy(me.dialog);//执行顺序并不是并不是由上而下
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
    
     onEdit:function(){
	    	var me =this;
	    	var data= me.getView().getSelectionModel().getSelection();
	    	var number =data.length;
	    	if(number<1){
	    		Ext.Msg.alert('提示','请选择一条数据')
	    		return false;
	    	}else if(number==1){  
	    		this.displayForm(data[0]);
	    		this.lookup('propForm').loadRecord(data[0]);
	    		this.lookupReference('propFormReset').hide();
	    	}else{
	    		Ext.Msg.alert('提示','只能选择一条记录')
	    		return false;
	    	}
}
   
     
   
});

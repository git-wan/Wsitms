Ext.define('Wsitms.view.base.EntityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entity-define',
    requires:[
    	'Wsitms.view.base.EntityForm',
    ],

    onAfterLayout:function(){
    	this.getViewModel().getStore('entityStore').load();
    },
    

    
    onAdd:function(){    	
    	this.displayForm(null);
    },
    
    displayForm : function(record){
    	var view = this.getView(); //得到列表页
    	this.isEdit = !!record;
    	this.dialog = view.add({
    		xtype : 'entity-form',
    		session : true,
    		viewModel : {
    			data :{
    				title: record ? '修改实物':'添加实物'
    			},
    		}    	
    	});
    	this.dialog.show();   
    },
    
    
    
    resetForm:function(){
    	this.lookupReference('entityForm').reset();    	
    },
    
    saveForm : function(){
        var me = this;
        var id =this.lookup('primary_id').getValue();
    	var userForm =this.lookup('entityForm');
    	var addUrl ='/Wsitms/init/addEntity';
    	var Url ='/Wsitms/init/modEntity';
    	if(id==''){
    		Url=addUrl;
    	}
    	if(userForm.isValid()){
    		userForm.submit({
    			url:Url,
    			waitMsg:'正在提交数据',
    			waitTitle:'提示',
    			method:'POST',
    			success:function(form,action){
    				Ext.Msg.alert('提交成功', action.result.msg);
    				me.getViewModel().getStore('entityStore').load(); 
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
    
     onEdit:function(){
    	    	var me =this;
    	    	var data= me.getView().getSelectionModel().getSelection();
    	    	var number =data.length;
    	    	if(number<1){
    	    		Ext.Msg.alert('提示','请选择一条数据')
    	    		return false;
    	    	}else if(number==1){  
    	    		this.displayForm(data[0]);
    	    		this.lookup('entityForm').loadRecord(data[0]);
    	    		this.lookupReference('entFormReset').hide();
    	    	}else{
    	    		Ext.Msg.alert('提示','只能选择一条记录')
    	    		return false;
    	    	}
     }
     
   
});

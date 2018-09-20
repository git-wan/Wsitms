Ext.define('Wsitms.view.base.ModuleController',{
	extend:'Ext.app.ViewController',
	alias:'controller.module-manage',
	requires:['Wsitms.view.base.ModuleForm'],
	onAfterLayout:function(){
	    	this.getViewModel().getStore('moduleStore').load();
	    },
	    
	    onAdd:function(){
	    	
	    	this.displayForm(null);
	    },
	    
	    displayForm : function(record){
	    	
	    	var view = this.getView(); //得到列表页
	    	this.isEdit = !!record;
	    	this.dialog = view.add({
	    		xtype : 'module-form',
	    		session : true,
	    		viewModel : {
	    			data :{
	    				title: record ? '修改数据':'添加数据',
	    			},
	    	    	links:{
	    				theModule : record || {
	    					create : true,
	    					//id : 'add',
	    					type : 'Module'    				
	    				}     			
	    			}
	    		}    	
	    	});
	    	this.dialog.show();   
	    
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
	    		this.lookupReference('resetForm').hide()
	    	}else{
	    		Ext.Msg.alert('提示','只能选择一条记录')
	    		return false;
	    	}
	    	
	    },
	    
	    resetForm:function(){
	    	this.lookupReference('moduleForm').reset();
	    	
	    },
	    
	    saveForm:function(){
	    	var moduleForm =this.lookup('moduleForm');
	    	var id =this.lookup('primary_id').getValue();
	    	var addUrl ='/Wsitms/module/addModule';
	    	var modUrl ='/Wsitms/module/modModule';
	    	var url =modUrl;
	    	if(id=='Module-1'){
	    		url=addUrl;
	    	}
	    	if(moduleForm.isValid()){
	    		moduleForm.submit({
	    			url:url,
	    			waitMsg:'正在提交数据',
	    			waitTitle:'提示',
	    			method:'POST',
	    			success:function(form,action){
	    				Ext.Msg.alert('提交成功', action.result.msg);
	    				window.location.reload()
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
	    	//Ext.Ajax.request()
	    },
	    
	    closeForm:function(){
	    	this.dialog.getSession().destroy();
	    	this.dialog = Ext.destroy(this.dialog);
	    	
	    }
})
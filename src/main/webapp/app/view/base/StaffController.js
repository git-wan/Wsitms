Ext.define('Wsitms.view.base.StaffController',{
	extend:'Ext.app.ViewController',
	alias:'controller.staff-register',
	
	
	 requires:[
	    	'Wsitms.view.base.StaffForm',
	    ],

		onAfterLayout:function(){
	    	this.getViewModel().getStore('departStore').load();
			this.getViewModel().getStore('companyStore').load();
			this.getViewModel().getStore('staffStore').load();
	    },
	    
	    onAdd:function(){
	    	
	    	this.displayForm(null);
	    },
	    
	    displayForm : function(record){
	    	var view = this.getView(); //得到列表页
	    	this.isEdit = !!record;
	    	this.dialog = view.add({
	    		xtype : 'staff-form',
	    		viewModel : {
	    			data :{
	    				title: record ? '修改数据':'添加数据'
	    			},
	    			links:{
	    				theDepart : record || {
	    					//id : 'add',//会像后台发送数据
	    					create:true,//幻影记录，不会像后台发送数据
	    					type : 'Staff'    				
	    				}     			
	    			}
	    		}    	
	    	});
	    	if(record){
	    	var COMPANY_CODE=record.get('COMPANY_CODE');
	    	var DEPART_CODE=record.get('DEPART_CODE');
	    	this.lookup('combo-company').setValue(COMPANY_CODE);
	    	this.lookup('combo-depart').setValue(DEPART_CODE);
	    	}
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
	    		this.lookupReference('staffFormReset').hide()
	    	}else{
	    		Ext.Msg.alert('提示','只能选择一条记录')
	    		return false;
	    	}
	    },
	    
	    
	    resetForm:function(){
	    	this.lookupReference('staffForm').reset();    	
	    },
	    
	    saveForm : function(){
	        var me = this;
	    	var userForm =this.lookup('staffForm');
	    	var id =this.lookup('primary_id').getValue();
	    	var addUrl ='/Wsitms/staff/addStaff';
	    	var modUrl ='/Wsitms/staff/modStaff';
	    	var url =modUrl;
	    	if(id=='Staff-1'){
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
	    				me.getViewModel().getStore('stafftStore').load(); 
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
	     
	     batchDel:function(){
				var ids = '';
				var me=this;
	   			var selection = me.getView().getSelectionModel().getSelection();
	   			if (selection.length == 0) {
	   				Ext.Msg.alert("提示", "请选择要删除的记录!");
	   				return false;
	   			} else {
	   				Ext.Msg.confirm("提示", "确定删除?", function(button, text) {
	   					if (button == "yes") {
	   						for (var i = 0; i < selection.length; i++) {
								if (i == 0) {
									ids = selection[i].get('id');
								} else {
									ids += "," + selection[i].get('id');
								}
							};
	   					
	   						Ext.Ajax.request({
	   									url : '/Wsitms/staff/batchDelStaff',
	   									params : {
	   										idList : ids
	   									},
	   									success : function(response, opts) {
	   										var respText = Ext.util.JSON.decode(response.responseText);                       
	   										Ext.Msg.alert("信息提示", respText.msg);
	   										me.getViewModel().getStore('staffStore').load();   										
	   									},
	   									failure : function(response, opts) {
	   										var respText = Ext.util.JSON.decode(response.responseText); 
	   										alert(respText)
	   										Ext.Msg.alert("信息提示", respText.msg);
	   									}
	   								});
	   					}
	   				});
	   			}
	     }
	     
})
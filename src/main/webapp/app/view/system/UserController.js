Ext.define('Wsitms.view.system.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-manage',   
    requires:['Wsitms.view.system.UserForm','Wsitms.view.system.Authority'],
    
    onAfterLayout:function(){
    	this.getViewModel().getStore('userStore').load();
    },
    
    onAdd:function(){    	
    	this.displayForm(null);
    },
    
    displayForm : function(record){    	
    	var view = this.getView(); //得到列表页
    	this.isEdit = !!record;
    	this.dialog = view.add({
    		xtype : 'user-form',
    		session : true,
    		viewModel : {
    			data :{
    				title: record ? '修改数据':'添加数据',
    				//theUser:record
    			},
    		/*	   stores: {
    				   theUser:record || {model:'User'}
    			        }*/
    			links:{
    				theUser : record || {
    					//id : 'add',//会像后台发送数据
    					create:true,//幻影记录，不会像后台发送数据
    					type : 'User'    				
    				}     			
    			}
    			//data:{theUser:record}data数据共享
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
    		this.lookupReference('userFormReset').hide()
    	}else{
    		Ext.Msg.alert('提示','只能选择一条记录')
    		return false;
    	}   	
    },
    
    resetForm:function(){
    	this.lookupReference('userForm').reset();    	
    },
    
    saveForm:function(){
    	var me =this;
    	var userForm =this.lookup('userForm');
    	var id =this.lookup('primary_id').getValue();
    	var addUrl ='/Wsitms/user/addUser';
    	var modUrl ='/Wsitms/user/modUser';
    	var url =modUrl;
    	if(id=='User-1'){
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
					me.dialog.destroy();
    				me.getViewModel().getStore('userStore').load();
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
    
    closeForm:function(){
    	this.dialog = Ext.destroy(this.dialog); 	
    },
    
    setAuthClick:function(){
     	var user=this.getView().getSelectionModel().getSelection();
     	if(user.length<1){
     		Ext.Msg.alert('提示','请选择一条用户信息')
     		return false;
     	}
     	this.dialog = this.getView().add({
    		xtype : 'authority'   	
    	});
    	 var USER_ID =user[0].get('USER_ID');
    	 var USER_ROLE=user[0].get('USER_ROLE');
    	 var store = Ext.create('Ext.data.Store',{
                    fields:[ 'MODULE_ID','DESCRIBE','GROUPNAME','MENU_ID'],
    				autoLoad:false,
    				pageSize:0,
    				groupField:'GROUPNAME',
    				proxy:{
    					type:'ajax',
    					api:{
    						 read: '/Wsitms/menu/userMenu?USER_ID='+USER_ID
    					}
    			}});    	 
     	 this.lookup('selectAuth').setStore(store);
     	 this.lookup('selectAuth').getStore().load();
       	 var store1 = Ext.create('Ext.data.Store',{
             fields:[ 'MODULE_ID','DESCRIBE','GROUPNAME','MENU_ID'],
				autoLoad:false,
				pageSize:0,
				groupField:'GROUPNAME',
				proxy:{
					type:'ajax',
					api:{
						 read: '/Wsitms/menu/userNoMenu?USER_ID='+USER_ID+'&USER_ROLE='+encodeURI(USER_ROLE)
					}
			}}); 
       	 this.lookup('waitAuth').setStore(store1);
     	 this.lookup('waitAuth').getStore().load();  	 
     	 this.dialog.show()
     }, 
     
     
     waitauthdblclick :function( grid,record, element, rowIndex, e, eOpts){
    	 var addModel =grid.getSelectionModel().getSelection()
    	 this.lookup('selectAuth').getStore().insert(0,addModel);
    	 this.lookup('waitAuth').getStore().remove(addModel);
     },
     selectauthdblclick :function( grid,record, element, rowIndex, e, eOpts){
    	 var addModel =grid.getSelectionModel().getSelection()
    	 this.lookup('waitAuth').getStore().insert(0,addModel);
    	 this.lookup('selectAuth').getStore().remove(addModel);
     },
     
     
     confirmAuth:function(){
    	var role=this.getView().getSelectionModel().getSelection();
    	var USER_ID =role[0].get('id');
    	var authStore=this.lookup('selectAuth').getStore();
     	var dataArr = [];
     	//var flag =true;
        authStore.each(function (record) {
         		dataArr.push(record.data);
            });
     	var jsonData = JSON.stringify(dataArr) 
     	Ext.Ajax.request({
			url : '/Wsitms/menu/setUserAuth',
			params :{'jsonData':jsonData,'USER_ID':USER_ID},
			method:'POST',
			success : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText);                       
				if(respText.success){
					Ext.Msg.alert('提示','权限设置成功');
					//me.getViewModel().getStore('questStore').load();
				}else{
					Ext.Msg.alert('提示','权限设置失败');
				}
			},
			failure : function(response, opts) {
				Ext.Msg.alert('提示','权限设置失败');
			}
		});
     	 this.dialog = Ext.destroy(this.dialog);
     }, 
});


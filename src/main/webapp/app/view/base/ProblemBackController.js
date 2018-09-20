Ext.define('Wsitms.view.base.ProblemBackController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.questback',
    requires:[
    	'Wsitms.view.base.OpTempForm',
    ],
    

    

    onAfterLayout:function(){
    	this.getViewModel().getStore('questStore').load();
    	this.getViewModel().getStore('opTemplateStore').load();
    },
    

    
    editSave:function(){
    	var me =this;
    	var modQuestStore= this.getViewModel().getStore('questStore').getModifiedRecords();
    	var recordsLength = modQuestStore.length;
    	var dataArr = [];
    	for(var i = 0; i < recordsLength ; i++){
    	dataArr[i] = modQuestStore[i].data;
    	}
    	//var jsonData = Ext.JSON.encode(dataArr);
    	var jsonData = JSON.stringify(dataArr) 
		Ext.Ajax.request({
				url : '/Wsitms/question/batchEdit',
				params :jsonData,
				method:'POST',
				success : function(response, opts) {
				
					Ext.Msg.alert('提示','修改成功');
					me.getViewModel().getStore('questStore').load();
				},
				failure : function(response, opts) {
		
				}
			});
    	
    },
    
    onAdd:function(){
    	
    	this.displayForm(null);
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
     
     onDel :function(button){
     	var selection = button.getWidgetRecord();
     	selection.drop();//删除数据（标记数据为删除）   	
     	
     },
     
     addCol:function(){
    	 var r = Ext.create('Wsitms.model.OpTemplate', {
    		 OPMODELSEQ: '',
    		 OPKEYWORD: '',
    		 OPDESC:'',
    		 OPNOTE:''
         });
    	this.lookup('opGrid').getStore().insert(0, r);
    	//rowEditing.startEdit(0, 0);
    	 //alert(this.lookup('rowEditing'))
     
     },
     
     delCol:function(){
    	var delModel= this.lookup('opGrid').getSelectionModel().getSelection();
    	if(delModel==''||delModel==null){
    		Ext.Msg.alert('提示','请全选择要删除的记录')
    		return false
    	}
    	this.lookup('opGrid').getStore().remove(delModel);
     },
     
     
     rowdblclick:function( grid,record, element, rowIndex, e, eOpts){
    	 var addModel =grid.getSelectionModel().getSelection()
    	// alert(record.get('OPKEYWORD'))
    	 this.lookup('opGrid').getStore().insert(0,addModel);
     },
     
     
     addOpTemp:function(){
     	var addModel= this.lookup('opGrid').getSelectionModel().getSelection();
     	alert(addModel)
     	if(addModel==''||addModel==null){
     		Ext.Msg.alert('提示','请选择要添加的模板记录')
    		return false
     	}
     	if(addModel.length>1){
     	Ext.Msg.alert('提示','请选择一条记录')
		return false
     	}
     	var view = this.getView(); //得到列表页
    	this.dialog = view.add({
    		xtype : 'optemp-form',
    		viewModel : {
    			data :{
    				title: addModel ? '修改数据':'添加数据',   					
    			},
    		}    	
    	});   	
    	this.lookup('optempForm').loadRecord(addModel[0]);
    	this.dialog.show();   
    
     },
     
     closeForm : function(){
    	 this.dialog = Ext.destroy(this.dialog);
     },
     
     resetForm:function(){
     	this.lookupReference('backForm').reset();    	
     },
 
     refreshPage:function(){
    	window.location.reload(); 
     },
     saveForm:function(){
    	var optempForm =this.lookup('optempForm');
     	if(optempForm.isValid()){	
     		optempForm.submit({
    			url:'Wsitms/question/addOpTemp',
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
     },
     
     
     saveBack:function(){
     	var backForm =this.lookupReference('backForm');
     	var opModel= this.lookup('opGrid').getSelectionModel().getSelection();
      	if(backForm.isValid()&&opModel<1){	
    		Ext.Ajax.request({
					url : '/WsCarPark/question/addOp',
					params : {
						idList : ids
					},
					success : function(response, opts) {
						var respText = Ext.util.JSON.decode(response.responseText);                       
						Ext.Msg.alert("信息提示", respText.message);
						me.getViewModel().getStore('departStore').load();
						Ext.getCmp('question-point').getStore().reload();  										
					},
					failure : function(response, opts) {
						var respText = Ext.util.JSON.decode(response.responseText); 
						alert(respText)
						Ext.Msg.alert("信息提示", respText.message);
					}
				});
      		
      		backForm.submit({
    			url:'Wsitms/question/addOpTemp',
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
     },
     
     
     
     
     
     
     
     //删除信息
     onBatchDel:function () {
   			var ids = '';
   			var selectionModel = Ext.getCmp('question-point').getSelectionModel();
   			var selection = selectionModel.getSelection();
   			var me=this;
   			if (selection.length == 0) {
   				Ext.Msg.alert("提示", "请选择要删除的记录!");
   				return;
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
   									url : '/WsCarPark/depart/destroy',
   									params : {
   										idList : ids
   									},
   									success : function(response, opts) {
   										var respText = Ext.util.JSON.decode(response.responseText);                       
   										Ext.Msg.alert("信息提示", respText.message);
   										me.getViewModel().getStore('departStore').load();
   										Ext.getCmp('question-point').getStore().reload();  										
   									},
   									failure : function(response, opts) {
   										var respText = Ext.util.JSON.decode(response.responseText); 
   										alert(respText)
   										Ext.Msg.alert("信息提示", respText.message);
   									}
   								});
   					}
   				});
   			}
   		}
    
});

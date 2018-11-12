Ext.define('Wsitms.view.base.QuestionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.questionPoint',

    resetForm:function(){
    	this.getView().reset();    	
    },
    
    saveForm : function(){
        var me = this;
    	var questForm =this.getView();
    	var url ='/Wsitms/question/addQuest';
    	if(questForm.isValid()){
    		questForm.submit({
    			url:url,
    			waitMsg:'正在提交数据',
    			waitTitle:'提示',
    			method:'POST',
    			success:function(form,action){
    				Ext.Msg.alert('提交成功', action.result.msg);    				
    				me.getView().reset();
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
     //同步是一个批量操作
     onSync : function(){
     	var me = this,
     		//得到批量操作对象
     		batch = me.getView().getSession().getSaveBatch();
     	//判断有没有需要执行的批量操作	
     	if (batch && batch.getTotal()>0){
     		alert(batch.getOperations()[0])     		
     		batch.on({
     			//在批量操作完成的时候执行
     			complete : function(_batch,operation,eOpts){
     				if (_batch.getExceptions().length == 0){
     					Ext.toast({
     						title:'数据保存',
     						html:'数据已经同步到系统的资料库',
     						align:'t',
     						bodyPadding : 10
     					});     				
     				}
     				Ext.Msg.hide(); //隐藏等待对话框     			
     			},
     			//在批量操作发生异常的时候执行
     			exception: function(_batch,operation,eOpts){
     				alert('操作异常!部分操作遇到错误未能完成：\n\t'+operation.error);     			
     			},
     			operationcomplete : function(_batch,operation,eOpts){    			
     			}    		    		
     		});
     		//显示等待对话框
     		Ext.Msg.wait('同步中','正在同步数据，请等待...');
     		//开始同步
     		batch.start();  	
     	}else{
     		Ext.Msg.alert('','没有需要同步的数据');    	
     	}
     },
     
     onCancelClick : function(){
     	this.dialog = Ext.destroy(this.dialog);
     },
     
     onCloseForm : function(){
     	this.onCancelClick();
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
   						
   						
   			/*		for (var i = 0; i < selection.length; i++) {
   							
   						selection[i].drop();
   						
   						}*/
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

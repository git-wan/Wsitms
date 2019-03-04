Ext.define('Wsitms.view.problem.ProblemBackController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.probback',
    requires:[
    	'Wsitms.view.problem.OpTempForm',
    	'Wsitms.view.problem.BackForm'
    ],
    //加载列表问题
    onAfterLayout:function(){
    	this.getViewModel().getStore('questStore').load();   	
    },
    //编辑保存  
    editSave:function(){
    	var me =this;
    	var modQuestStore= this.getViewModel().getStore('questStore').getModifiedRecords();
    	var recordsLength = modQuestStore.length;
    	if(recordsLength<1){
    		Ext.Msg.alert('提示','无数据修改');
    		return false
    	}
    	var dataArr = [];
    	for(var i = 0; i < recordsLength ; i++){
    	dataArr[i] = modQuestStore[i].data;
    	}
    	var jsonData = JSON.stringify(dataArr) 
		Ext.Ajax.request({
				url : '/Wsitms/question/batchEdit',
				params :jsonData,
				method:'POST',
				success : function(response, opts) {				
					Ext.Msg.alert('提示','修改成功');
					me.getViewModel().getStore('questStore').load();
				},
				failure : function(response, opts){		
				}
			});   	
    },
    //回复
    addBack:function(){
    	var addModel= this.lookup('waitSolve').getSelectionModel().getSelection();
     	if(addModel==''||addModel==null){
     		Ext.Msg.alert('提示','请选择一条问题记录')
    		return false
     	}
     	var PROBLEMBACKSEQ = addModel[0].get('PROBLEMSEQ');
     	var view = this.getView(); //得到列表页
    	this.dialog = view.add({
    		xtype : 'back-form',
    		viewModel : {
    			data :{
    				PROBLEMBACKSEQ: PROBLEMBACKSEQ,   					
    			},
    		}    	
    	});   
    	this.getViewModel().getStore('opTemplateStore').load();
    	this.dialog.show();      
    },
    
    /*backSaveClick : function(){        
    	var me = this;
     	var blackForm =this.lookup('backForm');
     	var url ='/Wsitms/question/problemBack';
     	if(blackForm.isValid()){
     		blackForm.submit({
     			url:url,
     			waitMsg:'正在提交数据',
     			waitTitle:'提示',
     			method:'POST',
     			success:function(form,action){
     				Ext.Msg.alert('提交成功', action.result.msg);
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
     },*/
     
/*     onDel :function(button){
     	var selection = button.getWidgetRecord();
     	selection.drop();//删除数据（标记数据为删除）   	     	
     },*/
    //无问题
     delProb:function(){
    	    var me = this;
    	   	var addModel= this.lookup('waitSolve').getSelectionModel().getSelection();
         	if(addModel==''||addModel==null){
         		Ext.Msg.alert('提示','请选择一条问题记录')
        		return false
         	}
         	var PROBLEMSEQ = addModel[0].get('PROBLEMSEQ');
         	Ext.Ajax.request({
					url : '/Wsitms/question/delPorb',
					params : {
						PROBLEMSEQ : PROBLEMSEQ
					},
					success : function(response, opts) {
						var respText = Ext.util.JSON.decode(response.responseText);                       
						Ext.Msg.alert("信息提示", respText.msg);
						me.getViewModel().getStore('questStore').load();  										
					},
					failure : function(response, opts) {
						var respText = Ext.util.JSON.decode(response.responseText); 
						Ext.Msg.alert("信息提示", respText.msg);
					}
				});
     },
     
     //下一步
     nextStep:function(){
    	 var backWindow = this.lookup('backWindow'),layout = backWindow.getLayout(),itemLength = backWindow.items.length;
         ++backWindow.active;
         layout.setActiveItem(backWindow.active);
         backWindow.active = backWindow.items.indexOf(layout.getActiveItem());
         if(backWindow.active>0&&backWindow.active<=itemLength-1){
        	 this.lookup('lastStep').show();
         };
         if(backWindow.active==itemLength-1){
        	 this.lookup('nextStep').hide();
        	 this.lookup('done').show();
         }                
     },
     //上一步
     lastStep:function(){
    	 var backWindow = this.lookup('backWindow'),layout = backWindow.getLayout(),itemLength = backWindow.items.length;
         --backWindow.active;
         layout.setActiveItem(backWindow.active);
         backWindow.active = backWindow.items.indexOf(layout.getActiveItem());
         if(backWindow.active==0){
        	 this.lookup('lastStep').hide();
         };
         if(backWindow.active!=itemLength-1){
        	 this.lookup('nextStep').show();
        	 this.lookup('done').hide();
         }  	 
     },
     //添加航一行 
     addCol:function(){
    	 
    	 var store = this.getViewModel().getStore('opStore');
    	 var r = Ext.create('Ext.data.Model', {
    		 PROBLEMBACKSEQ:'',
    		 OPMODELSEQ: '',
    		 OPKEYWORD: '',
    		 OPDESC:'',
         });
    	 store.add(r);
    	this.lookup('opGrid').setStore(store);
     },
     //删除一行
     delCol:function(){
    	var delModel= this.lookup('opGrid').getSelectionModel().getSelection();
    	if(delModel==''||delModel==null){
    		Ext.Msg.alert('提示','请全选择要删除的记录')
    		return false
    	}
    	this.lookup('opGrid').getStore().remove(delModel);
     },
     
     //双击行
     rowdblclick:function( grid,record, element, rowIndex, e, eOpts){
    	 var addModel =grid.getSelectionModel().getSelection()
    	 this.lookup('opGrid').getStore().insert(0,addModel);
     },
     
     //添加操作模板
     addOpTemp:function(){
     	var addModel= this.lookup('opGrid').getSelectionModel().getSelection();
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
     //刷新
     refreshPage:function(){
    	 this.getViewModel().getStore('questStore').load();   
     },
     //保存模板记录
     saveForm:function(){
    	var me = this ;
    	var optempForm =this.lookup('optempForm');
     	if(optempForm.isValid()){	
     		optempForm.submit({
    			url:'/Wsitms/question/addOpTemp',
    			waitMsg:'正在提交数据',
    			waitTitle:'提示',
    			method:'POST',
    			success:function(form,action){
    				Ext.Msg.alert('提交成功', action.result.msg);
    				me.lookup('optemp-form').destroy();
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
         
     /*saveBack:function(){
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
     },*/
     //完成         
     done:function(){
    	 var backForm = this.lookup('backForm');
    	 var me = this;
    	 var addModel= this.lookup('waitSolve').getSelectionModel().getSelection();
    	 var PROBLEMBACKSEQ = addModel[0].get('PROBLEMSEQ');
    	 if(backForm.isValid()){    		
    			backForm.submit({
        			url:'/Wsitms/question/problemBack',
        			waitMsg:'正在提交数据',
        			waitTitle:'提示',
        			method:'POST',
        			success:function(form,action){
        				 var opStore= me.lookup('opGrid').getStore();    	 
        		    	 var opModel = opStore.getCount();
        		    	 if(opModel<1){
        		    			Ext.Msg.alert('提示','请添加操作记录');   
        		    		 return false;
        		    	 }    	    	
        		     	var dataArr = [];
        		     	 opStore.each(function(record){
        		     		 if(!record.get('OPSEQ')){
        		     			Ext.Msg.alert('提示','请完整填写操作记录'); 
        		     			return false;
        		     		 }
        		     		 if(!record.get('OPKEYWORD')){
         		     			Ext.Msg.alert('提示','请完整填写操作记录'); 
         		     			return false;
         		     		 }
        		     		 if(!record.get('OPDESC')){
         		     			Ext.Msg.alert('提示','请完整填写操作记录'); 
         		     			return false;
         		     		 }
        		     		dataArr.push(record.data)
        		    	 })
        		     	var jsonData = JSON.stringify(dataArr) 
        		 		Ext.Ajax.request({
        		 				url : '/Wsitms/question/addOp',
        		 				params :{'jsonData':jsonData,'PROBLEMBACKSEQ':PROBLEMBACKSEQ},
        		 				method:'POST',
        		 				success : function(response, opts) {
        		 					var obj = Ext.decode(response.responseText);
        		 					Ext.Msg.alert('提示',obj.msg);
        		 					me.getViewModel().getStore('opStore').removeAll();
        		 					me.lookup('backWindow').destroy();
        		 				},
        		 				failure : function(response, opts){		
        		 				}
        		 			}); 
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
    	 }else{
    		 Ext.Msg.alert("提示","请填写完整的反馈信息")
    	 } 	 
     },
     
       
     //删除信息
    /* onBatchDel:function () {
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
   		}*/
    
});

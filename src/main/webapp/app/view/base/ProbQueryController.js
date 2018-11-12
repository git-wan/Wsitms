Ext.define('Wsitms.view.base.ProbQueryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.probquery',
    requires:[
    	'Wsitms.view.base.OpTempForm',
    	'Wsitms.view.base.BlackDetail',
    	'Wsitms.model.BackDetail',
    	'Wsitms.view.base.OpRecord',
    	'Wsitms.model.Op'
    ],
    
    overProblems : function(){
    	var queryParams =this.lookup('queryParams');    	
    	var params = queryParams.getValues(true);
   	    var store = Ext.create('Ext.data.Store', {
 	     autoLoad: false,
 	     model: 'Question',
 	     proxy: {
 	         type: 'ajax',
 	         api:{
 	         read:'/Wsitms/question/overProblem?'+params
 	         }
 	     }
 	 });    	 
 	 this.lookup('backRecord').setStore(store);
 	 this.lookup('backRecord').getStore().load();
    },
    
    lookDetail:function(){
    	var me =this;
    	var addModel= this.lookup('backRecord').getSelectionModel().getSelection();
     	if(addModel.length<1){
     	Ext.Msg.alert('提示','请选择一条记录')
		return false
     	}
     	var PROBLEMBACKSEQ = addModel[0].get('PROBLEMSEQ');
     	var view = this.getView(); //得到列表页
    	this.dialog = view.add({
    		xtype : 'black-detail',   	
    	});   	
   	    var store = Ext.create('Ext.data.Store', {
 	     autoLoad: false,
 	     model: 'BackDetail',
 	     proxy: {
 	         type: 'ajax',
 	         api:{
 	         read:'/Wsitms/question/backDetail?PROBLEMBACKSEQ='+PROBLEMBACKSEQ
 	         }
 	     }
 	 });    
   	 var store1 = Ext.create('Ext.data.Store', {
 	     autoLoad: false,
 	     model: 'Op',
 	     proxy: {
 	         type: 'ajax',
 	         api:{
 	         read:'/Wsitms/question/backOp?PROBLEMBACKSEQ='+PROBLEMBACKSEQ
 	         }
 	     }
 	 });
   	
   	    this.lookup('opRecorded').setStore(store1);
	    this.lookup('opRecorded').getStore().load();
   	    store.load({
   			callback : function(record, options, success) {
   			 me.lookup('backDetail').loadRecord(record[0]);
   			 me.dialog.show(); 
   			}
   	    });
    },
    
    addOpRecord:function(){
     	var me =this;
    	var addModel= this.lookup('backRecord').getSelectionModel().getSelection();
     	if(addModel.length<1){
     	Ext.Msg.alert('提示','请选择一条记录')
		return false
     	}
     	var PROBLEMBACKSEQ = addModel[0].get('PROBLEMSEQ');
     	var view = this.getView(); //得到列表页
    	this.dialog = view.add({
    		xtype : 'op-record',   	
    	});
    	 var store = Ext.create('Ext.data.Store', {
     	     autoLoad: false,
     	     model: 'Op',
     	     proxy: {
     	         type: 'ajax',
     	         api:{
     	         read:'/Wsitms/question/backOp?PROBLEMBACKSEQ='+PROBLEMBACKSEQ
     	         }
     	     }
     	 });
       	
       	    this.lookup('opGrid').setStore(store);
    	    this.lookup('opGrid').getStore().load();
    	this.getViewModel().getStore('opTemplateStore').load();
    	this.dialog.show(); 
    },
 
     onDel :function(button){
     	var selection = button.getWidgetRecord();
     	selection.drop();//删除数据（标记数据为删除）   	    	
     },
     
     addCol:function(){
	    var addModel= this.lookup('backRecord').getSelectionModel().getSelection();
	    if(addModel==''||addModel==null){
		Ext.Msg.alert('提示','请选择要添加的模板记录')
	     return false
	   }
	     var PROBLEMSEQ = addModel[0].get('PROBLEMSEQ')
    	 var r = Ext.create('Ext.data.Model', {
    		 PROBLEMBACKSEQ:PROBLEMSEQ,
    		 OPMODELSEQ: '',
    		 OPKEYWORD: '',
    		 OPDESC:'',
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
    	 var backModel= this.lookup('backRecord').getSelectionModel().getSelection();
    	 var PROBLEMBACKSEQ = backModel[0].get('PROBLEMSEQ');
    	 var addModel =grid.getSelectionModel().getSelection();
    	 addModel[0].set('PROBLEMBACKSEQ',PROBLEMBACKSEQ);
    	 this.lookup('opGrid').getStore().insert(0,addModel[0]);
     },
     
     
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
    	});   	
    	this.lookup('optempForm').loadRecord(addModel[0]);
    	this.dialog.show();   
    
     },
     
     closeForm : function(){
    	 this.dialog = Ext.destroy(this.dialog);
     },
     opClose:function(){
    	 this.lookup('opRecord').destroy();
     },
     saveForm:function(){
    	var me = this;
    	var optempForm =this.lookup('optempForm');
     	if(optempForm.isValid()){	
     		optempForm.submit({
    			url:'/Wsitms/question/addOpTemp',
    			waitMsg:'正在提交数据',
    			waitTitle:'提示',
    			method:'POST',
    			success:function(form,action){
    				Ext.Msg.alert('提交成功', action.result.msg);
    				me.lookup('optempForm').destroy();
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
          
     opSave:function(){
    	 var opStore= this.lookup('opGrid').getStore();    	 
    	 var opModel = opStore.getCount();    	 
    	 if(opModel<1){
    		 Ext.Msg.alert('提示','没有操作信息添加');
    		 this.lookup('opRecord').destroy(); 
    		 return false;
    	 }    	    	
     	var dataArr = [];
     	 opStore.each(function(record){
     		dataArr.push(record.data)
    	 })
     	var jsonData = JSON.stringify(dataArr) 
 		Ext.Ajax.request({
 				url : '/Wsitms/question/addOp',
 				params :{'jsonData':jsonData},
 				method:'POST',
 				success : function(response, opts) {				
 					Ext.Msg.alert('提示',response.result.msg);
 				},
 				failure : function(response, opts){		
 				}
 			});   
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

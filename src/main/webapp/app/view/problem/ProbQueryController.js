Ext.define('Wsitms.view.problem.ProbQueryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.probquery',
    requires:[
    	'Wsitms.model.BackDetail',
    	'Wsitms.model.Op',
    	'Wsitms.view.problem.BackDetail'
    ],
   //根据查询条件，获得数据
    overProblems : function(){
    	var queryParams =this.lookup('queryParams');    	
    	var params = queryParams.getValues(true);
   	    var store = Ext.create('Ext.data.Store', {
 	     autoLoad: false,
 	     model: 'Question',
 	     proxy: {
 	         type: 'ajax',
 	         api:{
 	         read:'/Wsitms/question/overProblem?'+encodeURI(params)
 	         }
 	     }
 	 });    	 
 	 this.lookup('backRecord').setStore(store);
 	 this.lookup('backRecord').getStore().load();
    },
    //查看已回复问题详情
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
    		xtype : 'back-detail',   	
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
});

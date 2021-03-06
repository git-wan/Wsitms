Ext.define('Wsitms.view.report.SaleReportController',{
	extend:'Ext.app.ViewController',
	alias:'controller.sale-report',		
		requires:[
			'Wsitms.model.Sale'
	    ],
	    
/*		onAfterLayout:function(){ 
	   	    var store = Ext.create('Ext.data.Store', {
	    	     autoLoad: false,
	    	     model: 'Sale',
	    	     proxy: {
	    	         type: 'ajax',
	    	         api:{
	    	         read: '/Wsitms/report/load'
	    	         }
	    	     }
	    	 });    	 
	    	 this.getView().setStore(store);
	    	 this.getView().getStore().load();
	    }*/

	    changeDate: function(object,newDate, oldDate, eOpts ){
	    	var me =this;
	    	var date = this.format(newDate,'yyyy-MM-dd');
	  	    var store = Ext.create('Ext.data.Store', {
	    	     autoLoad: false,
	    	     model: 'Sale',
	    	     proxy: {
	    	         type: 'ajax',
	    	         api:{
	    	         read: '/Wsitms/report/load?SALEDATE='+date
	    	         }
	    	     }
	    	 });  
	  	    var currdate  = this.format(new Date(),'yyyy-MM-dd');
	  	    store.load({
	  	    	callback:function(reocrd,options,success){
	  	    		if(reocrd.length<1&&date==currdate){
	  	    			Ext.Msg.alert("提示","今日数据不存在，请在晚间9:50之后查询")
	  	    		}
	  	    		 me.getView().setStore(store);
	  	    	}
	  	    })
	    },
	    
	    //时间格式
	    format : function(time, format){
	    	 var t = new Date(time);
	    	    var tf = function (i) {
	    	      return (i < 10 ? '0' : '') + i
	    	    };
	    	    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
	    	      switch (a) {
	    	        case 'yyyy':
	    	          return tf(t.getFullYear());
	    	          break;
	    	        case 'MM':
	    	          return tf(t.getMonth() + 1);
	    	          break;
	    	        case 'mm':
	    	          return tf(t.getMinutes());
	    	          break;
	    	        case 'dd':
	    	          return tf(t.getDate());
	    	          break;
	    	        case 'HH':
	    	          return tf(t.getHours());
	    	          break;
	    	        case 'ss':
	    	          return tf(t.getSeconds());
	    	          break;
	    	      }
	    	    })

	    },
	    
	    aa : function(){
	    	var newdate = this.lookup('queryDate').getValue();
	    	var date = this.format(newdate,'yyyy-MM-dd')
	    	var store = this.getView().getStore();
	    	var size = store.getTotalCount();
	    	if(size<1){
	    		Ext.Msg.alert('提示','没有可导出数据');
	    		return false;
	    	}
	    	window.location.href='/Wsitms/report/excel?SALEDATE='+date
	    },
	    
	    
	    
	    onAdd:function(){
	    	
	    	this.displayForm(null);
	    },
	    
	    displayForm : function(record){
	    	var view = this.getView(); //得到列表页
	    	this.isEdit = !!record;
	    	this.dialog = view.add({
	    		xtype : 'aseet-form',
	    		viewModel : {
	    			data :{
	    				title: record ? '修改数据':'添加数据'
	    			},
	    			links:{
	    				theDepart : record || {
	    					//id : 'add',//会像后台发送数据
	    					create:true,//幻影记录，不会像后台发送数据
	    					type : 'Aseet'    				
	    				}     			
	    			}
	    		}    	
	    	});
	    	if(record){
	    	var COMPANY_CODE=record.get('COMPANY_CODE');
	    	this.lookup('combo-company').setValue(COMPANY_CODE);
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
	    		this.lookupReference('departFormReset').hide()
	    	}else{
	    		Ext.Msg.alert('提示','只能选择一条记录')
	    		return false;
	    	}
	    },
	    
	    
	    resetForm:function(){
	    	this.lookupReference('departForm').reset();    	
	    },
	    
	    saveForm : function(){
	        var me = this;
	    	var userForm =this.lookup('departForm');
	    	var id =this.lookup('primary_id').getValue();
	    	var addUrl ='/Wsitms/depart/addDepart';
	    	var modUrl ='/Wsitms/depart/modDepart';
	    	var url =modUrl;
	    	if(id=='Depart-1'){
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
	    				me.getViewModel().getStore('departStore').load(); 
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
	     
	     prn1_preview : function(){
	     	 window.open("question/printPage", "", 'left=0,top=0,width=750,height=1000,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');
	      },
	     
	     CreateOneFormPage : function(){
	    	    this.LODOP=getLodop(); 
	    	    this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
	    	    this.LODOP.SET_PRINT_STYLE("FontSize",8);
	    	    this.LODOP.SET_PRINT_STYLE("Bold",1);	    	    
	    	    this.LODOP.ADD_PRINT_HTM(18,20,350,600,document.getElementById("aseet-report").innerHTML);
	     },
	      
	     textWeb:function(){
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
	 				url : '/Wsitms/state/queryWeb',
	 				params :{'jsonData':jsonData},
	 				method:'POST',
	 				success : function(response, opts) {				
	 					Ext.Msg.alert('提示',response.result.msg);
	 				},
	 				failure : function(response, opts){		
	 				}
	 			});   
	     }
})
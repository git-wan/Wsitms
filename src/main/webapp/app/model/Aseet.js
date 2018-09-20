Ext.define('Wsitms.model.Aseet',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'id',type:'string',mapping:'FIXED_ID'
	},{
		name:'FIXED_CODE',type:'string'
	},{
		name:'FIXED_NAME',type:'string'
	},{
		name:'UNIT_CODE',type:'string'
	},{
		name:'BRAND_NAME',type:'string'
	},{
		name:'SORT_CODE',type:'string'
	},{
		name:'BUY_DEPARTMENT_CODE',type:'string'
	},{
		name:'BUY_CONTRACT_ID',type:'string'
	},{
		name:'BUYER',type:'string'
	},{
		name:'BUY_DATE',type:'string', convert :function(v,record){
			return  Ext.util.Format.date(new Date(v),'Y-m-d');
		}

	},{
		name:'OLD_DATE',type:'string',convert :function(v,record){
			return Ext.util.Format.date(new Date(v),'Y-m-d')
		}
	},{
		name:'OLD_VALUE',type:'float'
	},{
		name:'DEPRECIATION',type:'string'
	},{
		name:'NEW_VALUE',type:'float'
	},{
		name:'PART_VALUE',type:'float'
	},{
		name:'LEAVE_VALUE',type:'float'
	},{
		name:'STATE',type:'string'
	},{
		name:'SUPPLIER_CODE',type:'string'
	},{
		name:'SERVICE_LIST',type:'string'
	},{
		name:'CREATOR',type:'string'
	},{
		name:'CREATE_DATE',type:'string',convert :function(v,record){
			return Ext.util.Format.date(new Date(v),'Y-m-d')
		}
	},{
		name:'OPERATOR',type:'string'
	},{
		name:'OPERATE_DATE',type:'string',convert:function(v,record){
			return Ext.util.Format.date(new Date(v),'Y-m-d');
		}
	},{
		name:'ACCOUNT_MARK',type:'string'
	},{
		name:'NOTE',type:'string'
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/aseet/load'
		}
	}
	
})
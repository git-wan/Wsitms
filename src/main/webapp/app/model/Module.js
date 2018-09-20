Ext.define('Wsitms.model.Module',{
	extend:'Wsitms.model.Base',
	
	fields:[{
		name:'id', type:'string',mapping:'MODULE_ID'
	},{
		name:'MODULENAME' ,type:'string' 
	},{
		name:'GROUPNAME', type:'string'
	},{
		name:'DESCRIBE', type:'string'
	},{
		name:'OPPATH', type:'string'
	},{
		name:'VALID', type:'string'
	},{
		name:'UPDATETIME', type:'string',convert:function(v,record){
			var date='';
			if(null!=v&&v!=''){
				date=Ext.util.Format.date(new Date(v),'Y-m-d');
			}
		 return	date
		}
	},{
		name:'MENU_ID', type:'string'
	},{
		name:'REGISTER', type:'string'
	}],
	
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/module/load'
		}
	}
	
})
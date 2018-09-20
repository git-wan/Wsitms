Ext.define('Wsitms.model.Log',{
	extend:'Wsitms.model.Base',
	
	fields:[{
		name:'', type:'string', mapping:''
	},{
		name:'', type:'string', mapping:''
	},{
		name:'', type:'string', mapping:''
	},{
		name:'', type:'string', mapping:''
	},{
		name:'', type:'string', mapping:''
	},{
		name:'', type:'string', mapping:''
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'Wsitms/log/load'
		}
	}
})
Ext.define('Wsitms.model.Group',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'id',type:'string',mapping:'GROUP_ID'
	},{
		name:'GROUP_CODE',type:'string'
	},{
		name:'GROUP_NAME',type:'string'
	},{
		name:'VALID',type:'string'
	},{
		name:'NOTE',type:'string'
	}],
	

	
	proxy:{
		type:'ajax',
		api:{
			read:'Wsitms/group/load'
		}
	}
})
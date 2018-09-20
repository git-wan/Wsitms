Ext.define('Wsitms.model.Depart',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'id',type:'string',mapping:'DEPARTMENT_ID'  
	},{
		name:'DEPARTMENT_CODE',type:'string'
	},{
		name:'DEPARTMENT_NAME',type:'string'
	},{
		name:'COMPANY_CODE',type:'string'
	},{
		
	},{
		
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/depart/load'
		}
	}
})
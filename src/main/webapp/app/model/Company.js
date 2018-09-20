Ext.define('Wsitms.model.Company',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'COMPANY_CODE',type:'string'
	},{
		name:'COMPANY_NAME',type:'string'
	}],
	proxy:{
		type:'ajax',
			api:{
				read:'/Wsitms/depart/company'
			}
	}



})
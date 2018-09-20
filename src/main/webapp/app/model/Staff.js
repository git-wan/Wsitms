Ext.define('Wsitms.model.Staff',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'id',type:'string',mapping:'EMPLOYEE_CODE'  
	},{
		name:'EMPLOYEE_NAME',type:'string'
	},{
		name:'COMPANY_CODE',type:'string'
	},{
		name:'DEPARTMENT_CODE',type:'string'
	},{
		name:'AM_POSITION',type:'string'
	},{
		name:'AM_OPERATION',type:'string'
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/staff/load'
		}
	}
})
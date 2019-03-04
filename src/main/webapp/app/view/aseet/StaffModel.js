Ext.define('Wsitms.view.aseet.StaffModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.staff-register',
		
	requires:['Wsitms.model.Staff',
		    'Wsitms.model.Company'
		],
	
	stores:{
		staffStore:{
			model:'Staff',
			pageSize:5,
			autoLoad:true
		},
		
		companyStore:{
			model:'Company',
			autoLoad:false,
			pageSize:0
		},
		
		departStore:{
			fields:[ 'DEPARTMENT_CODE', 'DEPARTMENT_NAME'],
			autoLoad:false,
			pageSize:0,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/depart/departList'
				}
			}
		},
	}
})
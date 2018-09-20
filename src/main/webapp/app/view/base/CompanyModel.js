Ext.define('Wsitms.view.base.CompanyModel',{
	extend:'Wsitms.app.ViewModel',
	requires:['Wsitms.model.Entity'],
	
	stores:{
		entityStore:{
			model:'Entity',
			autoLoad:true,
			pageSize:10
		}
	}
})
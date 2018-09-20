Ext.define('Wsitms.view.base.PropModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.define-property',
	requires:['Wsitms.model.Property'],
	stores:{
		propStore:{
			model:'Property',
			autoLoad:false,
			pageSize:100,
		}
	}
})
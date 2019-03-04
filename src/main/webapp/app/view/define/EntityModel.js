Ext.define('Wsitms.view.define.EntityModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.entity-define',
	requires:['Wsitms.model.Entity'],
	stores:{
		entityStore:{
			model:'Entity',
			autoLoad:false,
			pageSize:0,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/init/entityList'
				}
			}
		}
	}
})
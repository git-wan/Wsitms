Ext.define('Wsitms.view.base.SysCodeModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.sys-code',
	requires:[
		'Wsitms.model.Syscode',
		 'Wsitms.model.Syscodeinfo'
	],
	stores:{
		sysCodeStore:{
			model:'Syscode',
			autoLoad:false,
			pageSize:15,
		},
		sysCodeInfoStore:{
			model:'Syscodeinfo',
			autoLoad:false,
			pageSize:0,
		}
	}


})
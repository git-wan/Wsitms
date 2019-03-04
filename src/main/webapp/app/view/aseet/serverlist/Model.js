Ext.define('Wsitms.view.aseet.serverlist.Model',{
	extend:'Ext.app.ViewModel',
	alias: 'viewmodel.serverlist',
	requires:['Wsitms.model.Server'],	
	stores:{
		serverStore:{
			model:'Server',
			autoLoad:false,
			pageSize:0,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/aseet/serverList'
				}
			}
		}
	}
})
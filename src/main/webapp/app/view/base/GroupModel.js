Ext.define('Wsitms.view.base.GroupModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.group-manage',
	
	requires:['Wsitms.model.Group'],
	
	stores:{
		groupStore:{
			model:'Group',
			autoLoad:false,
			pageSize:3,
		},
		userStore:{
			fields:[ 'USER_CODE', 'USER_NAME'],
			autoLoad:false,
			pageSize:0,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/user/userList'
				}
		}

	},}
})
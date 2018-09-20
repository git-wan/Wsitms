Ext.define('Wsitms.view.base.RoleModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.role-manage',
    requires:['Wsitms.model.Role'],
    stores:{
    	roleStore:{
    		model:'Role',
    		pageSize:5,
    		autoLoad:false,
    		remoteFilter: false,
    		remoteSort: false,   		
    	},
    	
    	moudleStore:{
			fields:[ 'MODULE_ID','DESCRIBE','GROUPNAME','MENU_ID'],
			autoLoad:false,
			pageSize:0,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/menu/roleMenu'
				}
		}
    	}
    }
    
    

});

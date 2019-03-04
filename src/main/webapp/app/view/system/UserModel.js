Ext.define('Wsitms.view.system.UserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user-manage',
    requires:[
    	'Wsitms.model.User'
    ],
    stores:{
    	userStore:{
    		model:'User',
    		pageSize:30,
    		autoLoad:false,
    		remoteFilter:false,//开启过滤条件
    		remoteSort:false,//开启排序条件
    		session:true
    	}
    }

});

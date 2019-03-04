Ext.define('Wsitms.view.status.StReModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.state-record',
/*    requires:[
    	'Wsitms.model.User'
    ],*/
    stores:{
/*    	userStore:{
    		model:'User',
    		pageSize:30,
    		autoLoad:false,
    		remoteFilter:false,//开启过滤条件
    		remoteSort:false,//开启排序条件
    		session:true
    	},*/
    	
		 entStore:  {
			   fields:['ENTITYNAME'],
			   autoLoad:false,
			    root: {
		        expanded: true,
		        //children: ['ENTITYNAME']
    	        },
    			proxy:{
    				type:'ajax',
    				api:{
    					read:'/Wsitms/init/entityList'
    				}
    		}
	},
    }

});
Ext.define('Wsitms.model.Role',{
	extend:'Wsitms.model.Base',
	
	fields:[{
		name:'id',type:'string',mapping:'ROLE_ID'    //每创建一个model，默认使用name为id的映射为唯一标识符
	},{
		name:'ROLE_CODE',type:'string'
	},{
		name:'ROLE_NAME',type:'string'
	},{
		name:'NOTE',type:'string'
	}],
	
    proxy:{
    	type:'ajax',
     api:{
    		read:'/Wsitms/role/load',
    	},
   

    }
	
})
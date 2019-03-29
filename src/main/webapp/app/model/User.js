Ext.define('Wsitms.model.User',{
	extend:'Wsitms.model.Base',
	//model组成：字段和代理
	//identifier:'uuid',
    fields:[{
    	name:'id',type:'string',mapping:'USER_ID'   	
    },{
    	name:'USER_CODE',type:'string'
    	
    },{
    	name:'USER_NAME',type:'string'
    },{
    	name:'USER_ROLE',type:'string'
    },{
    	name:'PASSWD',type:'string'
    },{
    	name:'VALID_SDATE',type:'string',convert :function(v,record){
    		//v为value,record为当前接收的数据对象即model
            //将一个long型的time转换为标准的日期对象
            //此时V为一个long型的时间毫秒数
            return  Ext.util.Format.date(new Date(v),'Y-m-d');
        }  
    },{
    	name:'VALID_TDATE',type:'string' ,convert :function(v,record){

            return  Ext.util.Format.date(new Date(v),'Y-m-d');
        }   
    },{
    	name:'VALID',type:'string'
    },{
    	name:'LOCKED',type:'string'
    },{
    	name:'NOTE',type:'string'
    }],
      
    proxy:{
    	type:'ajax',
    	api:{
    		read:'/Wsitms/user/load',
    	},
       //url:'/Wsitms/user/load',
    }
});
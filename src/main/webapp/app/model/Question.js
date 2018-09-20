Ext.define('Wsitms.model.Question',{
	extend:'Wsitms.model.Base',
	
	
	//model组成：字段和代理
	//identifier:'uuid',
    fields:[{
    	name:'id',type:'int',mapping:'PROBLEMSEQ'
    	
    },{
    	name:'PROBLEMHUMAN',type:'string'
    },{
    	name:'PROBLEMTYPE',type:'string'
    },{
    	name:'APPLICATION',type:'string'
    },{
    	name:'DATE_',type:'string',convert :function(v,record){

            return  Ext.util.Format.date(new Date(v),'Y-m-d');
        }   
    },{
    	name:'TIME_',type:'string'
    },{
    	name:'PROBLEMNOTE',type:'string'
    },{
    	name:'SHOWMARK',type:'boolean', /*defaultValue: false,convert:function(v,record){
  
    		if(v=='YES'){
    			return true;
    		}
    		return false;
    	}*/
    },{
    	name:'NOTE',type:'string'
    },{
    	name:'RECORDER',type:'string'
    },{
    	name:'INDATE',type:'string',convert :function(v,record){

            return  Ext.util.Format.date(new Date(v),'Y-m-d');
        }   
    },{
    	name:'PROBLEMBACKSEQ',type:'int'
    },{
    	name:'PROBLEMSTATUS',type:'string'
    }],
    
    proxy:{
    	type:'ajax',
     api:{
    		read:'/Wsitms/question/load',
    	},
        //告诉系统服务端返回的数据如何解析
/*        reader:{
        	rootProperty:'root',
        	totalProperty:'total',
        	successProperty:'success',
        	messageProperty:'message'
        },*/
        //写入服务器的json
/*        writer:{
        	type:'json',
        	transform:{
        		fn:function(data,request){
        			if(!Array.isArray(data)){
        				var arrayData =new Array();
        				arrayData.push(data);
        				return arrayData;
        			}
        			
        		},
        		scope:this
        	}
        }*/
    }
	
})
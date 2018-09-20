Ext.define('Wsitms.model.Entity',{
	extend:'Wsitms.model.Base',
	
	fields:[{
		name:'id', type:'string', mapping:'ENTITY_ID'
	},{
		name:'ENTITYNO', type:'string'
	},{
		name:'ENTITYTYPE', type:'string'
	},{
		name:'ENTITYNAME', type:'string'
	},{
		name:'CREATEDATE', type:'string',convert :function(v,record){

            return  Ext.util.Format.date(new Date(v),'Y-m-d');
        }   
	},{
		name:'AVAILABILITYMARK', type:'string'
	},{
		name:'INVALIDATION', type:'string',convert :function(v,record){

            return  Ext.util.Format.date(new Date(v),'Y-m-d');
        }   
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/init/entityList'
		}
	}
	
})
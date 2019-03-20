Ext.define('Wsitms.model.AssPlan',{
	extend:'Wsitms.model.Base',	
	fields:[{
		name:'ID',type:'string'
	},{
		name:'PLANNAME',type:'string'
	},{
		name:'STARTDATE',type:'string',convert :function(v,record){
			return Ext.util.Format.date(new Date(v),'Y-m-d')
		}
	},{
		name:'ENDDATE',type:'string',convert :function(v,record){
			return Ext.util.Format.date(new Date(v),'Y-m-d')
		}
	},{
		name:'RULENAME',type:'string'
	},{
		name:'OBJ_GROUP',type:'string'
	},{
		name:'HEADER',type:'string'
	}],
	
})
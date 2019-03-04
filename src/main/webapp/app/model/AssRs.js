Ext.define('Wsitms.model.AssRs',{
	extend:'Wsitms.model.Base',			
	fields:[{
		name:'ID',type:'string'
	},{
		name:'ASS_OBJECT',type:'string'
	},{
		name:'ASS_DATE',type:'string',convert :function(v,record){
			return Ext.util.Format.date(new Date(v),'Y-m')
		}
	},{
		name:'F_SCO',type:'string'
	},{
		name:'SCO_LEVEL',type:'string'
	}],
})
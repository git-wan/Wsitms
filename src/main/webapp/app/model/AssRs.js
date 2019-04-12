Ext.define('Wsitms.model.AssRs',{
	extend:'Wsitms.model.Base',			
	fields:[{
		name:'ID',type:'string'
	},{
		name:'ASS_OBJECT',type:'string'
	},{
		name:'ASS_DATE',type:'string',convert :function(v,record){
			return Ext.util.Format.date(new Date(v),'Y-m-d')
		}
	},{
		name:'F_SCO',type:'string'
	},{
		name:'QUALITY',type:'string'
	},{
		name:'EFFICIENCY',type:'string'
	},{
		name:'CHECKWORK',type:'string'
	},{
		name:'ACTION',type:'string'
	},{
		name:'RESPONSIBILITY',type:'string'
	},{
		name:'CREATIVE',type:'string'
	},{
		name:'NOTE',type:'string'
	},{
		name:'SCO_LEVEL',type:'string'
	},{
		name:'PLANNAME',type:'string'
	},{
		name:'ADJUSTER',type:'string'
	}]
});
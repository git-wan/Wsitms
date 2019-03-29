Ext.define('Wsitms.model.Assess',{
	extend:'Wsitms.model.Base',		
	
	fields:[{
		name:'ID',type:'string'
	},{
		name:'ASS_OBJECT',type:'string'
	},{
		name:'POSITION',type:'string'
	},{
		name:'ASS_DATE',type:'string',convert :function(v,record){
			return Ext.util.Format.date(new Date(v),'Y-m-d')
		}
	},{
		name:'ADJUSTER',type:'string'
	},{
		name:'STATUS',type:'string'
	},{
		name:'T_SCO',type:'string'
	},{
		name:'REMARK',type:'string'
	},{
		name:'PLANNAME',type:'string'
	}],
})
Ext.define('Wsitms.model.OpTemplate',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'OPMODELSEQ',type:'string'
	},{
		name:'OPKEYWORD',type:'string'
	},{
		name:'OPDESC',type:'string'
	},{
		name:'OPNOTE',type:'string'
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/question/opTempLoad'
		}
	}
})
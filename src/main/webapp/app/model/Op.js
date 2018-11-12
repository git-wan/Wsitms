Ext.define('Wsitms.model.Op',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'PROBLEMBACKSEQ',type:'string'
	},{
		name:'OPSEQ',type:'string'
	},{
		name:'OPKEYWORD',type:'string'
	},{
		name:'OPDESC',type:'string'
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/question/opTempLoad'
		}
	}
})
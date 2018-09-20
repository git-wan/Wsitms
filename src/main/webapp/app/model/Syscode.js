Ext.define('Wsitms.model.Syscode',{
	extend:'Wsitms.model.Base',
	
	fields:[{
		name:'id' ,type:'string', mapping:'SYSTEMCODESEQ'
	},{
		name:'SYSTEMCODETYPE' ,type:'string',
	},{
		name:'SYSTEMCODENAME' ,type:'string',
	},{
		name:'SYSTEMCODEVALUETYPE' ,type:'string',
	},{
		name:'CHANGEMARK' ,type:'string',
	},{
		name:'NOTE' ,type:'string',
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/init/load'
		}
	}
})
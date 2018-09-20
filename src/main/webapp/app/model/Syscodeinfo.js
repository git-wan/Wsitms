Ext.define('Wsitms.model.Syscodeinfo',{
	extend:'Wsitms.model.Base',
	

	fields:[{
		name:'id' ,type:'string', mapping:'SYSTEMCODESEQ'
	},{
		name:'SYSTEMCODETYPE' ,type:'string',
	},{
		name:'SYSTEMCODENAME' ,type:'string',
	},{
		name:'SYSTEMCODEVALUESEQ' ,type:'string',
	},{
		name:'SYSTEMCODECHAR' ,type:'string',
	},{
		name:'SYSTEMCODENUMBER' ,type:'string',
	},{
		name:'SYSTEMCODEDATE' ,type:'string' ,convert :function(v,record){

            return  Ext.util.Format.date(new Date(v),'Y-m-d');
        } 
	},{
		name:'CODENOTE' ,type:'string',
	}],

})
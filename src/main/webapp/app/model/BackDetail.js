Ext.define('Wsitms.model.BackDetail',{
	extend:'Wsitms.model.Base',	
    fields:[{
    	name:'PROBLEMNOTE',type:'string'	
    },{
    	name:'ANYONE',type:'string'
    },{
    	name:'ROUTE',type:'string'
    },{
    	name:'ROUTEMARK',type:'string'
    },{
    	name:'ANSWERMARK',type:'string'
    },{
    	name:'ANSWERNOTE',type:'string'
    },{
    	name:'ANSWERDATE',type:'string',convert :function(v,record){
            return  Ext.util.Format.date(new Date(v),'Y-m-d');
        }   
    },{
    	name:'ANSWERRECORDER',type:'string'
    },{
    	name:'BACKNOTE',type:'string'
    }],
})
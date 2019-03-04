Ext.define('Wsitms.model.Article',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'ART_ID',type:'string'
	},{
		name:'TITLE',type:'string'
	},{
		name:'CONTENT',type:'string'
	},{
		name:'AUTHOR',type:'string'
	},{
		name:'HITS',type:'string'
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/question/artList'
		}
	}
	
})
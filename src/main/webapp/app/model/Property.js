Ext.define('Wsitms.model.Property',{
	extend:'Wsitms.model.Base',
	
	fields:[{
		name:'id', type:'string', mapping:'PROPERTY_ID'
	},{
		name:'PROPERTYNO', type:'string'
	},{
		name:'PROPERTYNAME', type:'string'
	},{
		name:'PROPERTYOP', type:'string'
	},{
		name:'PROPERTYMARK', type:'string'
	},{
		name:'PROPERTYVALUETYPE', type:'string'
	},{
		name:'PROPERTYCHAR', type:'string'
	},{
		name:'PROPERTYMINI', type:'string'
	},{
		name:'PROPERTYMAX', type:'string'
	},{
		name:'NOTE', type:'string'
	},{
		name:'SHOWMARK', type:'string'
	}],
	
	proxy:{
		type:'ajax',
		api:{
			read:'/Wsitms/init/propList'
		}
	}
	
})
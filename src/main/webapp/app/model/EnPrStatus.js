Ext.define('Wsitms.model.EnPrStatus',{
	extend:'Wsitms.model.Base',
	
	fields:[{
		name:'ENTITYNO', type:'string'
	},{
		name:'ENTITYNAME', type:'string'
	},{
		name:'PROPERTYNO', type:'string'
	},{
		name:'PROPERTYNAME', type:'string'
	},{
		name:'PROPERTYVALUE', type:'string'
	},{
		name:'PROPERTYCHAR', type:'string'
	},{
		name:'PROPERTYNUMBER', type:'string'
	},{
		name:'CYCLETIME', type:'string',convert :function(v,record){

            return  Ext.util.Format.date(new Date(v),'Y-m-d:H:i:s');
        }   
	},{
		name:'STATUS', type:'string'
	}],
	

	
})
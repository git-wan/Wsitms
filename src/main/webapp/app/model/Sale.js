Ext.define('Wsitms.model.Sale',{
	extend:'Wsitms.model.Base',
	
	
	fields:[{
		name:'SALEDATE',type:'string', convert :function(v,record){
			return  Ext.util.Format.date(new Date(v),'Y-m-d');
		}
	},{
		name:'STORENAME',type:'string'
	},{
		name:'CURRAMT',type:'string'
	},{
		name:'COMAMT',type:'string'
	},{
		name:'COMINCREASE',type:'string'
	},{
		name:'CURRSUM',type:'string'
	},{
		name:'HISSUM',type:'string'
	}],
	
	
})
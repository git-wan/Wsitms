Ext.define('Wsitms.model.EntityProp', {   //实体属性model
	extend : 'Wsitms.model.Base',
	fields : [ {
		name : 'id',
		type : 'string',
		mapping : 'ENTPROP_ID'
	}, {
		name : 'ENTITYNO',
		type : 'string'
	}, {
		name : 'ENTITYNAME',
		type : 'string'
	}, {
		name : 'PROPERTYNO',
		type : 'string'
	}, {
		name : 'PROPERTYNAME',
		type : 'string'
	}, {
		name : 'PROPERTYVALUE',
		type : 'string',
		convert : function(v, record) {
			var VALUEFLAG = record.data.VALUEFLAG;
			if (VALUEFLAG == 'PSWD') {
				v = '****'
			}
			return v
		}
	}, {
		name : 'VALUEFLAG',
		type : 'string'
	}, {
		name : 'VALUETYPE',
		type : 'string'
	}, {
		name : 'AUTOENTRY',
		type : 'string'
	}, {
		name : 'PROPERTYMINI',
		type : 'string'
	}, {
		name : 'PROPERTYMAX',
		type : 'string'
	}, {
		name : 'SHOWMARK',
		type : 'string'
	} ],
})
Ext.define('Wsitms.view.assess.AssForm', {
	extend : 'Ext.window.Window',
	xtype : 'ass-window',
	height : 600,
	width : 550,
	bind : {
		title : '{title}'
	},	
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference:'ass-form',
		margin:'10 0 0 0',
		layout : {
			type : 'vbox',
			
			align : 'left'
		},
		items : [{
			xtype:'textfield',
			fieldLabel:'评定人',			
			name:'ADJUSTER',
/*			displayField : 'ADJUSTER',
			valueField : 'ADJUSTER',*/
			style : 'margin-left:20px',
			value:userName,
			readOnly:true
	/*		bind : {
				store : '{mon_users_Store}'
			},
			listeners : {
				change : 'changeQuery',				
			}*/
		},{
			fieldLabel:'评定对象',
			xtype:'combobox',
			name:'ASS_OBJECT',
			editable:false,
			allowBlank : false,
			displayField : 'ASS_OBJECT',
			valueField : 'ASS_OBJECT',
			style : 'margin-left:20px',
			bind : {
				store : '{mon_users_Store}'
			}
		},{
			xtype:'textfield',
			fieldLabel:'部门',
			name:'DEPARTNAME',
			style : 'margin-left:20px',
			value:'资讯部',
			readOnly:true
		}/*,{
			xtype:'textfield',
			fieldLabel:'岗位',
			name:'POSITION',
			style : 'margin-left:20px',
		}*/],
	},		
	buttons : [ {
		text : '保存',
		handler : 'saveForm'
	}/*, {
		text : '清空',
		handler : 'resetForm',
		reference : 'staffFormReset'
	}*/, {
		text : '返回',
		handler : 'closeForm'
	} ],
	
})
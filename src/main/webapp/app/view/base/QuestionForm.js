Ext.define('Wsitms.view.base.QuestionForm',{
	extend:'Ext.window.Window',
	
	xtype:'question-form',
	
	layout:'fit',
	
	modal:true,
	
	width:500,
	
	height:450,
	
	closeable:true,
	
	bind:{
		title:'{title}'
	},
	
	items:{
		xtype:'form',
		reference:'form',
		bodyPadding:10,
		border:false,
		layout:{
			type:'vbox',
			align:'stretch'
		},
		items:[
			{
				xtype:'textfield',
				fieldLabel:'部门编码',
				reference:'code',
				msgTarget:'side',
				bind:'{theDepart.code}'
			},
			{
				xtype:'textfield',
				fieldLabel:'部门名称',
				reference:'name',
				msgTarget:'side',
				bind:'{theDepart.name}'
			},
			{
				xtype:'textarea',
				fieldLabel:'部门描述',
				reference:'describe',
				msgTarget:'side',
				bind:'{theDepart.describe}'
			},
			{
				xtype:'textarea',
				fieldLabel:'备注',
				reference:'note',
				msgTarget:'side',
				bind:'{theDepart.note}'
			},
		],
		buttons:[
			{
				text:'保存',
				handler:'onSaveClick'
			},{
				text:'取消',
				handler:'onCancelClick'
			}],
		
		listeners:{
			close:'onCloseForm'
		}	
	}
	
})
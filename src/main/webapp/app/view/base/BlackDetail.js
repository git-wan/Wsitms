Ext.define('Wsitms.view.base.BlackDetail',{
	extend:'Ext.window.Window',
	xtype:'black-detail',
	height:'700',
	width:700,
	title:'详细记录',
	modal:true,//模态框，开启遮罩
	items:[{
		xtype:'form',
		style:'margin-top:2px',
		id:'backDetail',
		reference:'backDetail',
		items:[{
			xtype:'textareafield',
			fieldLabel:'问题描述',
			margin:'10 0 0 10',
			width:'100%',
			name:'PROBLEMNOTE',
			editable:false
		},{
			layout:'column',
			margin:'10 0 0 10',
			items:[{
				xtype:'textfield',
				fieldLabel:'反馈对象',
				name:'ANYONE',
				editable:false
			},{
				xtype:'textfield',
				fieldLabel:'反馈路径',
				name:'ROUTE',
				editable:false
			},{
				xtype:'textfield',
				fieldLabel:'成功标志',
				name:'ROUTEMARK',
				editable:false
			}]
		},{
			layout:'column',
			margin:'10 0 0 10',
			items:[{
				xtype:'textfield',
				fieldLabel:'回应人',
				name:'ANSWERRECORDER',
				editable:false
			},{
				xtype:'datefield',
				fieldLabel:'回应日期',
				name:'ANSWERDATE',
				format:'Y-m-d',
				readOnly:true
			},{
				xtype:'textfield',
				fieldLabel:'是否回应问题',
				name:'ANSWERMARK',
				editable:false
			}]
		},{
			xtype:'textarea',
			fieldLabel:'回应说明',
			margin:'10 0 0 10',
			width:'100%',
			name:'ANSWERNOTE',
			editable:false
		},{
			xtype:'textarea',
			fieldLabel:'备注',
			margin:'10 0 10 10',
			width:'100%',
			name:'BACKNOTE',
			editable:false
		}]
	},{
		title:'操作记录',
		xtype:'grid',
		reference:'opRecorded',
		columns:[{
			text:'操作序号',
			dataIndex:'OPSEQ'
		},{
			text:'操作关键词',
			dataIndex:'OPKEYWORD',
			flex:1,
		},{
			text:'操作描述',
			dataIndex:'OPDESC',
			flex:2
		}]
	}],

})


Ext.define('Wsitms.view.base.ProblemQuery',{
	extend:'Ext.tab.Panel',
	xtype:'problem-query',
	style:'margin-top:2px',
	frame:true,
	items:[{
		frame:true,
		layout:'hbox',
		title:'问题记录',
		items:[{
		xtype:'grid',
		autoScroll:true,
		flex:3,
		height:'100%',
		columns:[{
			text:'问题编号',
			dataIndex:''
		},{
			text:'提问人',
			dataIndex:''
		},{
			text:'问题类型',
			dataIndex:''
		},{
			text:'应用系统',
			dataIndex:''
		},{
			text:'记录日期',
			dataIndex:''
		},{
			text:'记录时间',
			dataIndex:''
		},{
			text:'问题描述',
			dataIndex:''
		},{
			text:'监控',
			dataIndex:''
		},{
			text:'备注',
			dataIndex:''
		},{
			text:'记录人',
			dataIndex:''
		},{
			text:'记录时间',
			dataIndex:''
		},{
			text:'问题状态',
			dataIndex:''
		}]
		},{
			xtype:'form',
			flex:1,
			height:'100%',
			frame:true,
			items:[{
				xtype:'datefield',
				fieldLabel:'记录起始日期:',
				
			},{
				xtype:'datefield',
				fieldLabel:'记录终止日期',
				
			},{
				xtype:'combobox',
				fieldLabel:'问题类型'
			},{
				xtype:'combobox',
				fieldLabel:'应用系统'
			}],
			buttons:[{text:'提交',handler:''}]
		}]
	},
	{
		title:'回复记录',
		items:[{
			xtype:'form',
			title:'详细记录',
			style:'margin-top:2px',
			items:[{
				xtype:'textareafield',
				fieldLabel:'问题描述',
				margin:'10 0 0 10',
				width:'100%'
			},{
				layout:'column',
				margin:'10 0 0 10',
				items:[{
					xtype:'textfield',
					fieldLabel:'反馈对象'
				},{
					xtype:'textfield',
					fieldLabel:'反馈路径'
				},{
					xtype:'textfield',
					fieldLabel:'成功标志'
				}]
			},{
				layout:'column',
				margin:'10 0 0 10',
				items:[{
					xtype:'textfield',
					fieldLabel:'回应人'
				},{
					xtype:'datefield',
					fieldLabel:'回应日期'
				},{
					xtype:'textfield',
					fieldLabel:'是否回应问题'
				}]
			},{
				xtype:'textarea',
				fieldLabel:'回应说明',
				margin:'10 0 0 10',
				width:'100%'
			},{
				xtype:'textarea',
				fieldLabel:'备注',
				margin:'10 0 10 10',
				width:'100%'
			}]
		},{
			title:'操作记录',
			xtype:'grid',
			columns:[{
				text:'操作序号',
				dataIndex:''
			},{
				text:'操作关键词',
				dataIndex:''
			},{
				text:'操作描述',
				dataIndex:''
			}]
		}]
		
		
	}]
})
Ext.define('Wsitms.view.base.OpRecord',{
	extend:'Ext.window.Window',
	xtype:'op-record',
	height:'420',
	width:800,
	modal:true,//模态框，开启遮罩
	layout:{
		type:'hbox',	
	},
	reference:'opRecord',
	title:'添加操作记录',
	items:[{
			xtype:'grid',
			height:'100%',
			style:'margin-top:2px',
			flex:1,
			border:true,
			autoScroll:true,	             			
			reference:'opGrid',	             	
		    plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1, //设置单击单元格编辑	               
            })
            ],
		  	title:{
	    		text:'操作记录',
	    		style:'line-height:12px;font-size:12px;'
	    	},
			tbar:[{
				text:'添加操作记录',
				glyph:0xf067,
				handler:'addCol'
			},{
				text:'删除操作记录',
			    glyph:0xf014,
			    handler:'delCol'
			},{
				text:'添加操作记录',
				glyph:0xf067,
				handler:'addOpTemp'
			}],
			columns:[{
				dataIndex:'PROBLEMBACKSEQ',
				hidden:true
			},{
				text:'操作序号',
				dataIndex:'OPSEQ',
				editor: 'textfield'
			},{
				text:'操作关键词',
				dataIndex:'OPKEYWORD',
				editor: 'textfield'
			},{
				text:'操作描述',
				dataIndex:'OPDESC',
				editor: 'textfield'
			}],
		   selModel:{
		    	selType:'checkboxmodel',
		    },	             		
		},
		{
		    xtype:'grid',
		    style:'margin-top:2px',
		   bind:{store:'{opTemplateStore}'},
		  	title:{
	    		text:'操作记录模板',
	    		style:'line-height:12px;font-size:12px;'
	    	},
			height:'100%',
			flex:1,
			border:true,//shang you  xia zuo
			//autoScroll:true,
			columns:[{
				text:'模板编号',
				dataIndex:'OPMODELSEQ'
			},{
				text:'操作关键词',
				dataIndex:'OPKEYWORD'
			},{
				text:'操作描述',
				dataIndex:'OPDESC'
			},{
				text:'备注',
				dataIndex:'OPNOTE'
			}],
		   listeners:{
     			  rowdblclick:'rowdblclick'
     		    }
		}],	             	

	buttons:[{
		text:'提交',
		handler:'opSave'
	},{
		text:'返回',
		handler:'opClose'
	}]
})



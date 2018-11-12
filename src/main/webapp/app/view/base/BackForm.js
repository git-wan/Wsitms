Ext.define('Wsitms.view.base.BackForm',{
	extend:'Ext.window.Window',
	xtype:'black-form',
	height:'395',
	width:740,
	title:'详细记录',
	layout:'card',
	modal:true,//模态框，开启遮罩
	active:0,
	reference:'backWindow',
	items:[{
	    xtype:'form',
	    reference:'backForm',	
    	items:[{ 
    		layout:'column',
    		margin:'10 0 0 10',
    		items:[{
        	fieldLabel:'反馈对象',
        	name:'ANYONE',
        	xtype:'textfield'
            },{
            fieldLabel:'反馈路径',
            xtype:'textfield',
            style:'margin-left:30px',
            name:'ROUTE'
            },{
            fieldLabel:'成功标志',
            xtype:'textfield',
            margin:'10 0 0 0',
            name:'ROUTEMARK'
            },{
                fieldLabel:'回应日期',
                xtype:'datefield',
                margin:'10 0 0 30',
                name:'ANSWERDATE',
                format:'Y-m-d'
                }]
    		 },{
    			 layout:'column',
    			 margin:'10 0 0 10',
    			 items:[{
    				 xtype:'textfield',
    				 fieldLabel:'回应人',
    				 name:'ANSWERRECORDER'
    				 
    			 },{
    				 xtype:'checkboxfield',
    				 fieldLabel:'是否回应问题',
    				 style:'margin-left:30px',
    				 boxLabel:'是',
    			     name:'ANSWERMARK',
    			     inputValue:'YES'
    			 },{
    				 xtype:'textfield',
    			     name:'PROBLEMBACKSEQ',
    			     hidden:true,
    			     bind:'{PROBLEMBACKSEQ}'
    			 }]	    			 	    			 
    		 },{
    			 margin:'10 0 0 10',//上右下左
    			 xtype:'textarea',
    			 fieldLabel:'回应说明',	    			 
    			 width:'100%',
    			 name:'ANSWERNOTE'
    		 },{
    			 margin:'10 0 0 10',
    			 xtype:'textarea',
    			 fieldLabel:'备注',	    			
    			 width:'100%',//最低宽度80
    			 name:'BACKNOTE'
    		 }]
	},{
		layout:{
			type:'hbox',	
		},
		reference:'opRecord',
		//title:'添加操作记录',
		xtype:'panel',
		items:[{
				xtype:'grid',
				height:'100%',
				style:'margin-top:2px',
				flex:1,
				border:true,
				//autoScroll:true,	             			
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
					text:'添加模板记录',
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
			}]
	}],
	buttons:[{
		    text:'上一步',
		    handler:'lastStep',
		    reference:'lastStep',
		    hidden:true
	},{
	        text: '下一步',
	        reference:'nextStep',
	        handler:'nextStep',
	        
    },{
			text:'完成',
			handler:'done',
			reference:'done',
			hidden:true
	},{
			text:'返回',
			handler:'closeForm'
	}]
})



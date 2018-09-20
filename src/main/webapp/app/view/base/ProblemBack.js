Ext.define('Wsitms.view.base.ProblemBack',{
	extend:'Ext.panel.Panel',
	xtype:'problem-back',
	
	requires:[
		'Wsitms.view.base.ProblemBackController',
		'Wsitms.view.base.ProblemBackModel',
		'Ext.grid.plugin.RowEditing'
	],
    controller: "questback",
    viewModel: {
        type: "questback"
    },
	layout:{
			type:'anchor',
		},

	    items:[{
	    	xtype:'grid',
	    	title:{
	    		text:'未回复问题记录',
	    		style:'line-height:12px;font-size:12px;'
	    	},
	    	style:'margin-top:2px',
	    	anchor:'100% 40%',
	    	frame:true,
	    	autoScroll:true,
	    	bind:{store:'{questStore}'},
	        plugins: [
	            Ext.create('Ext.grid.plugin.CellEditing', {
	                clicksToEdit: 2, //设置单击单元格编辑	               
	            })
	        ],
	        
	    	tbar:[{    		
	        	 	text:'刷新问题',
	            	tooltip:'',
	            	glyph:0xf021,
	            	handler:'refreshPage'
	        	},{    		
	        	 	text:'无问题',
	            	tooltip:'删除无问题记录',
	            	glyph:0xf00c,//f00c 正确//f044编辑  //f0c7保存//f010 查询 //f067增
	            	handler:''   //f014 删除
	        	},'-',{    		
	        	 	text:'修改保存',
	            	tooltip:'同步所有的改动到服务器',
	            	glyph:0xf0c7,
	            	handler :'editSave'
	        	}],
	    	columns:[{
	    			text : '问题编号',
		   	        dataIndex : 'id',
		   	        align : 'center',
		   	        flex:1,
		   	        sortable : false,
	    		},{
	        		text:'提问人',
	        		 flex:1,
	        		dataIndex:'PROBLEMHUMAN'
	        	},{
	        		text:'问题类型',
	        		flex:1,
	        		dataIndex:'PROBLEMTYPE',
	        /*		edit:{
	        			xtype:'combobox',
	        			
	        		}*/
	        	},{
	        		text:'应用系统',
	        		 flex:1,
	        		dataIndex:'APPLICATION',
	        	
	        	},{
	        		text:'问题描述',
	        		 flex:1,
	        		dataIndex:'PROBLEMNOTE'
	        	},{
	        		text:'监控',
	        		xtype: 'checkcolumn',
	        		flex:1,
	        		dataIndex:'SHOWMARK',
	        		
	     
	        	},{
	        		text:'备注',
	        		flex:1,
	        		dataIndex:'NOTE',
	        	    editor: {
	        	            xtype: 'textfield',
	        	            allowBlank: false,
	        	            name: 'NOTE'
	        	        }
	        	},{
	        		text:'记录人',
	        		 flex:1,
	        		dataIndex:'RECORDER'
	        	},{
	        		text:'记录时间',
	        		 flex:1,
	        		dataIndex:'INDATE',
	        		format:'Y-m-d'
	        	}],
	        selModel: {
	            selType: 'checkboxmodel'
	        },
 	
	     },{
	    	xtype:'form',
	    	anchor:'100% 30%',
	    	title:{
	    		text:'详细记录',
	    		style:'line-height:12px;font-size:12px;'
	    	},
	    	reference:'backForm',
	    	autoScroll:true, 
	    	items:[{ 
	    		layout:'column',
	    		margin:'10 0 0 10',
	    		items:[{
	        	fieldLabel:'反馈对象',
	        	xtype:'textfield'
                },{
                fieldLabel:'反馈路径',
                xtype:'textfield',
                style:'margin-left:30px'
                },{
                fieldLabel:'成功标志',
                xtype:'textfield',
                margin:'0 0 0 30'
                }]
	    		 },{
	    			 layout:'column',
	    			 margin:'10 0 0 10',
	    			 items:[{
	    				 xtype:'textfield',
	    				 fieldLabel:'回应人'
	    			 },{
	    				 xtype:'checkboxfield',
	    				 fieldLabel:'是否回应问题',
	    				 style:'margin-left:30px',
	    				 boxLabel:'是'
	    			 }]	    			 	    			 
	    		 },{
	    			 margin:'10 0 0 10',//上右下左
	    			 xtype:'textarea',
	    			 fieldLabel:'回应说明',	    			 
	    			 width:'100%'
	    		 },{
	    			 margin:'10 0 0 10',
	    			 xtype:'textarea',
	    			 fieldLabel:'备注',	    			
	    			 width:'100%'//最低宽度80
	    		 }]

	             },{                    
                    layout:'hbox',
                    anchor:'100% 30%', 
                    autoScroll:true,
                    xtype:'panel',
	             	items:[{
	             			xtype:'grid',
	             			height:'100%',
	             			flex:1,
	             			border:true,
	             			autoScroll:true,	             			
	             			reference:'opGrid',	             	
	            	   /*     plugins: [{
	            	            ptype: 'rowediting',
	            	            clicksToEdit: 1
	            	        }],*/
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
	             				text:'操作序号',
	             				dataIndex:'OPMODELSEQ',
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
	             		   bind:{store:'{opTemplateStore}'},
	             		  	title:{
	            	    		text:'模板',
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
	                 }],
	                 buttons:[{
	                	 text:'提交回复'
	                 },{
	                	 text:'重置',
	                	 handler:'resetForm'
	                 }],	                 
	             	listeners:{
	            		afterlayout:{
	            			fn:'onAfterLayout',
	            			delay:1,
	            			single:true
	            		}
	            	},    
})

   


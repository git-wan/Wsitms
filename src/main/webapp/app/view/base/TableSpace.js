Ext.define('Wsitms.view.base.TableSpace',{
	extend:'Ext.panel.Panel',
	xtype:'table-space',
	layout:'hbox',//布局可以激活百分比
	requires: ['Wsitms.view.base.TaSpController'],
	controller: 'table-space',
	items:[{
		title:'数据库',
		xtype:'grid',
		border:1,
		style:'margin-top:2px',
		height:'100%',
		width:'50%',
		reference:'tableSpace',
		tbar:[{
			text:'数据库刷新',
			handler:''
		},{
			text:'查询表空间',
			handler:'tableSpace'
		}],
		columns:[{
			text:'实物编号',
			dataIndex:'ENTITYNO'
		},{
			text:'实物名称',
			dataIndex:'ENTITYNAME'
		}]
	},{
		xtype:'grid',
		title:'表空间',
		style:'margin-top:2px',
		height:'100%',
		width:'50%',
		reference:'querySpace',
		tbar:[{
			text:'保存',
			handler:''
		}],
		columns:[{
			text:'表空间名称',
			dataIndex:'TABLENAME'
		},{
			text:'表空间大小M',
			dataIndex:'TABLESIZE',
			renderer:function(v){
				return v+'M'
			}
		
		},{
			text:'已使用M',
			dataIndex:'USED',
			renderer:function(v){
					return v+'M'
				}
				
		},{
			text:'利用率',
			dataIndex:'UTILIZATION',
	        renderer:function(v){
				return v+'%'
			}
		}]
	}],
    listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    },
})
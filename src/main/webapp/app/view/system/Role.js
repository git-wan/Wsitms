Ext.define("Wsitms.view.system.Role",{
    extend: "Ext.panel.Panel",
	xtype: "role-manage",
    controller: "role-manage",
    viewModel: {
        type: "role-manage"
    },
    requires: [
    	'Wsitms.view.system.RoleController',
    	'Wsitms.view.system.RoleModel'
    ],
	layout:'vbox',//布局可以激活百分比
	items:[{
		title:'查询角色信息',
		xtype:'grid',
		style:'margin-top:2px',
		reference:'roleList',
		height:'50%',
		width:'100%',
		   bind:{
		       store:'{roleStore}'
		    	   },
		tbar:[{
			text:'新增',
			handler:'onAdd'
		},{
			text:'修改',
			handler:'onEdit'
		},{
			text:'设置角色权限',
			handler:'setAuthClick',
			glyph:0xf013
		}],
		columns:[{
			text:'角色ID',
			hidden:true,
			dataIndex:'ROLE_ID'
		},{
			text:'角色编号',
			dataIndex:'ROLE_CODE'
		},{
			text:'角色名称',
			dataIndex:'ROLE_NAME'
		},{
			text:'注释',
			dataIndex:'NOTE'
		}],
		listeners:{
			  rowclick:'rowclick',						  
		    },
		bbar:{
		    xtype:'pagingtoolbar',
    	    displayInfo:true,//显示信息
    	    displayMsg : '显示:{0}-{1}条,总共:{2}条',//显示格式,0表示start 1表示end 2表示total
    	    emptyMsg:'没有需要显示的数据' 
		},
		selModel:{
			selType:'checkboxmodel'
		}
	},{
		xtype:'grid',
		title:'查询角色模块信息',
		height:'50%',
		reference:'queryModInfo',
		width:'100%',
		features: [{ftype:'grouping'}],
		columns:[{
			text:'模块名称',
			dataIndex:'MODULENAME'
		},{
			text:'模块描述',
			dataIndex:'DESCRIBE'
		},{
			text:'模块组',
			dataIndex:'GROUPNAME'
		},{
			text:'有效',
			dataIndex:'VALID'
		},{
			text:'最后更新时间',
			dataIndex:'UPDATETIME'
		},{
			text:'注册人',
			dataIndex:'REGISTER'
		}]
	}],
	listeners:{
		afterlayout:{
			fn:'onAfterLayout',
			delay:1,
			single:true
		}
	}
	
});

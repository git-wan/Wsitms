Ext.define('Wsitms.view.base.StateRecord',{
	extend:'Ext.panel.Panel',
	xtype:'state-record',
	requires:[
		'Wsitms.view.base.StReModel',
		'Wsitms.view.base.StReController'
	],
	controller:'state-record',
	viewModel:{type:'state-record'},

	items:[{
		title:'实物列表',
		xtype:'treepanel',
		width:'100%',
		height:200,
		autoScroll:true,
		reference:'staterecord',
		//expanded: true,
		//bind:{store:'{entStore}'},
/*		 store:  {         root: {
		        expanded: true,
		        children: [
		            { text: 'detention', leaf: true },
		            { text: 'homework', expanded: true, children: [
		                { text: 'book report', leaf: true },
		                { text: 'algebra', leaf: true}
		            ] },
		            { text: 'buy lottery tickets', leaf: true }
		        ]
		    }
	},*/
/*		columns:[{
			xtype:'treecolumn',
			text:'分类代码',
			dataIndex:'text',
			
			width:300
		}],*/
		 rootVisible: true,
		  listeners:{
 			  rowclick:'stateRecordClick'
 		    }
	},{
		title:'一卡通DB1',
		xtype:'grid',
		autoScroll:true,
	    plugins: [
	        Ext.create('Ext.grid.plugin.CellEditing', {
	            clicksToEdit: 1, //设置单击单元格编辑	               
	        })
	        ],
		tbar:[{
			text:'保存状态',
			handler:'saveStatus'
		},{
			text:'重置',
			handler:''
		}],
		reference:'entProp',
		columns:[{
			text:'实物编码',
			dataIndex:'ENTITYNO'
		},{
			text:'实物编码',
			dataIndex:'ENTITYNAME',
			hidden:true
		},{
			text:'属性编号',
			dataIndex:'PROPERTYNO'
		},{
			text:'属性名称',
			dataIndex:'PROPERTYNAME'
		},{
			text:'属性值',
			dataIndex:'PROPERTYVALUE'
		},{
			text:'属性取值类型',
			dataIndex:'VALUETYPE'
		},{
			text:'数字值',
			dataIndex:'PROPERTYNUMBER',
			editor: 'textfield'
		},{
			text:'字符值',
			dataIndex:'PROPERTYCHAR',
			editor: 'textfield'
		},{
			text:'状态',
			dataIndex:'STATUS',
			editor: 'textfield'
		}]
	}],
	
    listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    }
})
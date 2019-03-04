Ext.define('Wsitms.view.report.schedule.List', {
	extend : 'Ext.grid.Panel',
	xtype : 'schedule',
	requires : [ 'Wsitms.view.report.schedule.Controller',
	],
	controller : 'schedule',
/*	 viewModel: {
	        type: "schedule"
	    },*/
/*		bind : {
			store : '{artStore}'
		},*/
	layout : 'fit',
	tbar : [ {
		text : '新增',
		handler : 'add'
	}],
	columns : [ {
		text : '工号',
		dataIndex : 'JOB_ID'
	}, {
		text : '姓名',
		dataIndex : 'ZX_NAME'
	}, {
		text : '1',
		dataIndex : 'TITLE'
	}, {
		text : '2',
		dataIndex : 'HITS'
	} ],
	
    dockedItems:[{
        xtype: 'toolbar', dock: 'top', hidden: true, reference: 'progressToolBar', items: [
            { xtype: 'progressbar', flex: 1 }
        ]
    }],
/*	listeners : {
		afterlayout : {
			fn : 'onAfterLayout',
			delay : 1,
			single : true 
		}
	},*/

})
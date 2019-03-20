Ext.define('Wsitms.view.assess.Asj', {
    extend: 'Ext.grid.Panel',
    xtype: 'asj',
    requires: [
        'Wsitms.view.assess.AsjController',
        'Wsitms.view.assess.AsjModel'
    ],
    controller: 'asj',
    viewModel: {type: 'asj'},
    layout: 'fit',
    autoScroll: true,
    title: '评定人员',
    bind: {store: '{asjStore}'},
    tbar: [{
        text: '新增',
        handler: 'onAdd'
    }, {
        text: '删除',
        handler: 'onDel'
    }, {
        text: '修改',
        handler: 'onEdit'
    }],
    columns: [{
        text: '评定人',
        dataIndex: 'ADJUSTER',
    }, {
        text: '评定对象',
        dataIndex: 'ASS_OBJECT'
    },{
			text:'评定组',
			dataIndex:'ASSGROUP'
		}],
    features: [{ftype: 'grouping'}],

    listeners: {
        afterlayout: {
            fn: 'onAfterLayout',
            delay: 1,
            single: true//只执行一次
        },
    },

})
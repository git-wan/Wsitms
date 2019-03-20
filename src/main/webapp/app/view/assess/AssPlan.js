Ext.define('Wsitms.view.assess.AssPlan', {
    extend: 'Ext.grid.Panel',
    xtype: 'assplan',
    requires: [
        'Wsitms.view.assess.AssPlanController',
        'Wsitms.view.assess.AssPlanModel'
    ],
    controller: 'assplan',
    viewModel: {type: 'assplan'},
    layout: 'fit',
    autoScroll: true,
    title: '评定人员',
    bind: {store: '{assplanStore}'},
    //border:1,
    frame: true,
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
        text: '评定计划名称',
        dataIndex: 'PLANNAME',
    }, {
        text: '评定负责人',
        dataIndex: 'HEADER'
    }, {
        text: '评定起始时间',
        dataIndex: 'STARTDATE'
    }, {
        text: '评定结束时间',
        dataIndex: 'ENDDATE'
    }, {
        text: '评定规则',
        dataIndex: 'RULENAME'
    }, {
        text: '评定组',
        dataIndex: 'OBJ_GROUP'
    }, {
        xtype: 'widgetcolumn',
        //width: 90,
        text: '操作',
        widget: {
            xtype: 'button',
            text: '评定',
            handler: 'onAss'
        }
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
Ext.define('Wsitms.view.assess.AssPlanForm', {
    extend: 'Ext.window.Window',
    xtype: 'assplan-window',
    height: 355,
    width: 300,
    bind: {
        title: '{title}'
    },
    autoScroll: true,
    modal: true, //模态框，开启遮罩
    items: {
        xtype: 'form',
        reference: 'assplan-form',
        margin: '10 0 0 0',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'ID',
            name: 'ID',
            reference: 'majorkey',
            hidden: true,

        }, {
            xtype: 'textfield',
            fieldLabel: '评定计划名称',
            name: 'PLANNAME',
            allowBlank: false,
        }, {
            xtype: 'datefield',
            fieldLabel: '评定开始日期',
            name: 'STARTDATE',
            format: 'Y-m-d',
            editable:false
        }, {
            xtype: 'datefield',
            fieldLabel: '评定结束日期',
            name: 'ENDDATE',
            format: 'Y-m-d',
            editable:false
        }, {
            xtype: 'textfield',
            fieldLabel: '评定负责人',
            name: 'HEADER',
            allowBlank: false,
        },{
            fieldLabel: '评定规则',
            xtype: 'combobox',
            name: 'RULENAME',
            allowBlank: false,
            displayField: 'ASSTYPE',
            valueField: 'ASSTYPE',
            bind:{store: '{assinfostore}'},
        }, {
            fieldLabel: '评定组',
            xtype: 'combobox',
            name: 'OBJ_GROUP',
            allowBlank: false,
            displayField: 'DEPARTMENT_NAME',
            valueField: 'DEPARTMENT_NAME',
            bind:{store: '{departnamestore}'},
        }],
    },
    buttons: [{
        text: '保存',
        handler: 'saveForm'
    }, {
        text: '返回',
        handler: 'closeForm'
    }],
})
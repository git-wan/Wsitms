Ext.define('Wsitms.view.assess.AssController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assess',
    requires: [
        'Wsitms.view.assess.AssScoForm'
    ],

    onAfterLayout: function () {
        this.getViewModel().getStore('assStore').load();
    },

    changeDate: function (object, newDate, oldDate, eOpts) {
        var me = this;
        var date = this.format(newDate, 'yyyy-MM');
        var store;
        store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            model: 'Assess',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/Wsitms/assess/queryDate?ASS_DATE=' + date + '&userName=' + encodeURI(userName)
                }
            }
        });
        var currdate = this.format(new Date(), 'yyyy-MM-dd');
        store.load({
            callback: function (reocrd, options, success) {
                me.getView().setStore(store);
            }
        })
    },

    //时间格式
    format: function (time, format) {
        var t = new Date(time);
        var tf = function (i) {
            return (i < 10 ? '0' : '') + i
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    },

    displayForm: function (record) {
        var view = this.getView(); //得到列表页
        this.dialog = view.add({
            xtype: 'ass-window',
            session: true,
            viewModel: {
                data: {
                    title: record ? '修改数据' : '添加数据',
                }
            }
        });
        if (record) {
            this.lookup('ass-form').loadRecord(record);
        }
        this.dialog.show();
    },

    onEdit: function () {
        var me = this;
        var data = me.getView().getSelectionModel().getSelection();
        var ASS_ID = data[0].get("ID");
        var ASS_OBJECT = data[0].get("ASS_OBJECT");
        var ADJUSTER = data[0].get("ADJUSTER");
        var PLANNAME = data[0].get("PLANNAME");
        var REMARK = data[0].get("REMARK");
        var number = data.length;
        if (number < 1) {
            Ext.Msg.alert('提示', '请选择一条数据');
            return false;
        }
        if(ADJUSTER!=userName){
            Ext.Msg.alert('提示', '你不是评定人，无法修改此数据');
            return false;
        }
        this.dialog = this.getView().add({
            xtype: 'asswindow',
            viewModel: {
                data: {
                    title: '评定修改',
                }
            }
        });
        var schForm = this.lookup('assform');
        var textfield = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'ASS_ID',
            value: ASS_ID,
            name: 'ASS_ID',
            hidden: true
        });
        var textfield0 = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'userName',
            value: userName,
            name: 'userName',
            hidden: true
        });
        var textfield1 = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'PLANNAME',
            value: PLANNAME,
            name: 'PLANNAME',
            hidden: true
        });
        var textfield2 = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'ASS_OBJECT',
            value: ASS_OBJECT,
            name: 'ASS_OBJECT',
            hidden: true
        });
        Ext.Ajax.request({
            url: '/Wsitms/assess/assInfo?ASS_ID=' + ASS_ID,
            success: function (response, opts) {
                var text = response.responseText;
                var assInfos = Ext.decode(text, true);
                if (assInfos) {
                    Ext.Array.each(assInfos, function (assInfo) {
                        var numberfield = Ext.create('Ext.form.field.Number', {
                            name: assInfo.ID,
                            fieldLabel: assInfo.SCOREGROUP,
                            value: assInfo.ASS_SCORE,
                            style: 'margin-left:20px',
                            allowBlank: false,
                            maxValue: assInfo.SC_PRICE,
                        })
                        var textarea = Ext.create('Ext.form.field.TextArea', {
                            fieldLabel: '评分细则',
                            value: assInfo.SCOREINFO,
                            style: 'margin-left:20px',
                            readOnly: true,
                            width: 500
                        });
                        schForm.items.add(numberfield);
                        schForm.items.add(textarea);
                        schForm.items.add(textfield);
                        schForm.items.add(textfield0);
                        schForm.items.add(textfield1);
                        schForm.items.add(textfield2);
                    });
                    var markarea = Ext.create('Ext.form.field.TextArea', {
                        fieldLabel: '评语',
                        name: 'REMARK',
                        style: 'margin-left:20px',
                        value: REMARK,
                        allowBlank: false,
                        width: 400
                    });
                    schForm.items.add(markarea);
                    me.dialog.show();
                }
            }
        });
    },

    queryInfo: function () {
        var me = this;
        var data = me.getView().getSelectionModel().getSelection();
        var number = data.length;
        if (number < 1) {
            Ext.Msg.alert('提示', '请选择一条数据');
            return false;
        }
        var ASS_ID = data[0].get("ID");
        var REMARK = data[0].get("REMARK");
        this.dialog = this.getView().add({
            xtype: 'asswindow',
            viewModel: {
                data: {
                    title: '评定明细',
                }
            }
        });
        var schForm = this.lookup('assform');
        this.lookup('saveform').hide();
        Ext.Ajax.request({
            url: '/Wsitms/assess/assInfo?ASS_ID=' + ASS_ID,
            success: function (response, opts) {
                var text = response.responseText;
                var assInfos = Ext.decode(text, true);
                if (assInfos) {
                    Ext.Array.each(assInfos, function (assInfo) {
                        var numberfield = Ext.create('Ext.form.field.Text', {
                            fieldLabel: assInfo.SCOREGROUP,
                            value: assInfo.ASS_SCORE,
                            style: 'margin-left:20px',
                            readOnly: true
                        })
                        var textarea = Ext.create('Ext.form.field.TextArea', {
                            fieldLabel: '评分细则',
                            value: assInfo.SCOREINFO,
                            style: 'margin-left:20px',
                            readOnly: true,
                            width: 500
                        })
                        schForm.items.add(numberfield);
                        schForm.items.add(textarea);
                    })
                    var markarea = Ext.create('Ext.form.field.TextArea', {
                        fieldLabel: '评语',
                        name: 'REMARK',
                        style: 'margin-left:20px',
                        value: REMARK,
                        readOnly: true,
                        width: 400
                    })
                    schForm.items.add(markarea);
                    me.dialog.show();
                }
            }
        });
    },

    resetForm: function () {
        this.lookupReference('departForm').reset();
    },

    SaveForm: function () {
        var me = this;
        var assForm = this.lookup('assform');
        /*var id = this.lookup('primary_id').getValue();*/
        var addUrl = '/Wsitms/assess/modAssSco';
        if (assForm.isValid()) {
            assForm.submit({
                url: addUrl,
                waitMsg: '正在提交数据',
                waitTitle: '提示',
                method: 'POST',
                success: function (form, action) {
                    Ext.Msg.alert('提交成功', action.result.msg);
                    me.getViewModel().getStore('assStore').load();
                    me.dialog = Ext.destroy(me.dialog);
                },
                failure: function (form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('提交失败', '不能使用无效值提交表单字段');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('提交失败', 'Ajax通信失败');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('提交失败', action.result.msg);
                    }
                }
            })
        }
    },

    closeForm: function () {
        this.dialog = Ext.destroy(this.dialog);
    }
})
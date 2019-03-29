Ext.define('Wsitms.view.assess.AsjController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.asj',
    requires: [
        'Wsitms.view.assess.AsjForm'
    ],
    onAfterLayout: function () {
        this.getViewModel().getStore('asjStore').load();
        this.getViewModel().getStore('departnamestore').load();
    },

    displayForm: function (record, name) {
        const view = this.getView(); //得到列表页
        this.isEdit = !!record;
        this.dialog = view.add({
            xtype: name,
            viewModel: {
                data: {
                    title: record ? '修改数据' : '添加数据'
                },
            }
        });
        if (record) {
            this.lookup('asj-form').loadRecord(record);
        }
        this.dialog.show();
    },

    onAdd: function () {
        var name = 'asj-window';
        this.displayForm(null, name);
    },
    onEdit: function () {
        var me = this;
        var data = me.getView().getSelectionModel().getSelection();
        var number = data.length;
        if (number < 1) {
            Ext.Msg.alert('提示', '请选择一条数据')
            return false;
        } else if (number == 1) {
            this.displayForm(data[0], 'asj-window');

        } else {
            Ext.Msg.alert('提示', '只能选择一条记录')
            return false;
        }
    },

    saveForm: function () {
        var assAsjForm = this.lookup('asj-form');
        var majorkey = this.lookup('majorkey');
        var url = null;
        if (assAsjForm != null) {
            if (majorkey.getValue() == '') {
                url = '/Wsitms/assess/addAssAsj';
            } else {
                url = '/Wsitms/assess/modAssAsj';
            }
            this.submitSave(assAsjForm, url);
        }
    },

    submitSave: function (formDate, url) {
        var me = this;
        if (formDate.isValid()) {
            formDate.submit({
                url: url,
                waitMsg: '正在提交数据',
                waitTitle: '提示',
                method: 'POST',
                success: function (form, action) {
                    Ext.Msg.alert('提交成功', action.result.msg);
                    me.getViewModel().getStore('asjStore').load();
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
    onDel: function () {
        var me = this;
        var data = me.getView().getSelectionModel().getSelection();
        var number = data.length;
        if (number < 1) {
            Ext.Msg.alert('提示', '请选择一条数据');
            return false;
        } else if (number == 1) {
            var id = data[0].get("ID");
            Ext.Msg.confirm("提示", "确定删除?", function (button, text) {
                if (button == "yes") {
                    Ext.Ajax.request({
                        url: '/Wsitms/assess/delAssAsj',
                        params: {
                            'ID': id
                        },
                        method:'GET',
                        success: function (response, opts) {
                            var respText = Ext.util.JSON.decode(response.responseText);
                            Ext.Msg.alert("信息提示", respText.msg);
                            me.getViewModel().getStore('asjStore').load();
                        },
                        failure: function (response, opts) {
                            var respText = Ext.util.JSON.decode(response.responseText);
                            Ext.Msg.alert("信息提示", respText.msg);
                        }
                    });
                }
            });
        } else {
            Ext.Msg.alert('提示', '只能选择一条记录')
            return false;
        }
    },
    closeForm: function () {
        this.dialog = Ext.destroy(this.dialog);
    },

})
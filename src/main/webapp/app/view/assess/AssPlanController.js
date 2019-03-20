Ext.define('Wsitms.view.assess.AssPlanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assplan',
    requires: [
        'Wsitms.view.assess.AssPlanForm',
        'Wsitms.view.assess.AssForm'
    ],
    onAfterLayout: function () {
        this.getViewModel().getStore('assplanStore').load();
        this.getViewModel().getStore('departnamestore').load();
        this.getViewModel().getStore('assinfostore').load();
    },


    displayForm: function (record, name) {
        var view = this.getView(); //得到列表页
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
            this.lookup('assplan-form').loadRecord(record);
        }
        this.dialog.show();
    },
    onAdd: function () {
        var name = 'assplan-window';
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
            this.displayForm(data[0], 'assplan-window');

        } else {
            Ext.Msg.alert('提示', '只能选择一条记录')
            return false;
        }
    },


    saveForm: function () {
        var assPlanForm = this.lookup('assplan-form');
        var majorkey = this.lookup('majorkey');
        var url = null;
        if (assPlanForm != null) {
            if (majorkey.getValue() == '') {
                url = '/Wsitms/assess/addAssPlan';
            } else {
                url = '/Wsitms/assess/modAssPlan';
            }
            this.submitSave(assPlanForm, url);
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
                    me.getViewModel().getStore('assplanStore').load();
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
            Ext.Msg.alert('提示', '请选择一条数据')
            return false;
        } else if (number == 1) {
            var id = data[0].get("ID");
            Ext.Msg.confirm("提示", "确定删除?", function (button, text) {
                if (button == "yes") {
                    Ext.Ajax.request({
                        url: '/Wsitms/assess/delAssPlan',
                        params: {
                            "ID": id
                        },
                        method: 'GET',
                        success: function (response, opts) {
                            var respText = Ext.util.JSON.decode(response.responseText);
                            Ext.Msg.alert("信息提示", respText.msg);
                            me.getViewModel().getStore('assplanStore').load();
                        },
                        failure: function (response, opts) {
                            var respText = Ext.util.JSON.decode(response.responseText);
                            Ext.Msg.alert("信息提示", respText.msg);
                        }
                    });
                }
            });
        } else {
            Ext.Msg.alert('提示', '只能选择一条记录');
            return false;
        }
    },
    closeForm: function () {
        this.dialog = Ext.destroy(this.dialog);
    },

    onAss: function (button) {
        var me = this;
        var selection = button.getWidgetRecord();
        var date = this.format(new Date(), 'yyyy-MM-dd');
        var sdate = selection.get('STARTDATE');
        var edate = selection.get('ENDDATE');
        var objgroup = selection.get('OBJ_GROUP');
        var PLANNAME = selection.get('PLANNAME');
        var RULENAME = selection.get('RULENAME');
        var flag = null;
        if (date >= sdate && date <= edate) {
            Ext.Ajax.request({
                url: '/Wsitms/assess/isAsj?OBJ_GROUP=' + encodeURI(objgroup) + '&userName=' + encodeURI(userName) + '&PLANNAME=' + encodeURI(PLANNAME),
                success: function (response, opts) {
                    var respText = Ext.util.JSON.decode(response.responseText);
                    flag = respText.msg;
                    if (flag == 1) {
                        Ext.Msg.alert("信息提示", '你不在此计划评定范围内');
                        return false
                    } else if (flag == 0) {
                        Ext.Msg.alert("信息提示", '操作异常');
                        return false
                    } else if (flag == 3) {
                        Ext.Msg.alert("信息提示", '已完成所有评定');
                        return false
                    }


                    var title = selection.get('PLANNAME');
                    me.dialog = me.getView().add({
                        xtype: 'ass-window',
                        viewModel: {
                            data: {
                                title: title,
                            }
                        }
                    });
                    var assForm = me.lookup("ass-form");
                    Ext.Ajax.request({
                        url: '/Wsitms/assess/getMonthAss?RULENAME=' + encodeURI(RULENAME),
                        success: function (response, opts) {
                            var text = response.responseText;
                            var assInfos = Ext.decode(text, true);
                            if (assInfos) {
                                Ext.Array.each(assInfos, function (assInfo) {
                                    var numberfield = Ext.create('Ext.form.field.Number', {
                                        fieldLabel: assInfo.SCOREGROUP,
                                        name: assInfo.ID,
                                        allowBlank: false,
                                        value: assInfo.SC_PRICE,
                                        maxValue: assInfo.SC_PRICE,
                                        style: 'margin-left:20px',
                                        minValue: 0
                                    })
                                    var textarea = Ext.create('Ext.form.field.TextArea', {
                                        fieldLabel: '评分细则',
                                        value: assInfo.SCOREINFO,
                                        style: 'margin-left:20px',
                                        readOnly: true,
                                        width: 500
                                    })
                                    assForm.items.add(numberfield);
                                    assForm.items.add(textarea);
                                })
                                var markarea = Ext.create('Ext.form.field.TextArea', {
                                    fieldLabel: '评语',
                                    name: 'REMARK',
                                    style: 'margin-left:20px',
                                    allowBlank: false,
                                    width: 400
                                })
                                assForm.items.add(markarea);
                            }
                            var store = Ext.create('Ext.data.Store', {
                                autoLoad: false,
                                model: 'Asj',
                                proxy: {
                                    type: 'ajax',
                                    api: {
                                        read: '/Wsitms/assess/getAsj?OBJ_GROUP=' + encodeURI(objgroup) + '&userName=' + encodeURI(userName) + '&PLANNAME=' + encodeURI(PLANNAME),
                                    }
                                }
                            });
                            me.lookup('ass_obj').setStore(store);
                            store.load({
                                callback: function (record, options, success) {
                                    me.dialog.show();
                                }
                            });
                            me.dialog.show()
                        }
                    })
                },
                failure: function (response, opts) {
                    var respText = Ext.util.JSON.decode(response.responseText);
                    Ext.Msg.alert("信息提示", '操作异常');
                }
            });


        } else {
            Ext.Msg.alert('提示', '不在评定时间内');
        }
    },

    saveAssForm : function() {
        var me = this;
        var assForm = this.lookup('ass-form');
        /*var id = this.lookup('primary_id').getValue();*/
        var addUrl = '/Wsitms/assess/addAss';
        if (assForm.isValid()) {
            assForm.submit({
                url : addUrl,
                waitMsg : '正在提交数据',
                waitTitle : '提示',
                method : 'POST',
                success : function(form, action) {
                    Ext.Msg.alert('提交成功', action.result.msg);
                    me.getViewModel().getStore('assStore').load();
                    me.dialog = Ext.destroy(me.dialog);
                },
                failure : function(form, action) {
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
})
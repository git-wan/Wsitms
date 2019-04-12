Ext.define('Wsitms.view.assess.AssRsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ass_result',
    requires: [
        'Wsitms.model.AssRs'
    ],

    onAfterLayout: function () {
        this.getViewModel().getStore('assResStore').load();
        this.getViewModel().getStore('planstore').load();
    },

    aa: function () {
        var newdate = this.lookup('queryDate').getValue();
        if (newdate == null) {
            Ext.Msg.alert('提示', '请选择导出时间');
            return false
        }
        var store = this.getView().getStore();
        var size = store.getTotalCount();
        if (size < 1) {
            Ext.Msg.alert('提示', '没有可导出数据');
            return false;
        }
        var date = this.format(newdate, 'yyyy-MM')
        var store = this.getView().getStore();
        var size = store.getTotalCount();
        if (size < 1) {
            Ext.Msg.alert('提示', '没有可导出数据');
            return false;
        }
        window.location.href = '/Wsitms/assess/assExcel?ASS_DATE=' + date + '&userName=' + encodeURI(userName)
    },
    assess:function(){

    },

    changePlan: function (field, newValue, oldValue, eOpts) {
        var me = this;
        var url = '/Wsitms/assess/AssResultList?' + encodeURI(field.name) + '=' + encodeURI(newValue)+'&userName=' + encodeURI(userName);
        // Ext.Ajax.request({
        //     url: url,
        //     success: function (response, opts) {
        //         Ext.Msg.alert('提示', response.result.msg);
        //         me.getViewModel().getStore('assResStore').load();
        //     },
        //     failure: function (response, opts) {
        //     }
        // });
        var store = Ext.create('Ext.data.Store', {
            autoLoad : false,
            model : 'AssRs',
            proxy : {
                type : 'ajax',
                api : {
                    read : url
                }
            }
        });
        this.getView().setStore(store);
        this.getView().getStore().load();
    }
});
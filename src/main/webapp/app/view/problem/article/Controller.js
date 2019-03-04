Ext.define('Wsitms.view.problem.article.Controller', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.article',
	requires : [ 'Wsitms.view.problem.article.Add' ],

	onAfterLayout:function(){
		this.getViewModel().getStore('artStore').load();	
	},
	add : function() {
		this.dialog = this.getView().add({
			xtype : 'article-form'
		})
		this.dialog.show()
	},
	onBeforeUpload : function(cmp, uploader, file) {
		var me = this,
			tb = me.lookupReference('progressToolBar'),
			progress = tb.down('progressbar');
		progress.setValue(0);
		progress.updateText(Ext.String.format('Uploading', file.name, 0));
		tb.show();
	},

	onUploadProgress : function(cmp1, uploader, filename, size, precent) {
		var me = this,
			tb = me.lookupReference('progressToolBar'),
			progress = tb.down('progressbar');
		progress.setValue(precent);
		progress.updateText(Ext.String.format('Uploading', filename, precent));
	},

	/*onFileUploaded : function(cmp, file, response) {
		var me = this,
			store = me.getStore('mediae');
		store.insert(0, response.data);
	},*/

	onUploadComplete : function() {
		var me = this,
			tb = me.lookupReference('progressToolBar');
		tb.hide();
		Ext.Msg.alert("提示", "上传成功")
	},


	onUploadError : function(uploader, data) {
		TOAST.toast(Ext.String.format('上传失败', data.file.name, data.status && data.status === 200 ? data.file.msg : data.message), this.getView().el);
	},

	onSorterToggle : function(cmp, btn, isPressed, eOpts) {
		btn.switch = true;
	},

	saveForm : function() {
		var me = this;
		var artForm = this.lookup('art-form');
		if (artForm.isValid()) {
			artForm.submit({
				url : '/Wsitms/question/addArt',
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					me.dialog = me.dialog.destroy();
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
	
    closeForm : function(){
   	 this.dialog = Ext.destroy(this.dialog);
    },
    
    resetForm:function(){
    	this.lookupReference('art-form').reset();    	
    },
})
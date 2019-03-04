Ext.define('Wsitms.view.problem.article.Add', {
	extend : 'Ext.window.Window',
	xtype : 'article-form',
	height : 650,
	width : 600,
	requires : [ 'Wsitms.ux.TinymcePlus' ],
	bind : {
		title : '{title}'
	},
	
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference:'art-form',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		items : [ {
			xtype : 'textfield',
			fieldLabel : '标题',
			name : 'TITLE',
			allowBlank : false,
			blankText : '标题不能为空',
			//msgTarget : 'side',

		}, {
			fieldLabel : '内容',
			xtype : 'tinymceplusfield',
			name:'CONTENT', 
			labelAlign : 'top',
			width : 500,
			maxLength : 4000,
			allowBlank : false,
			height : 600,
			//blankText : '标题不能为空',
			//msgTarget : 'side',
		} ],
	},
	buttons : [ {
		text : '保存',
		handler : 'saveForm'
	}, {
		text : '清空',
		handler : 'resetForm',
		reference : 'staffFormReset'
	}, {
		text : '返回',
		handler : 'closeForm'
	} ]
})
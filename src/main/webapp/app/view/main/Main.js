Ext.define('Wsitms.view.main.Main', {


	//1 继承某个组件
	extend: 'Ext.container.Container',
	//2 取别名,或者是xtype
	xtype: 'app-main',
	//3 引入类
	requires: [
		'Wsitms.view.main.MainController',
		'Wsitms.view.main.MainModel',
		'Wsitms.view.main.Header',
		'Wsitms.view.main.MainMenu',
		'Wsitms.view.main.ContentPanel'
	],

	//4 实例化controller，viewmodel
	controller: 'main',
	viewModel: 'main',
	//5 布局
	//renderTo:Ext.getBody(),
	layout: {
		type: 'border'
	},

	initComponent: function () {
		Ext.setGlyphFontFamily('FontAwesome');
		this.callParent();
	},


	items: [{
		region: 'north',
		xtype: 'topheader',

	}, {
		xtype: 'mainmenu',
		region: 'west',
		width: 250,
		split: true,

	}, {
		region: 'center',
		xtype: 'content-panel',

	}]



})
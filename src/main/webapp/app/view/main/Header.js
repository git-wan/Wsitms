Ext.define('Wsitms.view.main.Header', {
	//继承
	extend: 'Ext.toolbar.Toolbar',
	//别名
	xtype: 'topheader', //不要直接定义header等字
	//定义一个ID
	id: 'app-header',
	//标题
	title: '武商IT管理系统',
	//高度
	height: 60,
	//布局
	/*layout:{
		type:'hbox',
		align:'middle'
	},*/

	//引用
	requires: [
		//'Wsitms.view.main.HeaderMenu'
	],
	//定义控制器等
	viewModel: 'main',

	//模板方法
	initComponent: function () {
		document.title = this.title;
		this.items = [{
			id: 'app-header-logo',
			xtype: 'component'
		}, {
			id: 'app-header-title',
			xtype: 'component',
			bind: {
				html: '{systemInfo.appName}',
			},
		}, '->', {
			// cls:'app-user-name',  //选择器放在前面，样式才有效果
			xtype: 'component',
			html: userName,
		}, '-', {
			text: '用户菜单',
			glyph: 0xf007,
			menu: [{
				text: '修改密码',
				handler: 'editPass',
			}, '-', {
				text: '重新登录',
				handler: 'logAgain'
			}, '-', {
				text: '退出系统',
				handler: 'onClickQuit'

			}]
		}]


		this.callParent();

	}
})
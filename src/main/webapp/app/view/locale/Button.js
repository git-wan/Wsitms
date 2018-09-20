Ext.define('Wsitms.view.locale.Button', {
	extend: 'Ext.button.Split',
	xtype: 'locale-btn',
	requires: [
		'Wsitms.view.locale.Controller'
	],
	controller: 'locale-btn',
	menu: {
		xtype: 'menu',
		defaults: {
            xtype: 'menuitem',
            handler: 'onMenuItemClick'
		},
		items: [
			{
				iconCls: 'en_US',
				text: 'English'
			},
			{
				iconCls: 'zh_CN',
				text: '中文'
			}
		]
	}
});

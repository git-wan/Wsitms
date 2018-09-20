

 function loadLocale() {
	var lang = localStorage ? (localStorage.getItem('user-lang') || 'en_US') : 'en_US',
		file = Ext.util.Format.format('resources/locale/{0}.js', lang);
	Ext.Loader.loadScript({
		url: file,
		onError: function() {
			alert('Error loading locale file.');
		}
	});
	var extJsFile = Ext.util.Format.format('ext/locale/locale-{0}.js', lang);
	Ext.Loader.loadScript({
		url: extJsFile
	});
}

loadLocale();
Ext.define('Wsitms.Application',{
	extend:'Ext.app.Application',
	
	name:'Wsitms',
	

	

	
	
	/*  views: [
	        'Wsitms.view.login.Login'
	    ],*/
   // controllers:['Root'],
	
	init:function(){
	/*	var me =this;
		me.setDefaultToken('user-Manage')//默认页
		Ext.tip.QuickTipManager.init();//初始化
*/	
	},
	
	launch: function() {
	
	/*a.destroy()*/
	}
	
})
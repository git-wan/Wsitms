Ext.define('Wsitms.view.main.HeaderMenu',{
	extend:'Ext.container.Container',
	
		
   xtype:'headerMenu',
   
   id:'app-headerMenu',
   
   initComponent:function(){
	   
	   var menu=Ext.create('Ext.menu.Menu',{
		   items:[{
			   text:'风格',
			   menu:[{
				   text:"1",
				   group:'theme',
					checked:true   
					   
			   },{
				   text:"2",
					   group:'theme',
			   },{
				   text:"3",
					   group:'theme',   
			   }]
			   
		   },'-',{
			   text:'关于',
			   handler:'onClickAbout'	   
		   },'-',{
			   text:'退出',
			   handler:'onClickQuit'	   
		   }]
		   
	   })
	   
	   this.items=[{
		   xtype:'component',
		   cls:'app-header-menu',
		   margin: "0 5 0 0",
		   listeners:{
			   scope:this,
			   click:function(e){
				   menu.showBy(this);
			   },
			   element:'el'
		   }
	
	   }]
	   
	   this.callParent()
   }
})
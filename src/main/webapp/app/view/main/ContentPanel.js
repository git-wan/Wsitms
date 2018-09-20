Ext.define('Wsitms.view.main.ContentPanel',{
	extend:'Ext.tab.Panel',//tabpanel
	
	xtype:'content-panel',
	
	//title:'工作区',

	//glyph:0xf108,
	
	id:'content-panel',
	  requires :[
	    	'Ext.ux.TabReorderer'
	    ],
/*	header:{
		hidden:false
	},*/
   //   tabBarHeaderPosition:1,
      
      headerPosition:'top',//top right bottom left
      tabRotation: 'default', //default, 0, 1(旋转90), 2(旋转270)
      titleRotation : 'default', //default, 0, 1(旋转90), 2(旋转270)
      titleAlign : 'left', //center, left, right
      iconAlign : 'left' , //top , right, bottom, left
      
      
	   plugins : 'tabreorderer',
	   
	   
	   defaults:{
		   closable:true,
	   },
	   /*dockedItems:{
		   dock:'bottom',
		   items:[{
			   
			   text:'Test Bar',
		   }
			  
			   
			   
		   ],
		   xtype:'toolbar'
	   }*/
	   items:[{
		   xtype:'home-page',
	   }]
	   
})
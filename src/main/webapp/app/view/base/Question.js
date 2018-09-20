Ext.define("Wsitms.view.base.Question",{
    extend: "Ext.form.Panel",
	xtype: "questionPoint",


    frame:true,
    items:[{
    		xtype:'fieldset',
    		title:'问题记录',  		
    		margin:'0 10 0 10',   		
    		items:[{
    			layout:'column',  
    			items:[
    				{xtype:'combobox',fieldLabel:'*提问人',editable:false,style:'margin-left:20px'},
        			{xtype:'combobox',fieldLabel:'问题类型',editable:false,style:'margin-left:20px'},
        			{xtype:'combobox',fieldLabel:'应用系统',editable:false,margin:'10 0 0 20'},
    			]},{
    				layout:'column',
    				style:'margin-top:10px',
        			items:[
        				{xtype:'datefield',fieldLabel:'日期',style:'margin-left:20px'},
            			{xtype:'timefield',fieldLabel:'时间',editable:false,format:'H:i',style:'margin-left:20px'},
            			{xtype:'textfield',fieldLabel:'记录人',margin:'10 0 0 20'},
        		]},{
        			style:'margin-top:10px',
        			xtype:'textarea',
        			fieldLabel:'问题描述',
        			width:'100%'
        			}
    		       
    			]},
    	{
      		xtype:'fieldset',
    		title:'备注',
    		margin:'0 10 0 10',
    		//layout:'column',
    		items:[
    			{xtype:'checkboxfield',fieldLabel:'显示监控',boxLabel:'是'},
    			{xtype:'textarea',fieldLabel:'备注',width:'100%'},
    			]
    	}],
    	
    	buttons:[{
    		text:'提交',
    		
    	},{
    		text:'重置'
    	}]
   
        
    
});

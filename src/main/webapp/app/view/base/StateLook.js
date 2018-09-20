Ext.define('Wsitms.view.base.StateLook',{
    extend:'Ext.panel.Panel',
    xtype:'state-look',
    layout:'hbox',
    items:[{
        xtype:'grid',
        flex:3,
        frame:true,
        height:'100%',
        tbar:[{
        	text:'查看全部'
        }],
        columns:[{
        	text:'实物编号',
        	dataIndex:''
        },{
        	text:'实物名称',
        	dataIndex:''
        },{
        	text:'属性名称',
        	dataIndex:''
        },{
        	text:'属性备注',
        	dataIndex:''
        },{
        	text:'属性取值',
        	dataIndex:''
        },{
        	text:'属性数据值',
        	dataIndex:''
        },{
        	text:'状态',
        	dataIndex:''
        },{
        	text:'巡检时间',
        	dataIndex:''
        }],
        
        bbar:{
    	    reference:'grouppagingtoolbar',//查找组件 		
    	    xtype:'pagingtoolbar',
    	    displayInfo:true,//显示信息
    	    displayMsg : '显示:{0}-{1}条,总共:{2}条',//显示格式,0表示start 1表示end 2表示total
    	    emptyMsg:'没有需要显示的数据'   	
         }
        
    },{
    	flex:1,
    	height:'100%',
    	items:[{
    		xtype:'form',
    		frame:true,
    		margin:'0 5 0 5',
    		items:[{
    			xtype:'datefield',
    			fieldLabel:'起始日期:'
    		},{
    			xtype:'datefield',
    			fieldLabel:'终止日期',
    		},{
    			xtype:'textfield',
    			fieldLabel:'实物:'
    		},{
    			xtype:'textfield',
    			fieldLabel:'属性'
    		}],
    		buttons:[{text:'查询'}]
    	},{
    		xtype:'form',
    		margin:'5 5 0 5',
    		frame:true,
    		items:[{
    			xtype:'textfield',
    			fieldLabel:'温度计平均温度',
    			
    		},{
    			xtype:'textfield',
    			fieldLabel:'温度计平均湿度'
    		}]
    	}]
    }]


})
Ext.define('Wsitms.view.status.StateLook',{
    extend:'Ext.panel.Panel',
    xtype:'state-look',
    layout:'hbox',
    requires:[
		'Wsitms.view.status.StLoController'
	],
	controller:'state-look',
    items:[{
        xtype:'grid',
        flex:3,
        frame:true,
        height:'100%',
        reference:'entityStatus',
        tbar:[{
        	text:'查看全部'
        }],
        columns:[{
        	text:'实物编号',
        	dataIndex:'ENTITYNO'
        },{
        	text:'实物名称',
        	dataIndex:'ENTITYNAME'
        },{
        	text:'属性名称',
        	dataIndex:'PROPERTYNAME'
        },{
        	text:'属性值',
        	dataIndex:'PROPERTYVALUE'
        },{
        	text:'属性取值',
        	dataIndex:'PROPERTYCHAR'
        },{
        	text:'属性数据值',
        	dataIndex:'PROPERTYNUMBER'
        },{
        	text:'状态',
        	dataIndex:'STATUS'
        },{
        	text:'巡检时间',
        	dataIndex:'CYCLETIME',
        	flex:1
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
    		reference:'stateParams',
    		layout:{
    			type:'vbox',
    			align:'center'
    		},
    		items:[{
    			xtype:'datefield',
    			fieldLabel:'起始日期:',
    			margin:'10 0 10 0',
    			editable:false,
    			format:'Y-m-d',
    			name:'STRATDATE'
    		},{
    			xtype:'datefield',
    			fieldLabel:'终止日期',
    			editable:false,
    			format:'Y-m-d',
    			name:'ENDDATE'
    		},{
    			xtype:'combobox',
    			fieldLabel:'实物:',
    			name:'ENTITYNAME',
    			displayField: 'name',
				valueField:'abbr',
				reference:'allEntity'
    		},{
    			xtype:'combobox',
    			fieldLabel:'属性',
    			name:'PROPERTYNAME',
				displayField: 'name',
				valueField:'abbr',
				editable:false,
				store:{data:[{
					'abbr':'IpAddress','name':'IP地址'
				},{
					'abbr':'Temperature','name':'空调温度'
				},{
					'abbr':'Humidity','name':'空调湿度'
				},{
					'abbr':'ISDBCONNECT','name':'数据库连接'
				}]}
    		}],
    		buttons:[{text:'查询',handler:'queryStatus'}]
    	},{
    		xtype:'form',
    		margin:'5 5 0 5',
    		layout:{
    			type:'vbox',
    			align:'center'
    		},
    		frame:true,
    		items:[{
    			xtype:'textfield',
    			fieldLabel:'温度计平均温度',
    			margin:'10 0 10 0',
    			
    		},{
    			xtype:'textfield',
    			fieldLabel:'温度计平均湿度'
    		}]
    	}]
    }],

/*    listeners:{
	   afterlayout:{
		fn:'onAfterLayout',
		delay:1,
		single:true//只执行一次
	}
},*/
})
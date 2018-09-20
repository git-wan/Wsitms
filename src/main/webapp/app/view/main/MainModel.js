//绑定视图的数据
Ext.define('Wsitms.view.main.MainModel',{
	//继承
	extend:'Ext.app.ViewModel',
	
	//别名
	alias:'viewmodel.main',
	
	//绑定的数据
	data:{
		name:'a',
		
		systemInfo:{
			//应用程序的标题
			appName:'武商IT管理系统'
			
		},
		
		//功能分组
	
		
		
		
		leftMenu:{
			menuName:'系统菜单',
		/*	menuGroup:[{
				text:'基础信息',
				glyph:0xf0f7,
				description:'',
				menuItems:[
					
					{
						text:'收费点',
						module:'chargePoint',
						glyph:0xf108
					},{
						text:'停车区域',
						module:'depart-Manage',
						glyph:0xf108
					},{
						text:'停车时间',
						module:'role-Manage',
						glyph:0xf108
					},{
						text:'付款方式',
						module:'user-Manage',
						glyph:0xf108
					},{
						text:'收费规则',
						module:'role-Manage',
						glyph:0xf108
					},{
						text:'收费参数',
						module:'role-Manage',
						glyph:0xf108
					},
				]},{
				
				text:'收费管理',
				glyph:0xf0f7,
				description:'',					
					menuItems:[						
						{
							text:'解款录入',
							module:'menu-Manage',
							glyph:0xf108
						},{
							text:'解款查询',
							module:'menu-Manage',
							glyph:0xf108
						},]
				
			},{
				text:'固定车辆管理',
				glyph:0xf0f7,
				description:'',
				menuItems:[						
						{
							text:'车辆信息录入',
							module:'menu-Manage',
							glyph:0xf108
						},{
							text:'车辆信息查询',
							module:'menu-Manage',
							glyph:0xf108
						},]
			},{
				text:'夜间月租车',
				glyph:0xf0f7,
				description:'',
				menuItems:[						
					{
						text:'夜间月租车管理',
						module:'menu-Manage',
						glyph:0xf108
					},]
				
			},{
				text:'黑金卡管理',
				glyph:0xf0f7,
				description:'',
				menuItems:[						
					{
						text:'黑金卡查询',
						module:'menu-Manage',
						glyph:0xf108
					},	{
						text:'黑金卡计费查询',
						module:'menu-Manage',
						glyph:0xf108
					},]
			},{
				text:'车场管理',
				glyph:0xf0f7,
				description:'',
				menuItems:[						
					{
						text:'场内车辆查询',
						module:'menu-Manage',
						glyph:0xf108
					},{
						text:'车辆出入记录查询',
						module:'menu-Manage',
						glyph:0xf108
					},{
						text:'车流量查询',
						module:'menu-Manage',
						glyph:0xf108
					},]
				
			},{
				text:'人员管理',
				glyph:0xf0f7,
				description:'',
				menuItems:[						
					{
						text:'人员管理查询',
						module:'menu-Manage',
						glyph:0xf108
					}]
			},{
				text:'报表管理',
				glyph:0xf0f7,
				description:'',
				menuItems:[						
					{
						text:'计费报表',
						module:'menu-Manage',
						glyph:0xf108
					},{
						text:'实收报表',
						module:'menu-Manage',
						glyph:0xf108
					}]
			},{
				text:'系统管理',
				glyph:0xf0f7,
				description:'',
				menuItems:[						
					{
						text:'密码管理',
						module:'menu-Manage',
						glyph:0xf108
					},{
						text:'权限管理',
						module:'menu-Manage',
						glyph:0xf108
					},{
						text:'操作日志',
						module:'menu-Manage',
						glyph:0xf108
					}]
			},]*/
		}
	}
	
	
	
})
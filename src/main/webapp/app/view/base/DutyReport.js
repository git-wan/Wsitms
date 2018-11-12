Ext.define('Wsitms.view.base.DutyReport',{
	extend:'Ext.panel.Panel',
	xtype:'duty-report',
	requires:[
		'Wsitms.view.base.DutyReportController'
	],
	controller: 'duty-report',
	items:[{		
		xtype:'toolbar',
			items:['-',{				
				glyph:0xf044,
				text:'早间填报',
				handler:'morning'			
			},'-',{
				glyph:0xf044,
			    text:'晚间填报',
			    handler:'night',
			},'-',{				
				glyph:0xf044,
				text:'早间填报录入',
				handler:'morningInput'			
			},'-',{
				glyph:0xf044,
			    text:'晚间填报录入',
			    handler:'nightInput',
			}]
	
	}]
	
})
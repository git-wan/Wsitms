Ext.define('Wsitms.view.report.AseetReport', {
	extend : 'Ext.panel.Panel',
	xtype : 'aseetreport',
	id : 'aseet-report',
	requires : [
		'Wsitms.view.report.AseetReportController'
	],
	controller : 'aseetreport',
	items : [ {
		xtype : 'toolbar',
		items : [ '-', {
			glyph : 0xf044,
			text : '早间填报',
			handler : 'morning'
		}, '-', {
			glyph : 0xf044,
			text : '晚间填报',
			handler : 'night',
		}, '-', {
			glyph : 0xf044,
			text : '早间填报录入',
			handler : 'morningInput'
		}, '-', {
			glyph : 0xf044,
			text : '晚间填报录入',
			handler : 'nightInput',
		} ]
	} ]
})
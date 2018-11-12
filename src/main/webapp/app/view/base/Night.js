Ext.define('Wsitms.view.base.Night', {
	extend: 'Ext.window.Window',
	xtype: 'night-form',
	height: '395',
	title: '晚班录入',
	modal: true, //模态框，开启遮罩
	reference: 'nightWindow',
	autoScroll: true,
	items: [{
		xtype: 'form',
		reference: 'nightForm',
		items: [{
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '值班类型',
				name: 'DUTYTYPE',
				xtype: 'textfield',
				readOnly: true,
				hidden: true,
				reference: 'dutytype',
				value: '晚班',
			}, {
				fieldLabel: '日期',
				name: 'DATE_',
				xtype: 'datefield',
				format: 'Y-m-d',
				readOnly: true,
				value: new Date(),
			}, {
				fieldLabel: '时间',
				xtype: 'timefield',
				style: 'margin-left:30px',
				name: 'TIME_',
				format: 'H:i',
				readOnly: true,
				value: new Date(),
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '值班人',
				xtype: 'textfield',
				// margin:'10 0 0 0',
				name: 'WATCHER',
				value: userName
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: '网络设备',
				defaultType: 'radiofield',
				layout: 'hbox',
				style: 'margin-left:30px',
				items: [{
					boxLabel: '√',
					name: 'NETWORK_',
					inputValue: '√',
				}, {
					boxLabel: '×',
					name: 'NETWORK_',
					inputValue: '×',
				}]
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				xtype: 'fieldcontainer',
				fieldLabel: '服务器设备',
				defaultType: 'radiofield',
				//style:'margin-left:135px',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'SERVER',
					inputValue: '√',
				}, {
					boxLabel: '×',
					name: 'SERVER',
					inputValue: '×',
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: '监控报警',
				style: 'margin-left:139px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'CONTROL',
					inputValue: '√',
				}, {
					boxLabel: '×',
					name: 'CONTROL',
					inputValue: '×',
				}]
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '市电1电压',
				name: 'CITY1-V',
				xtype: 'textfield',
				regex: /^\d+(\.\d{1,2})?$/,
			}, {
				fieldLabel: '市电1频率',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'CITY1-H'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '市电2电压',
				name: 'CITY2-V',
				regex: /^\d+(\.\d{1,2})?$/,
				xtype: 'textfield'
			}, {
				fieldLabel: '市电2频率',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'CITY2-H'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: 'ups1电压',
				name: 'UPS1-V',
				regex: /^\d+(\.\d{1,2})?$/,
				xtype: 'textfield'
			}, {
				fieldLabel: 'ups1频率',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'UPS1-H'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: 'ups1负载率',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'UPS1-L',
				xtype: 'textfield'
			}, {
				fieldLabel: 'ups1机头提示',
				xtype: 'fieldcontainer',
				style: 'margin-left:29px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'UPS1-HINT',
					inputValue: '√',
				}, {
					boxLabel: '×',
					name: 'UPS1-HINT',
					inputValue: '×',
				}]
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: 'ups2电压',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'UPS2-V',
				xtype: 'textfield'
			}, {
				fieldLabel: 'ups2频率',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'UPS2-H'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: 'ups2负载率',
				name: 'UPS2-L',
				regex: /^\d+(\.\d{1,2})?$/,
				xtype: 'textfield'
			}, {
				fieldLabel: 'ups2机头提示',
				xtype: 'fieldcontainer',
				style: 'margin-left:29px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'UPS2-HINT',
					inputValue: '√',
				}, {
					boxLabel: '×',
					name: 'UPS2-HINT',
					inputValue: '×',
				}]
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: 'ups3电压',
				name: 'UPS3-V',
				regex: /^\d+(\.\d{1,2})?$/,
				xtype: 'textfield'
			}, {
				fieldLabel: 'ups3频率',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'UPS3-H'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: 'ups3负载率',
				name: 'UPS3-L',
				regex: /^\d+(\.\d{1,2})?$/,
				xtype: 'textfield'
			}, {
				fieldLabel: 'ups3机头提示',
				xtype: 'fieldcontainer',
				style: 'margin-left:29px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'UPS3-HINT',
					inputValue: '√',
				}, {
					boxLabel: '×',
					name: 'UPS3-HINT',
					inputValue: '×',
				}]
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '服务室1温度',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'SERVER1-C',
				xtype: 'textfield'
			}, {
				fieldLabel: '服务室1湿度',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'SERVER1-M'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '服务室2温度',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'SERVER2-C',
				xtype: 'textfield'
			}, {
				fieldLabel: '服务室2湿度',
				xtype: 'textfield',
				style: 'margin-left:30px',
				name: 'SERVER2-M'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '服务室3温度',
				name: 'SERVER3-C',
				regex: /^\d+(\.\d{1,2})?$/,
				xtype: 'textfield'
			}, {
				fieldLabel: '服务室3湿度',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'SERVER3-M'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '电源室温度',
				name: 'POWER-C',
				regex: /^\d+(\.\d{1,2})?$/,
				xtype: 'textfield'
			}, {
				fieldLabel: '电源室湿度',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'POWER-M'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '网络室温度',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'NET-C',
				xtype: 'textfield'
			}, {
				fieldLabel: '网络室湿度',
				xtype: 'textfield',
				style: 'margin-left:30px',
				regex: /^\d+(\.\d{1,2})?$/,
				name: 'NET-M'
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '办公区',
				xtype: 'fieldcontainer',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'OFFAREA',
					inputValue: '√',
					editable: false,
				}, {
					boxLabel: '×',
					name: 'OFFAREA',
					inputValue: '×',
				}]
			}, {
				fieldLabel: '茶水间',
				xtype: 'fieldcontainer',
				style: 'margin-left:139px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'TEAROOM',
					inputValue: '√',
					editable: false,
				}, {
					boxLabel: '×',
					name: 'TEAROOM',
					inputValue: '×',
				}]
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '洽谈室',
				xtype: 'fieldcontainer',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'DESTINE',
					inputValue: '√',
					editable: false,
				}, {
					boxLabel: '×',
					name: 'DESTINE',
					inputValue: '×',
				}]
			}, {
				fieldLabel: '更衣室',
				xtype: 'fieldcontainer',
				style: 'margin-left:139px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'LOCKROOM',
					inputValue: '√',
					editable: false,
				}, {
					boxLabel: '×',
					name: 'LOCKROOM',
					inputValue: '×',
				}]
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '服务器机房',
				xtype: 'fieldcontainer',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'MACROOM',
					inputValue: '√',
					editable: false,
				}, {
					boxLabel: '×',
					name: 'MACROOM',
					inputValue: '×',
				}]
			}, {
				fieldLabel: '网络机房',
				xtype: 'fieldcontainer',
				style: 'margin-left:139px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'NETROOM',
					inputValue: '√',
					editable: false,
				}, {
					boxLabel: '×',
					name: 'NETROOM',
					inputValue: '×',
				}]
			}]
		}, {
			layout: 'column',
			margin: '10 0 0 10',
			items: [{
				fieldLabel: '电源室',
				xtype: 'fieldcontainer',
				//style:'margin-left:139px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'POWROOM',
					inputValue: '√',
					editable: false,
				}, {
					boxLabel: '×',
					name: 'POWROOM',
					inputValue: '×',
				}]
			}, {
				fieldLabel: '会议室',
				xtype: 'fieldcontainer',
				style: 'margin-left:139px',
				defaultType: 'radiofield',
				layout: 'hbox',
				items: [{
					boxLabel: '√',
					name: 'CONROOM',
					inputValue: '√',
				}, {
					boxLabel: '×',
					name: 'CONROOM',
					inputValue: '×',
				}]
			}]
		}]
	}],
	buttons: [{
		text: '提交',
		handler: 'saveForm',

	}, {
		text: '重置',
		handler: 'resetForm',
	}, {
		text: '返回',
		handler: 'closeForm'
	}]
})
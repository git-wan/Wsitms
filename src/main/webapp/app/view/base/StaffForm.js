Ext.define('Wsitms.view.base.StaffForm',{
	extend:'Ext.window.Window',
	xtype:'staff-form',
	height:'250',
	width:400,
	bind:{
		title:'{title}'
	},
	modal:true,//模态框，开启遮罩
	items:{
	xtype:'form',
	reference:'staffForm',
    layout:{
    	type:'vbox',
    	align:'center'
    },
	items:[{
		xtype:'textfield',
		fieldLabel:'员工编号',
		name:'EMPLOYEE_CODE',
		allowBlank:false,
		blankText:'员工编号不能为空',
		msgTarget:'side',
		reference:'primary_id',
		bind:'{theStaff.id}'
	},{
		xtype:'textfield',
		fieldLabel:'员工姓名',
		name:'EMPLOYEE_NAME',
		allowBlank:false,
		blankText:'员工姓名不能为空',
		msgTarget:'side',//设置不符合验证的提示方式
		bind:'{theStaff.EMPLOYEE_NAME}'
	},{
		xtype:'combobox',
		fieldLabel:'实体代码',
		editable:false,
		name:'COMPANY_CODE',
		queryMode: 'loacl',//remote
	    valueField : 'COMPANY_CODE',  //传送的值
        displayField : 'COMPANY_NAME',  //UI列表显示的文本,
		bind:{store:'{companyStore}'},
		modal:true,
		allowBlank:false,
		blankText:'实体代码不能为空',
		msgTarget:'side',
		emptyText:'请选择',
		//shrinkWrap:1,
		  listConfig : {
	            maxHeight : 100,},
		autoScroll:true,
		reference:'combo-company',
	},{
		xtype:'combobox',
		fieldLabel:'部门代码',
		editable:false,
		name:'DEPARTMENT_CODE',
		queryMode: 'loacl',//remote
	    valueField : 'DEPARTMENT_CODE',  //传送的值
        displayField : 'DEPARTMENT_NAME',  //UI列表显示的文本,
		bind:{store:'{departStore}'},
		modal:true,
		allowBlank:false,
		blankText:'部门代码不能为空',
		msgTarget:'side',
		emptyText:'请选择',
		//shrinkWrap:1,
		listConfig : {
	            maxHeight : 100,},
		autoScroll:true,
		reference:'combo-company',
	}],
	},
	buttons:[{
		text:'保存',
		handler:'saveForm'
	},{
		text:'清空',
		handler:'resetForm',
		reference:'staffFormReset'
	},{
		text:'返回',
		handler:'closeForm'
	}]
})






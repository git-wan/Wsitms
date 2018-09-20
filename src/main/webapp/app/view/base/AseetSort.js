Ext.define('Wsitms.view.base.AseetSort',{
	extend:'Ext.tree.Panel',
	xtype:'aseet-sort',
	
	layout:'fit',
	title:'分类代码信息',
	store:{ root: {
        expanded: true,
        children: [
            { text: 'detention',name:'aaa',level:1, leaf: true },
            { text: 'homework', expanded: true,name:'bbb',level:1, children: [
                { text: 'book report',name:'ccc',level:2, leaf: true },
                { text: 'algebra',name:'xxx',level:2, leaf: true}
            ] },
            { text: 'buy lottery tickets',name:'sss',level:1, leaf: true }
        ]
    }},
    rootVisible: false,
	columns:[{
		xtype:'treecolumn',
		text:'分类代码',
		dataIndex:'text',
		
		width:300
	},{
		text:'分类名称',
		dataIndex:'name'
	},{
		text:'级次',
		dataIndex:'level'
	}]
})
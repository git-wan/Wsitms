Ext.define('Wsitms.view.problem.article.List', {
	extend : 'Ext.grid.Panel',
	xtype : 'article-list',
	requires : [ 'Wsitms.view.problem.article.Controller',
		'Wsitms.ux.Upload',
		'Wsitms.view.problem.article.Model'
	],
	controller : 'article',
	 viewModel: {
	        type: "article"
	    },
		bind : {
			store : '{artStore}'
		},
	layout : 'fit',
	tbar : [ {
		text : '新增',
		handler : 'add'
	}, {
		xtype : 'uploadbutton',
		tooltip : '上传',
		text:'上传',
		uploader : {
			runtimes : 'html5,flash,silverlight,html4',
			flash_swf_url : 'resources/js/Moxie.swf',
			silverlight_xap_url : 'resources/js/Moxie.xap',
			filters : {
				max_file_size : '10mb',
				mime_types : [
					{
						title : '图片',
						extensions : 'jpg,gif,png,jpeg'
					},
					{
						title : '音频',
						extensions : 'mp3,flac,wav'
					},
					{
						title : '视频',
						extensions : 'mp4,m4v,flv,mov'
					}
				]
			},
			url : '/Wsitms/question/upload',
			autoStart : true
		},
		listeners : {
			beforeupload : 'onBeforeUpload',
			uploadProgress : 'onUploadProgress',
			//fileuploaded : 'onFileUploaded',
			uploadcomplete : 'onUploadComplete',
			uploaderror : 'onUploadError'
		}
	} ],
	columns : [ {
		text : '编号',
		dataIndex : 'ART_ID'
	}, {
		text : '作者',
		dataIndex : 'AUTHOR'
	}, {
		text : '标题',
		dataIndex : 'TITLE'
	}, {
		text : '点击量',
		dataIndex : 'HITS'
	} ],
	
    dockedItems:[{
        xtype: 'toolbar', dock: 'top', hidden: true, reference: 'progressToolBar', items: [
            { xtype: 'progressbar', flex: 1 }
        ]
    }],
	listeners : {
		afterlayout : {
			fn : 'onAfterLayout',
			delay : 1,
			single : true 
		}
	},

})
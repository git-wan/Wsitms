Ext.define('Wsitms.view.assess.AssResModel',{
	extend:'Ext.app.ViewModel',
	alias: 'viewmodel.ass_result',
	requires:['Wsitms.model.AssRs'],	
	stores:{
		assResStore:{
			model:'AssRs',
			autoLoad:false,
			pageSize:0,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/assess/AssResultList?userName=' + encodeURI(userName)
				}
			}
		},
		planstore:{
			model:'AssRs',
			autoLoad:false,
			pageSize:0,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/assess/queryPlan?userName=' + encodeURI(userName)
				}
			}
		}

	}
});
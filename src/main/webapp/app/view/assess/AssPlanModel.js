Ext.define('Wsitms.view.assess.AssPlanModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.assplan',
    requires: [
        'Wsitms.model.AssPlan'
    ],
    stores: {
        assplanStore: {
            model: 'AssPlan',
            autoLoad: false,
            pageSize: 100,
            proxy: {
                type: 'ajax',
                api: {
                    read: '/Wsitms/assess/assplanList'
                }
            }
        },
        departnamestore: {
            model: 'Depart',
            autoLoad: false,
            pageSize: 100,
            proxy: {
                type: 'ajax',
                api: {
                    read: '/Wsitms/depart/depNameList'
                }
            }
        },
        assinfostore: {
            model: 'AssInfo',
            autoLoad: false,
            pageSize: 100,
            proxy: {
                type: 'ajax',
                api: {
                    read: '/Wsitms/assess/assInfoNameList'
                }
            }
        },
    }
})
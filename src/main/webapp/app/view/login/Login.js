Ext.define('Wsitms.view.login.Login', {
    extend: 'Ext.window.Window',
    requires: [
		'Wsitms.view.login.LoginController',
        'Wsitms.view.locale.Button',
	],
    xtype: 'login-win',
    controller: 'login-win',
    //id:'app-login',  id有毒，请慎用
    autoShow: true,
    
    layout: {
        type: 'fit'
    },
    iconCls: 'fa fa-key fa-lg',
    title: locale.login,
    closeAction: 'hide',
    closable: false,
    draggable: false,
    resizable: false,
    height: 200,
    width: 360,
    items: [
        {
            xtype: 'form',
            reference: 'form',
            bodyPadding: 15,

            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 70,
                allowBlank: false,
                msgTarget: 'side'
            },
            items: [
                {
                    name: 'USER_CODE',
                    fieldLabel: locale.userName,
                    minLength: 3,
                    maxLength: 25,
                    vtype: 'alphanum',
                    listeners: {
						specialKey: 'onUserNameEnterPress'
					}
                },
                {
                    inputType: 'password',
                    name: 'PASSWD',
                    fieldLabel: locale.password,
                    vtype: 'customPass',
                    enableKeyEvents: true,
					listeners: {
						specialKey: 'onPasswordEnterOrCapsLockPress',
						keypress: 'onPasswordKeyPress'
					}
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'locale-btn'
                        },
                        '->',
						{
                            xtype: 'button',
                            iconCls: 'fa fa-sign-in fa-lg',
                            text: locale.submit,
                            formBind: true,
                            handler: 'onSubmitButtonClick'
                        }
                    ]
                }
            ]
        }
    ],
    initComponent: function() {
       //Ext.getBody().addCls('user-login');
       this.callParent(arguments);
    },
    
});



Ext.apply(Ext.form.field.VTypes, {
    customPass: function(val, field) {
        return /^((?=.*\d).{6,20})/.test(val);//(?=.*[@#$%])  (?=.*[a-z])(?=.*[A-Z])
    },
    customPassText: locale.customPassText
});
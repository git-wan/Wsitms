Ext.define('Wsitms.view.login.LoginController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login-win',
/*	requires:['Wsitms.view.main.Main'],*/
	login: function() {
		var me =this;
		var sub_form=this.lookup('form');
		if (sub_form.isValid()) {
			sub_form.submit({  
			    url : "/Wsitms/user/login",  
			    waitMsg : '正在提交数据',  
			    waitTitle : '提示',  
			    method : "POST",  
			    success : function(form, action) {  
			        // 得到数据  
			        var result = Ext.util.JSON  
			                .decode(action.response.responseText);// 就可以取出来。如果是数组，那么很简单  
			       
		         if(result.success=='success'){
			        Ext.Msg.show({

			            title:"登录成功",

			            msg:"加载中",

			           // width:300,

			            wait:true,

			            waitConfig:{interval:1000,duration:1000,increment:1,fn:function () {//加载进度，1代表加载100%

			                Ext.Msg.hide();

			            }},

			            closable:true

			        });
			       
			        var task = new Ext.util.DelayedTask(function(){
			            //这里放置要延迟加载的代码段
			        	window.location.href='index.jsp';
			        });
			        task.delay(500);
			        
		         }
			    },  
			    failure : function(form, action) {  
					switch (action.failureType) {
    	            case Ext.form.action.Action.CLIENT_INVALID:
    	                Ext.Msg.alert('提交失败', '不能使用无效值提交表单字段');
    	                break;
    	            case Ext.form.action.Action.CONNECT_FAILURE:
    	                Ext.Msg.alert('提交失败', 'Ajax通信失败');
    	                break;
    	            case Ext.form.action.Action.SERVER_INVALID:
    	               Ext.Msg.alert('提交失败', action.result.msg);
			    } 
			    }
			});  
			
		}
	},

	onSubmitButtonClick: function(button, event) {
        this.login();
	},

	onUserNameEnterPress: function(field, event, eOpts) {
		if (event.getKey() === event.ENTER) {
			this.login();
		}
	},

	onPasswordEnterOrCapsLockPress: function(field, event, eOpts) {
		var me = this;
		if (event.getKey() === event.ENTER) {
			me.login();
		} else if (event.getKey() === event.CAPS_LOCK) {
			me.createCapsLockTip();
			if (!me.capslocktooltip.isVisible()) {
				me.capslocktooltip.showBy(field, 'bl', [70, 5]);
			} else {
				me.capslocktooltip.hide();
			}
		}
	},

	onPasswordKeyPress: function(field, event, eOpts) {
		var charCode = event.getCharCode(),
			me = this;
		if ((event.shiftKey && charCode >= 97 && charCode <= 122) ||
			(!event.shiftKey && charCode >= 65 && charCode <= 90)) {
			me.createCapsLockTip();
			if (!me.capslocktooltip.isVisible()) {
				me.capslocktooltip.showBy(field, 'bl', [70, 5]);
			}
		} else {
			if (me.capslocktooltip !== undefined && me.capslocktooltip.isVisible()) {
				me.capslocktooltip.hide();
			}
		}
	},

	createCapsLockTip: function() {
		var me = this;
		if (me.capslocktooltip === undefined) {
			me.capslocktooltip = Ext.create('Ext.tip.Tip', {
				alwaysOnTop: true,
				width: 130,
				html: '<div class="fa fa-exclamation-triangle"> ' + locale.capslocktooltip + '</div>'
			});
		}
	},
	
	init:function(){
		document.title="登录";
	}
});
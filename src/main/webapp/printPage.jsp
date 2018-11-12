<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		<meta charset="utf-8" />
		<title>早班打印</title>
		<link rel="icon" href="resources/css/images/wslogo.ico" type="image/x-icon"/>
		<meta name="description" content="overview & stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />	
		
		
		<script type="text/javascript">
		 var date=new Date;
         var year=date.getFullYear(); 
         var month=date.getMonth()+1;
         var day = date.getDay();
         month =(month<10 ? "0"+month:month); 
          day =(day<10 ? "0"+day:day); 
         var mydate = (year.toString()+month.toString()+day.toString());
		
		</script>
		<style type="text/css">		
		table{
     border-collapse: collapse;/* 边框合并属性  */
}
th{
     border: 1px solid #666666;
}
td{
     border: 1px solid #666666;
}		
		</style>
		
	</head>
<body>
<div id="zhongxin">
		  	
  
<table id="tableExcel" width="826" height="847"    border="1" align="center" cellspacing="0" cellpadding="0"    bordercolordark="#ffffff" bordercolorlight="#000000">
    <tr>
    <td align="center" colspan="22"><strong>资讯部值班日志表(早班)</strong></td>
  </tr>
   <tr>
    <td colspan="3">日期:</td>
    <td colspan="3">&nbsp;</td>
    <td colspan="3">时间</td>
    <td colspan="3">&nbsp;</td>
    <td colspan="2">值班人</td>
    <td colspan="5">&nbsp;</td>
  </tr>
  <tr>
    <td width="38" rowspan="3"><strong>8:00</strong></td>
    <td height="37" colspan="2">硬件检查</td>
    <td colspan="3">网络设备</td>
    <td colspan="4">aaa</td>
    <td colspan="4">服务器设备</td>
    <td colspan="3">&nbsp;</td>
  </tr>
  <tr>
    <td height="28" colspan="2">ip检查</td>
    <td colspan="3">服务器ip</td>
    <td colspan="4">&nbsp;</td>
    <td colspan="4">实体网关</td>
    <td colspan="3">&nbsp;</td>
  </tr>
  <tr>
    <td height="30" colspan="2">监控报警</td>
    <td colspan="14">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="8"><strong>9;00</strong></td>
    <td width="28" rowspan="5"><p>配</p>
    <p>电</p>
    <p>部</p>
    <p>分</p></td>
    <td width="70" height="28">市电1</td>
    <td width="62">电压</td>
    <td width="46">&nbsp;</td>
    <td colspan="2">频率</td>
    <td width="42">&nbsp;</td>
    <td width="44">市电2</td>
    <td colspan="2">电压</td>
    <td colspan="2">&nbsp;</td>
    <td colspan="2">频率</td>
    <td colspan="2">&nbsp;</td>
  </tr>
  
  <tr>
    <td width="70" rowspan="4">ups</td>
    <td height="34">机头号</td>
    <td>1</td>
    <td colspan="2">2</td>
    <td colspan="2">3</td>
    <td colspan="2">机头号</td>
    <td colspan="3">1</td>
    <td colspan="2">2</td>
    <td width="59">3</td>
  </tr>
  <tr>
    <td height="29">电压</td>
    <td>&nbsp;</td>
    <td colspan="2">&nbsp;</td>
    <td colspan="2">&nbsp;</td>
    <td colspan="2">使用负载率</td>
    <td colspan="3">&nbsp;</td>
    <td colspan="2">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="32">频率</td>
    <td>&nbsp;</td>
    <td colspan="2">&nbsp;</td>
    <td colspan="2">&nbsp;</td>
    <td colspan="2">ups机头指示</td>
    <td colspan="3">&nbsp;</td>
    <td colspan="2">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  
  <tr>
    <td height="38" colspan="14">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3"><p>空</p>
    <p>调</p>
    <p>部</p>
    <p>分</p></td>
    <td>服务器室1</td>
    <td height="42">温度</td>
    <td>&nbsp;</td>
    <td colspan="3">湿度</td>
    <td>&nbsp;</td>
    <td width="91">电源室</td>
    <td colspan="3">温度</td>
    <td width="73">&nbsp;</td>
    <td colspan="2">湿度</td>
    <td>&nbsp;</td>
  </tr>
  
  <tr>
    <td>服务器室2</td>
    <td height="40">温度</td>
    <td>&nbsp;</td>
    <td colspan="3">湿度</td>
    <td>&nbsp;</td>
    <td>网络室</td>
    <td colspan="3">温度</td>
    <td>&nbsp;</td>
    <td colspan="2">湿度</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="46">服务器室3</td>
    <td>温度</td>
    <td>&nbsp;</td>
    <td colspan="3">湿度</td>
    <td>&nbsp;</td>
    <td colspan="8">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4"><strong>9;30</strong></td>
    <td height="144" colspan="2" rowspan="4">web登录检查</td>
    <td height="47" colspan="2">一卡通服务器</td>
    <td height="47" colspan="4">&nbsp;</td>
    <td height="47" colspan="4">oA服务器</td>
    <td height="47" colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td height="40" colspan="2">会员服务器</td>
    <td height="40" colspan="4">&nbsp;</td>
    <td height="40" colspan="4">nc服务器</td>
    <td height="40" colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td height="39" colspan="2">供应链服务器</td>
    <td height="39" colspan="4">&nbsp;</td>
    <td height="39" colspan="4">人事服务器</td>
    <td height="39" colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td height="38" colspan="14">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="7"><strong>10:00</strong></td>
    <td height="150" colspan="2" rowspan="4">web登录检查</td>
    <td colspan="2">一卡通web</td>
    <td colspan="4">&nbsp;</td>
    <td colspan="4">OA邮件</td>
    <td colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="2">会员web</td>
    <td colspan="4">&nbsp;</td>
    <td colspan="4">财务nc</td>
    <td colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="2">供应链web</td>
    <td colspan="4">&nbsp;</td>
    <td colspan="4">人事系统</td>
    <td colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="2">合同系统</td>
    <td colspan="4">&nbsp;</td>
    <td colspan="4">投诉平台</td>
    <td colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td height="35" colspan="2">WiFi检查</td>
    <td colspan="2">武商APP</td>
    <td colspan="4">&nbsp;</td>
    <td colspan="4">私有云</td>
    <td colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td height="28" colspan="2">短信检查</td>
    <td colspan="14">&nbsp;</td>
  </tr>
  <tr>
    <td height="26" colspan="2">备份检查</td>
    <td colspan="14">&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3">&nbsp;</td>
    <td colspan="2">办公区</td>
    <td height="30" colspan="2">茶水间</td>
    <td height="30" colspan="3">洽谈室</td>
    <td height="30">更衣室</td>
    <td height="30">服务器机房</td>
    <td height="30" colspan="3">网络机房</td>
    <td height="30" colspan="2">电源室</td>
    <td height="30" colspan="2">会议室</td>
  </tr>
  <tr>
    <td colspan="2">&nbsp;</td>
    <td height="25" colspan="2">&nbsp;</td>
    <td height="25" colspan="3">&nbsp;</td>
    <td height="25">&nbsp;</td>
    <td height="25">&nbsp;</td>
    <td height="25" colspan="3">&nbsp;</td>
    <td height="25" colspan="2">&nbsp;</td>
    <td height="25" colspan="2">&nbsp;</td>
  </tr>
  <tr>
    <td height="33" colspan="16">&nbsp;</td>
  </tr>

  
 
</table>
<table width="826" height="30" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right"><button onClick="window.print()">打印</button>&nbsp; <button  type="button" onclick="exportExcel('tableExcel','','早班'+mydate+'.xlsx')"><a id="dlink" href="" style="display: none;"></a>导出Excel</button></td>
    
  </tr>
</table>
<hr/>
如果点打印按钮无反应,请用google 火狐等浏览器试试


</div>
		
		<div id="zhongxin2" class="center" style="display:none"><br/><br/><br/><br/><br/><img src="static/images/jiazai.gif" /><br/><h4 class="lighter block green">提交中...</h4></div>		
		<script type="text/javascript">
		//$(top.hangge());
		
		
		var idTmr;         
		function  getExplorer() {             
		var explorer = window.navigator.userAgent ;
		//ie             
		if (explorer.indexOf("MSIE") >= 0) {                 
		return 'ie';             
		}             
		//firefox             
		else if (explorer.indexOf("Firefox") >= 0) {                 
		return 'Firefox';            
		 }             
		 //Chrome             
		 else if(explorer.indexOf("Chrome") >= 0){                
		  return 'Chrome';            
		   }             
		   //Opera             
		   else if(explorer.indexOf("Opera") >= 0){                 
		   return 'Opera';             
		   }             
		   //Safari             
		   else if(explorer.indexOf("Safari") >= 0){                
		    return 'Safari';          
		       }      
		       }         
		  function exportExcel(tableid,name,filename) {            
		   if(getExplorer()=='ie'){                
		    var curTbl = document.getElementById(tableid);                
		    var oXL = new ActiveXObject("Excel.Application");                
		     var oWB = oXL.Workbooks.Add();                 
		     var xlsheet = oWB.Worksheets(1);                 
		     var sel = document.body.createTextRange();                 
		     sel.moveToElementText(curTbl);                 
		     sel.select();                 
		     sel.execCommand("Copy");                 
		     xlsheet.Paste();                 
		     oXL.Visible = true;                   
		      try {                     
		      var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");            
		           } catch (e) {                  
		              print("Nested catch caught " + e);             
		                  } finally {                 
		                      oWB.SaveAs(fname);               
		                      oWB.Close(savechanges = false);                
		                      oXL.Quit();                   
		                      oXL = null;                  
		                      idTmr = window.setInterval("Cleanup();", 1);          
		                      }                }             else             {              
		                         tableToExcel(tableid,name,filename)         
		                             }         }        
		                      function Cleanup() {            
		                       window.clearInterval(idTmr);           
		                       CollectGarbage();         }         
		                       var tableToExcel = (function() {            
		                        var uri = 'data:application/vnd.ms-excel;base64,',            
		                         //Excel样式代码        
		                             template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"'+    
		                             'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' 
		                             +'<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'   
		                             +'</x:ExcelWorkbook></xml><![endif]-->'+     
		                             ' <style type="text/css">'+       
		                             '.excelTable  {'+                    
		                             'border-collapse:collapse;'+       
		                             ' border:thin solid #999; '+                  
		                             '}'+                  
		                             '   .excelTable  th {'+       
		                             '   border: thin solid #999;'+        
                                     '  padding:20px;'+                     
                                     '  text-align: center;'+                
                                     '  border-top: thin solid #999;'+             
                                     ' background-color: #E6E6E6;'+                    
                                     ' }'+                   
                                     ' .excelTable  td{'+                 
                                     ' border:thin solid #999;'+                 
                                     '  padding:2px 5px;'+                 
                                     '  text-align: center;'+                 
                                     ' }</style>'+                     
                                     '</head><body ><table class="excelTable">{table}</table></body></html>',            
                                     base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },       
                                           format = function(s, c) {                   
                                                 return s.replace(/{(\w+)}/g,                
                                                            function(m, p) { return c[p]; }) }    
                                                                     return function(table, name,filename) {            
                                                                          if (!table.nodeType) table = document.getElementById(table)      
                                                                                     var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}         
                                                                                             document.getElementById("dlink").href = uri + base64(format(template, ctx));         
                                                                                                    document.getElementById("dlink").download = filename;           
                                                                                                         document.getElementById("dlink").click();            }         })()

		
		</script>
</body>
</html>
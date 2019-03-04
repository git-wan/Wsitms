<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">  
    <title>武商IT管理系统</title>
    <link rel="icon" href="resources/css/images/wslogo.ico" type="image/x-icon"/>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
    <link rel="stylesheet" type="text/css" href="resources/css/style.css">
    <link rel="stylesheet" type="text/css" href="resources/css/header.css">
	<link rel="stylesheet" type="text/css" href="resources/css/font-awesome.css">	
	<link rel="stylesheet" type="text/css" href="ext/theme-triton/resources/theme-triton-all.css">
    <script type="text/javascript" src="ext/ext-all.js"></script>
    <script type="text/javascript" src="ext/ux.js"></script>
    <script type="text/javascript" src="ext/json2.js"></script>
    <script type="text/javascript" src="resources/tinymce/tinymce.min.js"></script>
    <script type="text/javascript" src="resources\plupload\plupload.full.min.js"></script>
    <script type="text/javascript" src="ext/theme-triton/theme-triton.js"></script>
    <script type="text/javascript" src="app.js"></script>
    <script type="text/javascript" src="resources/time/MonthPicker.js"></script>
    
    <script type="text/javascript">
     var userName ='${user.USER_NAME}';
     var USER_ID='${user.USER_ID}'; 
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
  </head>
  
  <body>

  </body>
</html>

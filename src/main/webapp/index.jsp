<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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
    <script type="text/javascript" src="ext/theme-triton/theme-triton.js"></script>
    <script type="text/javascript" src="app.js"></script>
    <script type="text/javascript">
    var userName ='${user.USER_NAME}'   ;
     var USER_ID='${user.USER_ID}'; 
    </script>
  </head>
  
  <body>

  </body>
</html>

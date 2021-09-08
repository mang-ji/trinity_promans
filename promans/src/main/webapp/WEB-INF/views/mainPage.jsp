<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="resources/javascript/adminProject.js"></script>
<script type="text/javascript" src="resources/javascript/mainTemplate.js"></script>
<title>Insert title here</title>
 <script>
     function getProject(){
    	 let cpcode1 = document.getElementsByName("cpcode")[0];
    	 let userid1 = document.getElementsByName("userid")[0];
    	 let jsonData =[{cpcode:cpcode1.value, userid:userid1.value}];
    	 
         let clientData = JSON.stringify(jsonData);
    	 
    	 postAjax('rest/GetProject', clientData, 'getProject1', 2);
 
     }
     </script>
</head>
<body onLoad = "getProject()">


        <input type="hidden" name="utype" value="${utype}">
    	<input type="hidden" name="cpcode" value="${cpcode}">
    	<input type="hidden" name="userid" value="${userid}">
           <div id="getProject"></div>
</body>
</html>
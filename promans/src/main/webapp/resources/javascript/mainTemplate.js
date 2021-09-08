function projectOnLoad(){
       let adminProject = document.getElementById("adminProject");
       let project = document.getElementById("project");
       let adminMember = document.getElementById("adminMember");
       let utype = document.getElementsByName("utype")[0];
           
       if(utype.value == "G"){
              adminProject.style.display = "none";
              project.style.display = "block";
              adminMember.style.display = "none";
           }else{
              adminProject.style.display = "block";
              project.style.display = "none";
              adminMember.style.display = "block";
           }
           
    }

function getAjax(jobCode,clientData,fn){
	let ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function(){
	if(ajax.readyState==4 && ajax.status==200){
		
		window[fn](JSON.parse(ajax.responseText));
		
	}
}
	if(clientData != ""){
		jobCode += "?" + clientData;
	}
	alert(jobCode);
	ajax.open("GET", jobCode);
	ajax.send();
}


function postAjax(jobCode,clientData,fn,type){
      let ajax = new XMLHttpRequest();

      ajax.onreadystatechange = function() {
         if (ajax.readyState == 4 && ajax.status == 200) {
            const jsonData = ajax.responseText;
            window[fn](JSON.parse(jsonData));
         }
      };
      ajax.open("POST", jobCode);
	
	if(type==1){
	ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
	 }else if(type==2){
		ajax.setRequestHeader("content-type", "application/json");
	}
      ajax.send(clientData);
	
}
/*
function postAjax(jobCode, clientData, fn) {
      let ajax = new XMLHttpRequest();

      ajax.onreadystatechange = function() {
         if (ajax.readyState == 4 && ajax.status == 200) {
            const jsonData = ajax.responseText;

            window[fn](JSON.parse(jsonData));
         }
      };
      ajax.open("POST", jobCode);
      ajax.setRequestHeader("content-type", "application/json");
      ajax.send(clientData);

   }*/


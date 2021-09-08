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
	
	ajax.open("GET", jobCode);
	ajax.send();
}


function postAjax(jobCode,clientData,fn){
	let ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function(){
		
		if(ajax.readyState==4 && ajax.status==200){
			let jsonData = ajax.responseText;
			
			window[fn](JSON.parse(jsonData));
		}
	}
	
	ajax.open("POST",jobCode);
	ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
	ajax.send(clientData);
	
}
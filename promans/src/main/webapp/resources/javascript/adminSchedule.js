/* 업무 조회 */
function getSchedule(){
	
	postAjax('', clientData, getSchedule)
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
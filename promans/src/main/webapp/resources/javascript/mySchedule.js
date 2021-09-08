/* 내 업무 조회 */
function getMySchedule(userid){
	let sendJsonData = [];
	sendJsonData.push({uid: userid});
	let clientData = JSON.stringify(sendJsonData);
	postAjax('mySchedule/getMySchedule', clientData, 'getMySchedulelist');

}
/* cp, pr, ps userid, sdcode*/
function getMySchedulelist(jsonData){
	let data = '';
	for(i=0; i<data.length; i++){
		data 
	}
	
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
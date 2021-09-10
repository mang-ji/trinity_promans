/* 업무 조회 */
function getSchedule(){
	
	postAjax('', clientData, getSchedule)
}



function selectScheDetail(jsonData){ //업무 디테일 피드 조회하는 펑션.
	
	
	let list = "";
	let selectSD = document.getElementById("selectScheduleDetail");
	
	for(i=0; i<jsonData.length; i++){
		
	list += "<div>"+ jsonData[i].sdname + jsonData[i].sdcontent + jsonData[i].sddstate + jsonData[i].sddate + jsonData[i].username+"</div><br>";	
	}
	
	selectSD.innerHTML = list;
	
}

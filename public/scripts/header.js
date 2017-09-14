// Ugly but works for now
window.onload = initHome();

function initHome(){
	APICall("user",getUser);
}

function getUser(user){
	let userBox = $("user");
	userBox.innerHTML = user.name;
}

function APICall(request,f){
	var link = "/api/"+request;
	$.get(link, f);
}
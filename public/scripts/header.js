// Ugly but works for now
window.onload = let initHome = () => {
	APICall("user",getUser);
}

function getUser(user){
	let userBox = $("user");
	userBox.innerHTML = user.name;
}

function APICall(request,callback){
	let link = "/api/"+request;
	$.get(link, f);
}

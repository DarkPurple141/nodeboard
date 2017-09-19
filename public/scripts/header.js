let initHome = () => {
	APICall("user",getUser);
}

let getUser = (user) => {
	if(user.success){
		let userBox = $("#user")[0];
		userBox.innerHTML = user.name;
	}
}

let APICall = (request,callback) => {
	let link = "/api/"+request;
	$.get(link, callback);
}

// Ugly but works for now
window.onload = initHome();

// main app decleration
Vue.component('app', {
	template: `
		<div>
			<v-navbar></v-navbar>
			<div v-bind:style="background"></div>
			<div v-bind:style="loginPrompt">
				<h1 v-bind:style="title"> Nodeboard </h1>
				<hr v-bind:style="underline">
				<br>
				<div>
					<a href="/auth/facebook"><img v-bind:style="[connect]" src="/images/fb.png"/></a>
				</div>
			</div>
  	</div>`,
  data: function(){
  	let g = gradient("#84fab0","#8fd3f4");
		return {
			background: {
				background: g,
				position: "absolute",
				top:"0",
				bottom: "0",
				left: "0",
				right: "0",
				zIndex: "-1"
			},
			loginPrompt: {
				zIndex: "1",
				width: "20em",
				height: "25%",
				background: "white",
				position: "absolute",
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: "auto",
				marginBottom: "auto",
				left: "0",
				right: "0",
				top: "0",
				bottom: "0",
				textAlign: "center",
				boxShadow: "0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2)"
			},
			title: {
				paddingTop: "1em",
				color: "#002b36",
				fontSize: "2em",
				fontFamily: "Orbitron"
			},
			subtitle: {
				color: "rgba(44, 62, 80, 1)"
			},
			pushDown: {
				paddingTop: "5em"
			},
			connect: {
				paddingLeft: "1em",
				paddingRight: "1em"
			},
			underline: {
				width: "80%"
			},
			form: {
				width: "80%",
				marginLeft: "10%",
				marginTop: "5%"
			}
	  }
	}
});

function gradient(a,b){
	let	g = "-webkit-linear-gradient(left top, "+a+", "+b+") ";
	return g;
}
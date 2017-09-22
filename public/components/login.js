// main app decleration
Vue.component('app', {
  template: `
  	<div>
  		<div v-bind:style="background"></div>
			<div v-bind:style="loginPrompt">
				<h1 v-bind:style="title"> Nodeboard </h1>
				<hr v-bind:style="underline">
				<input v-bind:style="form" placeholder="Username" type="text" class="form-control"/>
				<input v-bind:style="form" placeholder="Password" type="password" class="form-control"/>
				<br>
				<div>
					<a href="/auth/facebook"><img v-bind:style="[connect]" src="/images/fb.png"/></a>
					<img v-bind:style="[connect]" src="/images/temp.png"/>
					<img v-bind:style="[connect]" src="/images/temp.png"/>
				</div>
			</div>
  	</div>`,
  data: function(){
		return {
			background: {
			  background: "#EBEBEB",
			  background: "-webkit-linear-gradient(left top, #84fab0, #8fd3f4)",
			  background: "-o-linear-gradient(bottom right, #84fab0, #8fd3f4)",
			  background: "-moz-linear-gradient(bottom right, #84fab0, #8fd3f4)",
			  background: "linear-gradient(to bottom right, #84fab0, #8fd3f4)",
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
				height: "20em",
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
				borderRight: "5px solid #84fab0",
				boxShadow: "0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2)"
			},
			title: {
				paddingTop: "0.5em",
				color: "#2c3e50"
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
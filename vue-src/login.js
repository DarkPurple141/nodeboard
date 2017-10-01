// main app decleration
Vue.component('app', {
	template: `
		<v-app light>
			<main>
				<section>
						<v-parallax src="/images/landing.png"  height="600">
							<v-layout column align-center justify-center>
								<h1 class="white--text orbit-font">Nodeboard</h1>
							<h4 class="white--text orbit-font">Boardgames Reimagined</h4>
						</v-layout>
					</v-parallax>
				</section>
				<section>
				
				</section>
			</main>
		</v-app>`,
	data: function(){
		return {
			title: "Nodeboard"
		};
	}
});
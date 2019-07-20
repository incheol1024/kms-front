"use strict";

Vue.use(Vuetify);
const serverUrl = "http://localhost:8089/login";

new Vue({
	data : () => ({
		name: '',
			password: '',
			loading : false
	}),
	methods: {
		async submit() {
			this.loading = true;
			let bodyFormData = new FormData();
			bodyFormData.set('username', this.name);
			bodyFormData.set('password', this.password);
			try{
				let response = await axios.post(serverUrl, bodyFormData);
				window.location.replace("/");
			}
			catch(e){
				alert("로그인 실패!!! 관리자에게 문의하세요." + JSON.stringify(error.response.data));
			}
			finally{
				this.loading = false;
			}
		}
	}
}).$mount('#login');
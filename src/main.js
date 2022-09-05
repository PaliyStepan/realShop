import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Maska from "maska";
import './assets/styles.scss';

const app = createApp(App);


app
	.use(store)
	.use(router)
	.use(Maska)
	.mount('#app');


app.config.globalProperties.$filters = {
	numberFormat(value) {
		return new Intl.NumberFormat().format(value);
	},
	pricePercent(price, percent) {
		return parseInt(price - price / 100 * percent )
	}
};



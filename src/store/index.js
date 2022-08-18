import { createStore } from 'vuex';
import products from "./products";
import preloader from "./preloader";

const store = {
	modules: {
		products,
		preloader
	},
	strict: process.env.NODE_ENV !== 'production'
};

export default createStore(store);

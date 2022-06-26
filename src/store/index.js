import { createStore } from 'vuex';
import axios from "axios";

export default createStore({
	state: {
	},
	mutations: {
		SET_PRODUCTS_TO_STATE(state, products) {
			state.products = products
		}
	},
	actions: {
		GET_PRODUCTS_FORM_API({commit}){
			axios.get('https://61d4952b8df81200178a8d8a.mockapi.io/test')
				.then(response => {
					commit('SET_PRODUCTS_TO_STATE', response.data)
				})
		}
	},
	modules: {
	},
	getters: {
		PRODUCTS(state){
			return state.products
		},
	}
})

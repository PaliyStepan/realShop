import axios from "axios";

const BASE_URL = 'https://61d4952b8df81200178a8d8a.mockapi.io/';

export default {
	namespaced: true,
	state: {
		products: null,
		product: null
	},
	getters: {
		ALL_PRODUCTS: state => state.products,
		ONE_PRODUCT: state => state.product
	},
	mutations: {
		SET_PRODUCTS_TO_STATE(state, products) {
			state.products = products
		},
		SET_ONE_PRODUCT_TO_STATE(state, product){
			state.product = product
		}
	},
	actions: {
		GET_PRODUCTS_FORM_API({commit}){
			axios.get(`${BASE_URL}test`)
				.then(response => {
					commit('SET_PRODUCTS_TO_STATE', response.data);
				})
		},
		GET_ONE_PRODUCT_FROM_API({commit}, payload) {
			axios.get(`${BASE_URL}test/${payload}`)
				.then(response => {
					commit('SET_ONE_PRODUCT_TO_STATE', response.data);
				})
				.catch(function (error) {
					commit('SET_ONE_PRODUCT_TO_STATE', undefined);
				})
		},
		CLEAR_PRODUCT({commit}) {
			commit('SET_ONE_PRODUCT_TO_STATE', null)
		}
	}
}

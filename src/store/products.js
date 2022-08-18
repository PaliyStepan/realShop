import axios from "axios";

export default {
	namespaced: true,
	state: {
		products: [],
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
			axios.get('https://61d4952b8df81200178a8d8a.mockapi.io/test')
				.then(response => {
					commit('SET_PRODUCTS_TO_STATE', response.data);
				})
		},
		GET_ONE_PRODUCT_FROM_API({commit}, payload) {
			axios.get(`https://61d4952b8df81200178a8d8a.mockapi.io/test/${payload}`)
				.then(response => {
					commit('SET_ONE_PRODUCT_TO_STATE', response.data);
					console.log(response.data)
				})
		},
		CLEAR_PRODUCT({commit}) {
			commit('SET_ONE_PRODUCT_TO_STATE', null)
		}
	}
}

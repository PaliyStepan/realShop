import axios from "axios";

import {BASE_URL} from './constants'

export default {
	namespaced: true,
	state: {
		items: []
	},
	getters: {
		CART: state => state.items,
		inCart: state => id => state.items.some(item => item.realId == id),
	},
	mutations: {
		SET_CART_TO_STATE(state, items){
			state.items = items
		},
		ADD_PRODUCT_TO_CART(state,id){
			state.items.push({ realId: id, cnt: 1 });
		}
	},
	actions: {
		GET_CART_FORM_API({commit}){
			axios.get(`${BASE_URL}cart`)
				.then(response => {
					if (response.data.length) {
						commit('SET_CART_TO_STATE', response.data)
					}
				})
		},
		ADD_TO_CART({ commit, getters, state },id){
			if(!getters.inCart(id)){
				axios.post(`${BASE_URL}cart`, {
					realId: id,
					cnt: 1
				}).then(commit('ADD_PRODUCT_TO_CART', id))
			}
		}
	}
}

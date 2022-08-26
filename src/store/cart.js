import axios from "axios";

import {BASE_URL} from './constants'

export default {
	namespaced: true,
	state: {
		items: []
	},
	getters: {
		CART: state => state.items,
		inCart: state => id => state.items.some(item => item.id === id),
	},
	mutations: {
		SET_CART_TO_STATE(state, items){
			state.items = items
		},
		ADD_PRODUCT_TO_CART(state,id){
			state.items.push({ id: id, cnt: 1 });
		},
		REMOVE_PRODUCT_FROM_CART(state,id){
			state.items = state.items.filter(item => item.id !== id);
		}
	},
	actions: {
		GET_CART_FORM_API({commit}){
			// axios.get(`${BASE_URL}cart`)
			// 	.then(response => {
			// 		if (response.data.length) {
			// 			commit('SET_CART_TO_STATE', response.data)
			// 		}
			// 	})

			axios.get(`http://localhost:3001/cart`)
				.then(response => {
					if (response.data.length) {
						commit('SET_CART_TO_STATE', response.data)
					}
				})
		},
		ADD_TO_CART({ commit, getters, state },id){
			// if(!getters.inCart(id)){
			// 	axios.post(`${BASE_URL}cart`, {
			// 		realId: id,
			// 		cnt: 1
			// 	}).then(commit('ADD_PRODUCT_TO_CART', id))
			// }
			if(!getters.inCart(id)){
				setTimeout(()=>{
					axios.post(`http://localhost:3001/cart`, {
						id: id,
						cnt: 1
					})
				},150)
					// .then(commit('ADD_PRODUCT_TO_CART', id))

				// commit('ADD_PRODUCT_TO_CART', id)
			}
		},
		REMOVE_FROM_CART({ commit, getters, state }, id) {
			// axios.delete(`http://localhost:3001/cart/${id}`)
							// .then(commit('ADD_PRODUCT_TO_CART', id))

			// commit('REMOVE_PRODUCT_FROM_CART', id)

			setTimeout(()=>{
				axios.delete(`http://localhost:3001/cart/${id}`)
			},150)

		}
	}
}

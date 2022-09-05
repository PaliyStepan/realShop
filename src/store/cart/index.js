import axios from "axios";

import {BASE_URL} from '../constants'

let items = window.localStorage.getItem('items');

export default {
	namespaced: true,
	state: {
		items: items ? JSON.parse(items) : [],
	},
	getters: {
		CART: state => state.items,
		inCart: state => id => state.items.some(item => item.id == id),
		CART_LENGTH: state => state.items.length,
		TOTAL:(state, getters) => {
			return getters.CART.reduce((t,i) => t + i.currentPrice * i.cnt, 0 )
		}
	},
	mutations: {
		SET_CART_TO_STATE(state, items){
			state.items = items
		},
		ADD_PRODUCT_TO_CART(state, payload){
			state.items.push({
				...payload,
				cnt: 1
			});
		},
		REMOVE_PRODUCT_FROM_CART(state,id){
			state.items = state.items.filter(item => item.id != id);
		},
		CLEAR_CART(state){
			state.items = [];
		},
		SAVE_TO_LOCAL_STORE(state){
			window.localStorage.setItem('items', JSON.stringify(state.items));
		},
		SET_CNT_TO_PRODUCT(state, {id, cnt}){
			let item = state.items.find(item => item.id == id);
			item.cnt = cnt
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
		ADD_TO_CART({ commit, getters, state },payload){
			if(!getters.inCart(payload.id)){
				commit('ADD_PRODUCT_TO_CART', payload);
				commit('SAVE_TO_LOCAL_STORE');
			}
		},
		REMOVE_FROM_CART({ commit}, id) {
			commit('REMOVE_PRODUCT_FROM_CART', id);
			commit('SAVE_TO_LOCAL_STORE');
		},
		SET_CNT({ commit, getters }, { id, cnt, rest }){
			let validCnt = Math.min(Math.max(cnt, 1), rest);
			commit('SET_CNT_TO_PRODUCT', { id, cnt: validCnt });
		},
		CLEAR_CART({commit}) {
			commit('CLEAR_CART');
			commit('SAVE_TO_LOCAL_STORE');
		}
	}
}

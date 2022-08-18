import axios from "axios";

export default {
	namespaced: true,
	state: {
		preloader: false
	},
	getters: {
		GET_PRELOADER: state => state.preloader
	},
	mutations: {
		PRELOADER_TOGGLE: state => state.preloader !== state.preloader
	},
	actions: {
	}
}

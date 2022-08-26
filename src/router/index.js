import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Product from "../views/Product";
import Error from "../views/Error";
import Cart from "../views/Cart";

const routes = [
	{
		name: 'home',
		path: '/',
		component: Home
	},
	{
		name: 'cart',
		path: '/cart',
		component: Cart
	},
	{
		name: 'product',
		path: '/product/:id',
		component: Product
	},
	{
		name: 'errorPage',
		component: Error,
		path: "/:catchAll(.*)"
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router

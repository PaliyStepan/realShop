<template>
	
	<div class="container">
		<div class="breadcrumbs">
			<div class="breadcrumbs__list">
				<div class="breadcrumbs__item">
					<router-link to="/" class="breadcrumbs__link">
						Назад
					</router-link>
				</div>
			</div>
		</div>
		<Preloader v-if="!hasProduct"/>
		<div class="product" v-else v-cloak>
			<div class="product__row">
				<div class="product__left">
					<img :src="product.images[0]" alt="" class="">
				</div>
				<div class="product__right">
					{{product.name}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios';
	import router from '../router';
	import Preloader from "../components/Preloader/Preloader";
	import {mapGetters, mapActions} from 'vuex';
	
	export default {
		name: "ProductPage",
		components: {
			Preloader
		},
		data: () => ({

		}),
		computed:{
			...mapGetters('products', {product: 'ONE_PRODUCT'}),
			id(){
				return parseInt(this.$route.params.id);
			},
			hasProduct(){
				return this.product !== null
			}
			
		},
		methods:{
			...mapActions('products', ['GET_ONE_PRODUCT_FROM_API']),
			...mapActions('products', ['CLEAR_PRODUCT']),
		},
		mounted() {
			this.GET_ONE_PRODUCT_FROM_API(this.id);
		},
		beforeUnmount(){
			this.CLEAR_PRODUCT();
		}
	}
</script>

<style lang="scss">
	
	.product {
		
		&__row {
			 display: flex;
			 flex-wrap: wrap;
		}
		
		&__left {
			flex: 0 0 30%;
			
			img {
				width: auto;
				max-width: 100px;
			}
		}
		
		
		
		&__right {
			flex: 0 0 70%;
		}
	}
</style>

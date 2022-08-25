<template>
	
	<div class="container">
		
		<AppPreloader v-if="product === null"/>
		<div v-else-if="product === undefined">
			Такого продукта нет, вернитесь в
			<app-link
				title="каталог"
				to="/"
			/>
		</div>
		<div class="product" v-else>
			
			<div class="product__top">
				<app-link
					title="Назад"
					to="/"
				/>
			</div>
			<div class="product__title">
				{{product.name}}
			</div>
			<div class="product__row">
				<div class="product__left">
					<app-slider
						:slides="product.images"
						:slides-per-view="1"
						:space-between="20"
						:thumbs-per-view="3"
						:thumbs-space-between="20"
						:title="product.name"
					/>
				</div>
				<div class="product__right">
				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	import router from '../router';
	import AppPreloader from "../components/Preloader/Preloader";
	import AppLink from "../components/Link/Link";
	import AppIcon from "../components/Icon/Icon";
	import AppSlider from "../components/Slider/Slider";
	import {mapGetters, mapActions} from 'vuex';

	
	export default {
		name: "ProductPage",
		components: {
			AppPreloader,
			AppLink,
			AppIcon,
			AppSlider
		},
		computed:{
			...mapGetters('products', {productFromApi: 'ONE_PRODUCT'}),
			id(){
				return parseInt(this.$route.params.id);
			},
			product(){
				return this.productFromApi
			},
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
	
	@import "../../src/assets/variables";
	
	.product {
		&__top {
			margin-bottom: 60px;
			.link {
				font-size: 18px;
			}
		}
		
		&__title {
			margin-bottom: 40px;
			font-size: 40px;
			line-height: 46px;
		}
		
		&__row {
			 display: flex;
			 flex-wrap: wrap;
		}
		
		&__left {
			width: 30%;
			
		}
		
		&__right {
			flex: 0 0 70%;
		}
	}
</style>

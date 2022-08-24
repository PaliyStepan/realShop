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
					
					<swiper
						:slides-per-view="1"
						:space-between="20"
						:loop="false"
						:thumbs="{ swiper: thumbsSwiper }"
						class="swiper-main"
					>
						<swiper-slide
							v-for="(slide, index) in product.images"
							:key="index"
						>
							<img
								:src="slide"
								:alt="product.name"
								class="swiper-slide__img"
							>
						</swiper-slide>
					</swiper>
					
					<div class="slider">
						<swiper
							:slides-per-view="3"
							:space-between="20"
							:loop="false"
							@swiper="setThumbsSwiper"
							:navigation="{
							prevEl: '.swiper-button--left',
							nextEl: '.swiper-button--right',
						}"
							class="swiper-thumbs"
						>
							
							<swiper-slide
								v-for="(slide, index) in product.images"
								:key="index"
							>
								<img
									:src="slide"
									:alt="product.name"
									class="swiper-slide__img"
								>
							</swiper-slide>
						</swiper>
						<div class="swiper-button swiper-button--left">
							<app-icon name="arrow-left"/>
						</div>
						<div class="swiper-button swiper-button--right">
							<app-icon name="arrow-right"/>
						</div>
					</div>
					
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
	import {mapGetters, mapActions} from 'vuex';
	import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
	import SwiperCore, {Navigation, Thumbs} from 'swiper';
	
	import 'swiper/swiper.min.css'

	SwiperCore.use([Navigation, Thumbs]);
	
	export default {
		name: "ProductPage",
		components: {
			AppPreloader,
			AppLink,
			AppIcon,
			Swiper,
			SwiperSlide,
		},
		data: () => ({
			thumbsSwiper: null
		}),
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
			setThumbsSwiper(swiper){
				this.thumbsSwiper = swiper;
			},
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
	
	.swiper-main {
		
		margin-bottom: 40px;
		
		
		.swiper-slide {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #ddd;
			border-radius: 4px;
			height: 400px;
			padding: 40px;
		}
		
		.swiper-slide__img {
			width: auto;
			max-width: 100%;
			max-height: 100%;
			object-fit: cover;
		}
	}
	
	
	.slider {
		display: flex;
		align-items: center;
	}
	
	.swiper-thumbs {
		order: 1;
		margin-left: 20px;
		margin-right: 20px;
		
		.swiper-wrapper {
			box-sizing: border-box;
		}
		
		.swiper-slide {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 90px;
			box-sizing: border-box;
			position: relative;
			cursor: pointer;
			
			&:hover {
				@media (hover: hover) {
					&:before {
						border-color: $green;
					}
				}
			}
			
			&:before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				transition: border 0.3s ease;
				border: 1px solid #ddd;
				border-radius: 4px;
				pointer-events: none;
			}
			
			&.swiper-slide-thumb-active {
				
				&:before {
					border-color: $green;
					border-width: 2px;
				}
			}
		}
		
		.swiper-slide__img {
			max-width: 100%;
			max-height: 100%;
			object-fit: cover;
		}
		
		
	}
	
	.swiper-button {
		min-width: 30px;
		height: 30px;
		border: 1px solid transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		
		&:first-of-type {
			order: 0;
		}
		
		&:last-of-type {
			order: 2;
		}
		
		.icon {
			width: 24px;
			height: 24px;
		}
		
		&.swiper-button-disabled {
			pointer-events: none;
			opacity: 0.4;
		}
		
		&:hover {
			border-color: #ddd;
		}
		
		&--left {
			order: 0;
		}
		&--right {
			order: 2;
		}
	}
	
	

</style>

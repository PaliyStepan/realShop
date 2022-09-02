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
					<div class="product__brand">
						Бренд: {{product.brand}}
					</div>
					<div class="product__price">
						<template v-if="hasSale">
							<div class="product__price-current">
								{{ $filters.numberFormat($filters.pricePercent(product.price,product.sale)) }} руб.
							</div>
							<div class="product__price-strike">
								{{ $filters.numberFormat(product.price) }} руб.
							</div>
							<app-label>
								- {{product.sale}} %
							</app-label>
						</template>
						<div v-else>
							<div class="product__price-current">
								{{ $filters.numberFormat(product.price) }} руб.
							</div>
						</div>
					</div>
					
					<div class="product__available">
						Осталось
						{{product.availability}}
					</div>
					<div  v-if="!hasAvailability">
						<transition name="fade" mode="out-in">
							<router-link
									to="/cart"
									v-if="inCart(product.id)"
									class="catalog-item__button"
							>
								<app-button
										title="Перейти в корзину"
										kind="bordered"
								/>
							</router-link>
							<app-button
								title="Добавить"
								@click="ADD_TO_CART({
								id: +product.id,
								name:product.name,
								currentPrice: hasSale ? $filters.pricePercent(product.price,product.sale) : product.price,
								image: product.images[0],
								rest: product.availability
							})"
									v-else
							> </app-button>
						</transition>
					</div>
					<div v-else>
						Продукт закончился
					</div>
					<div class="product__desc">
						<p v-for="desc in product.desc">
							{{desc}}
						</p>
					</div>
				</div>
			</div>
			<div class="product__bottom">
				<app-tabs :list="product.char" />
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
	import AppButton from "../components/Button/Button";
	import AppLabel from "../components/Label/Label";
	import AppTabs from "../components/Tabs/Tabs";
	import {mapGetters, mapActions} from 'vuex';

	
	export default {
		name: "ProductPage",
		components: {
			AppPreloader,
			AppLink,
			AppIcon,
			AppSlider,
			AppButton,
			AppLabel,
			AppTabs
		},
		computed:{
			...mapGetters('products', {productFromApi: 'ONE_PRODUCT'}),
			...mapGetters('cart', [ 'inCart' ]),
			id(){
				return parseInt(this.$route.params.id);
			},
			product(){
				return this.productFromApi
			},
			hasSale(){
				return this.product.sale > 0
			},
			hasAvailability(){
				return this.product.availability === 0;
			},
		},
		methods:{
			...mapActions('products', ['GET_ONE_PRODUCT_FROM_API']),
			...mapActions('products', ['CLEAR_PRODUCT']),
			...mapActions('cart',[ 'ADD_TO_CART' ])
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
			width: 70%;
			padding-left: 40px;
		}
		
		&__brand {
			font-size: 20px;
			line-height: 24px;
			margin-bottom: 18px;
		}
		
		&__price {
			display: flex;
			flex-wrap: wrap;
		}
		
		&__price-current {
			font-size: 36px;
			line-height: 40px;
			font-weight: 600;
			width: 100%;
			order: 2;
			margin-bottom: 20px;
		}
		
		&__price-strike {
			text-decoration: line-through;
			color: #ccc;
			font-weight: 400;
			font-size: 20px;
			line-height: 24px;
			margin-bottom: 8px;
		}
		
		.label {
			margin-left: 20px;
		}
		
		&__desc {
			margin-top: 60px;
			p {
				font-family: Verdana;
			}
		}
		
		&__bottom {
			margin-top: 80px;
		}
		
		&__available {
			margin-bottom: 20px;
		}
		
		.button {
			min-width: 200px;
		}
	}
</style>

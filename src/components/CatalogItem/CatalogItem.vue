<template>
	<div
		class="catalog-item"
		:class="classNames"
	>
		{{product.title }}
		<router-link class="catalog-item__link" :to="{ name:'product', params: {id:product.id}}">
			<div class="catalog-item__img-wrap">
				<img :src="product.images[0]" alt="" class="catalog-item__img">
			</div>
			<div class="catalog-item__title">
				{{product.name}}
			</div>
		</router-link>
		<div class="catalog-item__price">
			<template v-if="hasSale">
				<div class="catalog-item__price-current">
					{{ $filters.numberFormat($filters.pricePercent(product.price,product.sale)) }} руб.
				</div>
				<div class="catalog-item__price-strike">
					{{ $filters.numberFormat(product.price) }} руб.
				</div>
				<app-label>
					- {{product.sale}} %
				</app-label>
			</template>
			<div v-else>
				<div class="catalog-item__price-current">
					{{ $filters.numberFormat(product.price) }} руб.
				</div>
			</div>
		</div>
		<div class="catalog-item__buttons" v-if="!hasAvailability">
			<transition name="fade" mode="out-in">
				<div class="catalog-item__add" v-if="inCart(product.id)">
					<router-link
						to="/cart"
						class="catalog-item__button"
					>
						<app-button
							title="Перейти в корзину"
							kind="bordered"
						/>
					</router-link>
					
					<app-button
						size="square"
						kind="bordered"
						@click="REMOVE_FROM_CART(+product.id)"
					>
						<app-icon name="trash"/>
					</app-button>
				</div>
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
		<div class="catalog-item__empty" v-else>
			<p>
				Товар закончился
			</p>
		</div>
	</div>
</template>

<script>
	
	import AppButton from "../Button/Button";
	import AppLabel from "../Label/Label";
	import AppIcon from "../Icon/Icon";
	
	import {mapActions, mapGetters} from "vuex";
	
	
	export default {
		name: "CatalogItem",
		props: ['product'],
		components:{
			AppButton,
			AppLabel,
			AppIcon
		},
		data:()=>({
			some: false
		}),
		methods: {
			...mapActions('cart',['ADD_TO_CART','REMOVE_FROM_CART'])
		},
		computed: {
			...mapGetters('cart', [ 'inCart' ]),
			classNames(){
				return {
					'catalog-item--empty' : this.hasAvailability
				}
			},
			hasAvailability(){
				return this.product.availability === 0;
			},
			hasSale(){
				return this.product.sale > 0
			}
		}
	}
</script>

<style lang="scss">
	
	@import "../../assets/variables";
	
	.catalog-item {
		position: relative;
		display: flex;
		flex-direction: column;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 32px;
		transition: box-shadow 0.3s ease;
		height: 480px;
		
		&:hover {
			box-shadow: 0 5px 25px rgba(30,31,33,.12);
		}
		
		
		&__link {
			width: 100%;

			color: $dark;
			text-decoration: none;
			
			&:hover {
				text-decoration: underline;
			}
		}
		
		&__img-wrap {
			position: relative;
			width: 200px;
			height: 200px;
			margin: 0 auto 40px;
		}
		
		
		&__img {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			width: 100%;
			height: 100%;
			object-fit: contain;
			
			/*height: 200px;*/
			/*width: auto;*/
			/*max-width: 100%;*/
			/*object-fit: cover;*/
		
		}
		
		
		&__title {
			font-size: 20px;
			line-height: 26px;
			margin-bottom: 20px;
			text-align: left;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
		
		&__price {
			display: flex;
			align-items: flex-end;
			width: 100%;
			font-weight: 700;
			margin-bottom: 10px;
		}
		
		&__available {
			width: 100%;
			
			margin-bottom: 15px;
		}
		
		
		.button {
			align-self: flex-start;
		}
		
		&__button {
			text-decoration: none;
			align-self: flex-start;
		}
		
		.label {
			position: absolute;
			left: 10px;
			top: 10px;
			transform: rotate(-10deg);
		}
		
		&__price-strike {
			text-decoration: line-through;
			color: #ccc;
			font-weight: 400;
			font-size: 15px;
			line-height: 18px;
			margin-left: 15px;
		}
		
		&__empty {
			padding-top: 25px;
		}
		
		&__add {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		&__buttons {
			margin-top: auto;
		}
		
		&--empty {
			opacity: 0.3;
		}
		
		&--empty .button {
			pointer-events: none;
		}
	}
	
</style>

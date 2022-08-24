<template>
	<div
		class="catalog-item"
		:class="availabilityClass"
	>
		{{product.title }}
		<router-link class="catalog-item__link" :to="{ name:'product', params: {id:product.id}}">
			<img :src="product.images[0]" alt="" class="catalog-item__img">
			<div class="catalog-item__title">
				{{product.name}}
			</div>
		</router-link>
		<div class="catalog-item__price">
			
			
			
			<div class="catalog-item__price-old">
				{{ $filters.numberFormat(product.price) }} руб.
			</div>
			
			<template v-if="hasSale">
				<div class="catalog-item__label">
					- {{product.sale}} %
				</div>
				<div class="catalog-item__price-strike">
					{{ $filters.numberFormat($filters.pricePercent(product.price,product.sale)) }} руб.
				</div>
			</template>
			
		</div>
		<div class="catalog-item__available">
			Осталось
			{{product.availability}}
		</div>
		<app-button
			title="В корзину"
		> </app-button>

	</div>
</template>

<script>
	
	import AppButton from "../Button/Button";
	
	export default {
		name: "CatalogItem",
		props: ['product'],
		components:{
			AppButton
		},
		data:()=>({
			some: false
		}),
		methods: {
		
		},
		computed: {
			availabilityClass(){
				return {
					'catalog-item--empty' : this.product.availability === 0
				}
			},
			hasSale(){
				return this.product.sale > 0
			}
		}
	}
</script>

<style lang="scss">
	
	.catalog-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 32px;
		transition: box-shadow 0.3s ease;
		height: 100%;
		
		&:hover {
			box-shadow: 0 5px 25px rgba(30,31,33,.12);
		}
		
		
		&__link {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: $dark;
			text-decoration: none;
			
			&:hover {
				text-decoration: underline;
			}
		}
		
		
		&__img {
			height: 200px;
			width: auto;
			max-width: 100%;
			object-fit: cover;
			margin-bottom: 40px;
		}
		
		
		&__title {
			font-size: 20px;
			line-height: 26px;
			margin-bottom: 20px;
		}
		
		&__price {
			display: flex;
			align-items: flex-end;
			width: 100%;
			font-weight: 700;
			margin-top: auto;
			margin-bottom: 10px;
		}
		
		&__available {
			width: 100%;
			
			margin-bottom: 15px;
		}
		
		
		.button {
			align-self: flex-start;
		}
		
		&__label {
			position: absolute;
			left: 10px;
			top: 10px;
			display: inline-flex;
			align-items: center;
			background-color: red;
			transform: rotate(-10deg);
			color: #fff;
			padding: 0 10px;
			font-size: 12px;
			border-radius: 4px;
			height: 22px;
		}
		
		&__price-strike {
			text-decoration: line-through;
			color: #ccc;
			font-weight: 400;
			margin-left: 16px;
			font-size: 15px;
			line-height: 18px;
		}
		
		&--empty {
			opacity: 0.3;
		}
		
		&--empty &__button {
			pointer-events: none;
		}
		
	}
</style>

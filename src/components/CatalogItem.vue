<template>
	<div class="catalog-item">
		{{product.title }}
		<router-link class="catalog-item__link" :to="{ name:'product', params: {id:product.id}}">
			<img :src="product.images[0]" alt="" class="catalog-item__img">
			<div class="catalog-item__title">
				{{product.name}}
			</div>
		</router-link>
		

		<div class="catalog-item__price">
			<div v-if="product.sale" class="catalog-item__label">
				- {{product.sale}} %
			</div>
			
			<div class="catalog-item__price-old">
				{{ $filters.numberFormat(product.price) }} руб.
			</div>
			
			<div v-if="product.sale" class="catalog-item__price-strike">
				
				{{ $filters.numberFormat($filters.pricePercent(product.price,product.sale)) }} руб.
			</div>
		
		
		
		
		</div>
		<div class="catalog-item__button" @click.stop="someCLick">
			В корзину
		</div>


<!--		<div class="catalog-item__available">-->
<!--			{{product.availability}}-->
<!--		</div>-->
	</div>
</template>

<script>
	
	
	export default {
		name: "CatalogItem",
		props: ['product'],
		methods: {
			someCLick() {
				console.log(213)
			}
		},
		computed: {
		},
		mounted() {
			// var money = 8990; // у нас есть деньги;
			// var tallage = money / 100 * 15; // обычная формула вычисления процента от числа - 35%
			// console.log(this.product); // результат
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
			margin-bottom: 20px;
		}
		
		
		&__button {
			align-self: flex-start;
			display: inline-flex;
			align-items: center;
			height: 50px;
			background-color: $green;
			padding-left: 20px;
			padding-right: 20px;
			-webkit-border-radius: 4px;
			-moz-border-radius: 4px;
			border-radius: 4px;
			color: #fff;
			transition: background-color 0.3s ease;
			cursor: pointer;
			
			&:hover {
				background-color: darken($green, 10%);
			}
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
		
	}
</style>

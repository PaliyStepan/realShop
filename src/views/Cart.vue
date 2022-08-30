<template>
	<div class="cart">
		<div class="cart__container">
			
			<div v-if="cartLength">
				<h4 class="cart__title">
					Корзина
				</h4>
				<div class="cart-item cart-item--header">
					<div class="cart-item__row">
						<div class="cart-item__col cart-item__col--1">
							Товар
						</div>
						<div class="cart-item__col cart-item__col--2">
							Цена
						</div>
						<div class="cart-item__col cart-item__col--3">
							Всего
						</div>
					</div>
				</div>
				<div class="cart__items">
					<div class="cart-item" v-for="item in items" :key="item.id">
						<div class="cart-item__row">
							<div class="cart-item__col cart-item__col--1">
								<router-link
										:to="{ name:'product', params: {id:item.id}}"
										class="cart-item__link"
								>
									<img
											:src="item.image"
											:alt="item.name"
											class="cart-item__image"
									/>
									
									{{item.name}}
								
								</router-link>
							
							</div>
							<div class="cart-item__col cart-item__col--2">
								{{item.currentPrice}}
							</div>
							<div class="cart-item__col cart-item__col--3">
								<div class="cart-item__counter">
									<div
											class="cart-item__counter-btn cart-item__counter-btn--minus"
											@click="SET_CNT({id: item.id, cnt: item.cnt - 1, rest: item.rest})"
											:class="{'is-disabled' : item.cnt === 1 }"
									>
										-
									</div>
									<input type="text"
									       class="cart-item__counter-input"
									       :value="item.cnt"
									       @input="inputChange(item.id, item.cnt, item.rest, $event)"
									>
									<div
											class="cart-item__counter-btn cart-item__counter-btn--plus"
											@click="SET_CNT({id: item.id, cnt: item.cnt + 1, rest: item.rest})"
											:class="{'is-disabled' : item.cnt === item.rest }"
									>
										+
									</div>
								</div>
								<app-button
										size="square"
										kind="bordered"
										@click="REMOVE_FROM_CART(+item.id)"
								>
									<app-icon name="trash"/>
								</app-button>
								<div class="cart-item__rest">
									На складе {{ item.rest}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cart__bottom">
					<app-button
							title="Очистить корзину"
							kind="bordered"
							@click="CLEAR_CART"
					/>
					<app-button title="Перейти к оформлению" />
				</div>
			</div>
			<div v-else>
				Корзина пуста, перейдите в каталог
			</div>
			
			
			
			
		</div>
	</div>
</template>

<script>
	
	import AppCounter from "../components/Counter/Counter";
	import AppButton from "../components/Button/Button";
	import AppIcon from "../components/Icon/Icon";
	
	import {mapGetters, mapActions} from 'vuex';
	import App from "../App";
	
	export default {
		name: "Cart",
		components: {
			AppCounter,
			AppButton,
			AppIcon,
		},
		methods: {
			...mapActions('cart', ['SET_CNT', 'REMOVE_FROM_CART', 'CLEAR_CART']),
			inputChange(id, cnt, rest, event) {

				let lastCnt = cnt;
	
				if ( isNaN(parseFloat(+event.target.value))) {
					this.SET_CNT({id: id, cnt: lastCnt, rest: rest})
				} else {
					this.SET_CNT({id: id, cnt: +event.target.value, rest: rest})
				}
				
				if (lastCnt === cnt) {
					this.$forceUpdate();
				}
			}
		},
		computed: {
			...mapGetters('cart', {items: 'CART', cartLength:'CART_LENGTH'}),
			
		}
	}
</script>

<style lang="scss">
	
	@import "../assets/variables";
	
	.cart {
		
		&__title {
			margin-bottom: 40px;
		}
		
		&__container {
			width: 1200px;
			margin: 0 auto;
		}
		
		&__items {
			.cart-item {
				margin-bottom: 40px;
				
				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}
		
		&__bottom {
			margin-top: 60px;
			display: flex;
			
			.button {
				margin-right: 40px;
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
		
		
	}
	
	.cart-item {
		
		&__row {
			display: flex;
			align-items: center;
			margin-left: -15px;
			margin-right: -15px;
		}
		
		&__col {
			padding-left: 15px;
			padding-right: 15px;
		}
		
		&__col--1 {
			flex: 0 0 40%;
		}
		
		&__col--2 {
			flex: 0 0 14%;
		}
		
		&__col--3 {
			flex: 1 0 0;
			display: flex;
			flex-wrap: wrap;
			
			.button {
				margin-left: 140px;
			}
		}
		
		&__link {
			display: flex;
			align-items: center;
			text-decoration: none;
			color: $dark;
			transition: color 0.3s ease;
			
			&:hover {
				@media (hover: hover) {
					color: $green;
				}
			}
		}
		
		&__image {
			width: 100px;
			max-height: 100px;
			object-fit: contain;
			margin-right: 10px;
		}
		
		&__rest {
			font-size: 14px;
			line-height: 16px;
			color: #7b7b95;
			margin-top: 10px;
			width: 100%;
		}
		
		
		&__counter {
			display: flex;
			align-items: center;
			
		}
		
		
		&__counter-input {
			border: none;
			width: 100px;
			text-align: center;
		}
		
		&__counter-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
			height: 44px;
			border: 1px solid $green;
			cursor: pointer;
			border-radius: 4px;
			transition: background-color 0.3s ease, color 0.3s ease;
			
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			
		}
		
		&__counter-btn.is-disabled {
			opacity: .5;
			pointer-events: none;
			border-color: #ddd;
		}
		
		&__counter-btn--minus {
			border-color: $green;
			
			&:hover {
				@media (hover: hover) {
					background-color: $green;
					color: #fff;
				}
			}
		}
		
		&__counter-btn--plus {
			background-color: $green;
			color: #fff;
			
			&:hover {
				@media (hover: hover) {
					background-color: #fff;
					color: $dark;
				}
			}
			
		}
		
		&--header {
			margin-bottom: 40px;
		}
		
		
	}
</style>

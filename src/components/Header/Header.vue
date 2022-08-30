<template>
	<div class="header">
		<div class="container">
			<div class="header__inner">
				<router-link to="/" class="header__logo">
					<app-icon name="logo" classes="header__logo-img"/>
				</router-link>
				<router-link to="/cart" class="header__cart"
				     :class="{'header__cart--disabled' : !cartLength}"
				>
					<app-icon name="cart" classes="header__cart-img"/>
					<div class="header__cart-counter" v-if="cartLength">
						{{cartLength}}
					</div>
				</router-link>
				
			</div>
		</div>
	</div>
</template>

<script>
	import AppIcon from "../Icon/Icon";
	import {mapGetters} from 'vuex';
	
	export default {
		name: "Header",
		components: {
			AppIcon,
		},
		data: ()=>({
			open: true
		}),
		computed: {
			...mapGetters('cart', {cartLength: 'CART_LENGTH'}),
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
	
	@import "../../assets/variables";
	
	.header {
		padding-top: 20px;
		padding-bottom: 20px;
		box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
		
		&__inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		
		&__logo:hover &__logo-img {
			fill: $green;
		}
		
		&__logo-img {
			width: 40px;
			height: 40px;
			
			
		}
		
		&__cart {
			position: relative;
		}
		
		&__cart-img {
			width: 40px;
			height: 40px;
		}
		
		&__cart-counter {
			position: absolute;
			left: 100%;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 10px;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			transform: translateX(-10px);
			border: 1px solid $dark;
			background-color: #fff;
		}
		
		
		&__cart:hover &__cart-img {
			fill: $green;
		}
		
		&__cart:hover &__cart-counter {
		}
		
		
		&__cart--disabled {
			opacity: 0.4;
			pointer-events: none;
		}
		
	}
</style>

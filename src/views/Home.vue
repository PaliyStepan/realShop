<template>
	<div class="container">
		<div class="main-grid">
			<div class="main-grid__left">
				<AppFilter/>
			</div>
			<div class="main-grid__right">
				
				<div class="catalog">
					<AppPreloader v-if="!hasProducts"/>
					<div class="catalog__row" v-else>
						<app-catalog-item
							:product="product"
							v-for="product in products"
							:key="product.id"
						/>
					</div>
					<app-pagination
						:perPage="productsPerPage"
						:count="countProducts"
						:page="page"
						@paginate="changePagination"
					/>
					
					
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import AppFilter from "../components/AppFilter";
	import AppCatalogItem from "../components/CatalogItem";
	import AppPreloader from "../components/Preloader/Preloader";
	import AppPagination from "../components/Pagination/Pagination";

	import { mapActions, mapGetters } from 'vuex'
	
	export default {
		name: 'Home',
		components: {
			AppFilter,
			AppCatalogItem,
			AppPreloader,
			AppPagination
		},
		data: () => ({
			page: 1,
			productsPerPage: 6,
		}),
		methods: {
			...mapActions('products', ['GET_PRODUCTS_FORM_API']),
			changePagination(page){
				this.page = page
			}
		},
		computed: {
			...mapGetters('products', {productsFromApi: 'ALL_PRODUCTS'}),
			hasProducts(){
				return this.productsFromApi.length > 0
			},
			filteredProducts() {
				let filteredProducts = this.productsFromApi;
				
				return filteredProducts
			},
			countProducts(){
				return this.filteredProducts.length;
			},
			products(){
				const offset = (this.page - 1) * this.productsPerPage;
				return this.filteredProducts.slice(offset, offset + this.productsPerPage)
			}
		},
		created() {
			this.GET_PRODUCTS_FORM_API();
		}
	}
</script>

<style lang="scss">
	
	.main-grid {
		display: flex;
		flex-wrap: wrap;
		
		&__left {
			flex: 0 0 20%;
			padding-right: 30px;
		}
		
		&__right {
			flex: 0 0 80%;
		}
	}
	
	.catalog {
		
		&__row {
			display: grid;
			grid-template-columns: repeat(3,1fr);
			grid-gap: 30px;
		}
		
		&__col {
			flex: 0 0 33.333%;
			padding-left: 15px;
			padding-right: 15px;
			margin-bottom: 30px;
		}
	}

</style>

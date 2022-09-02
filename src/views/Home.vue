<template>
	<div class="container">
		<div class="main-grid">
			<div class="main-grid__left">
				<div class="filter">
					<h4 class="filter__title">
						Фильтр
					</h4>
					<div class="filter__group">
						<app-form-input
							placeholder="от"
							v-model.number="filterPriceFrom"
						/>
					</div>
					<div class="filter__group">
						<app-form-input
							placeholder="до"
							v-model.number="filterPriceTo"
						/>
					</div>
					<div class="filter__group">
						<div class="filter__checks">
							<app-checkbox
									v-for="check in checksAvailable"
									:title="check.title"
									:key="check.title"
									:value="check.value"
									v-model="checks"
									@click="changePagination(1)"
							>
							</app-checkbox>
						</div>
					</div>
					<div class="filter__group">
						<app-select
							placeholder="Категория"
							:options="categories"
							@select="optionSelect"
						/>
					</div>
					
				</div>
			</div>
			<div class="main-grid__right">
				<transition name="fade" mode="out-in" appear>
					<div class="catalog" v-if="countProducts !== 0">
						<transition name="fade" mode="out-in" appear>
							<div class="catalog__row" v-if="!hasProducts">
								<AppSkeleton
									:lengthItems="productsPerPage"
								/>
							</div>
<!--							<TransitionGroup mode="out-in" name="fade" tag="div"  v-else class="catalog__row">-->
							<div class="catalog__row" v-else>
								<app-catalog-item
									:product="product"
									v-for="product in products"
									:key="product.id"
								/>
							</div>
<!--							</TransitionGroup>-->
						</transition>
						<app-pagination
							:perPage="productsPerPage"
							:count="countProducts"
							:page="page"
							@paginate="changePagination"
						/>
					</div>
					<div v-else class="catalog__empty">
						Ничего не найдено. <br>
						Измените запрос
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	import AppCatalogItem from "../components/CatalogItem/CatalogItem";
	import AppPreloader from "../components/Preloader/Preloader";
	import AppPagination from "../components/Pagination/Pagination";
	import AppSkeleton from "../components/Sceleton/Skeleton";
	import AppCheckbox from "../components/Checkbox/Checkbox";
	import AppFormInput from "../components/FormInput/FormInput";
	import AppSelect from "../components/Select/Select";

	import { mapActions, mapGetters } from 'vuex';
	
	export default {
		name: 'Home',
		components: {
			AppCatalogItem,
			AppPreloader,
			AppPagination,
			AppSkeleton,
			AppCheckbox,
			AppFormInput,
			AppSelect
		},
		data: () => ({
			page: 1,
			productsPerPage: 6,
			filterPriceFrom: 0,
			filterPriceTo: 0,
			filterCategoryId: 0,
			categories: [
				{
					id: 654,
					name: 'Смартфоны'
				},
				{
					id: 589,
					name: 'Ноутбуки'
				},
				{
					id: 356,
					name: 'Телевизоры'
				},
				{
					id: 98736,
					name: 'Пылесосы'
				},
				{
					id: 196,
					name: 'Стиральные машины'
				},
				{
					id: 66678,
					name: 'Фены'
				},
			],
			checksAvailable: [
				{
					title: 'В наличии',
					value: 'availability'
				},
				{
					title: 'Со скидкой',
					value: 'sale'
				},
			],
			checks: []
		}),
		methods: {
			...mapActions('products', ['GET_PRODUCTS_FORM_API']),
			changePagination(page){
				this.page = page
			},
			optionSelect(option){
				this.filterCategoryId = option.id
			}
		},
		computed: {
			...mapGetters('products', {productsFromApi: 'ALL_PRODUCTS'}),
			hasProducts(){
				return this.productsFromApi !== null
			},
			filteredProducts() {
				let filteredProducts = this.productsFromApi;
				
				if (this.filterPriceFrom > 0) {
					filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom)
				}
				if (this.filterPriceTo > 0) {
					filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo)
				}
				if (this.filterCategoryId) {
					filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId );
				}
				if (this.checks.length > 0) {
					filteredProducts = filteredProducts.filter( item => this.checks.every( some => item[some] > 0 ) );
				}
				
				return filteredProducts
			},
			countProducts(){
				if (this.hasProducts) {
					return this.filteredProducts.length;
				}
			},
			products(){
				const offset = (this.page - 1) * this.productsPerPage;
				return this.filteredProducts.slice(offset, offset + this.productsPerPage)
			},
		
		},
		mounted() {
			this.GET_PRODUCTS_FORM_API();
		}
		
	}
</script>

<style lang="scss">

	
	.filter {
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 16px;
		
		&__title {
			margin-bottom: 20px;
		}
		
		&__group {
			margin-bottom: 20px;
			
			&:last-of-type {
				margin-bottom: 0;
			}
		}
		
		.checkbox {
			margin-bottom: 10px;
			
			&:last-of-type {
				margin-bottom: 0;
			}
		}
	}
	
	.main-grid {
		display: flex;
		flex-wrap: wrap;
		
		&__left {
			flex: 0 0 300px;
			padding-right: 30px;
		}
		
		&__right {
			flex: 1 0 0;
			position: relative;
		}
	}
	
	.catalog {
		
		&__empty {
			position: absolute;
			top: 0;
			left: 0;
		}
		
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
		
		.pagination {
			display: flex;
			justify-content: center;
			margin-top: 50px;
		}
	}

</style>

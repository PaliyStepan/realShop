<template>
	<div class="pagination">
		page - {{page}}
		<div class="pagination__list">
			<div class="pagination__item"
				:class="{'pagination__item--current' : item === page}"
				v-for="item in pages"
				:key="item"
				@click="changePaginate(item)"
			>
				{{item}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Pagination",
		model: {
			prop: 'page',
			event: 'paginate'
		},
		props: {
			page: {
				type: Number,
			},
			count: {
				type: Number,
				default: 1
			},
			perPage: {
				type: Number,
				default: 6
			},
		},
		computed: {
			pages() {
				return Math.ceil(this.count / this.perPage)
			},
		},
		methods: {
			changePaginate(page) {
				this.$emit('paginate', page)
			}
		},
	}
</script>

<style lang="scss">
	@import "../../assets/variables";
	
	.pagination {
		
		&__list {
			display: flex;
			align-items: center;
		}
		
		&__item {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			border: 1px solid #ddd;
			border-radius: 4px;
			cursor: pointer;
		}
		
		&__item--current {
			background-color: $green;
			color: #fff;
			border-color: $green;
		}
	}
</style>

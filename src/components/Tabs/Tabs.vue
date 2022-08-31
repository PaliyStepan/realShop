<template>
	<div class="tabs">
		<div class="tabs__buttons">
			<div
				class="tabs__button"
				v-for="(button, index) in buttons"
				:key="index"
				:class="{'active': index === active}"
				@click="changeActive(index)"
			>
				{{button}}
			</div>
		</div>
		<div class="tabs__content">
			<div class="tabs__item"
			     v-for="(item, index) in content"
			     :key="index"
			     v-show="index === active"
			>
				<div v-for="chars in item" class="tabs__chars">
					<div v-for="(value,key) in chars" class="tabs__chars-row">
						<div class="tabs__chars-left">
							<p>
								{{key}}
							</p>
						</div>
						<div class="tabs__chars-right">
							<p>
								{{value}}
							</p>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: "Tabs",
		props: {
			list: {
				required: true,
				type: Array
			}
		},
		data: () =>({
			active: 0
		}),
		computed:{
			buttons(){
				let buttons;
				buttons = this.list.map(item => item.title)
				return buttons;
			},
			content() {
				let content;
				content = this.list.map(item => item.list)
				return content;
			}
		},
		methods: {
			changeActive(index){
				this.active = index
			}
		},
		mounted(){
		
		}
	}
</script>

<style lang="scss">
	
	@import "../../assets/variables";
	
	.tabs {
		
		&__buttons {
			display: flex;
			align-items: center;
		}
		
		&__button {
			display: flex;
			align-items: center;
			height: 50px;
			border: 1px solid #ddd;
			border-right: none;
			border-bottom: none;
			padding-left: 24px;
			padding-right: 24px;
			cursor: pointer;
			transition: background-color 0.3s ease, border-color 0.3s ease;
			font-size: 20px;
			font-weight: 700;
			
			&:last-of-type {
				border-right: 1px solid #ddd;
			}
			
			
			&.active {
				background-color: $green;
				border-color: $green;
				color: #fff;
			}
		}

		&__chars {
			border: 1px solid #ddd;
			border-bottom: none;
			padding: 20px;
			
			&:last-of-type {
				border-bottom: 1px solid #ddd;
			}
		}
		
		&__chars-row {
			display: flex;
			align-items: flex-start;
		}
		
		&__chars-left {
			flex: 0 0 30%;
			
			p {
				font-size: 20px;
				font-weight: 600;
			}
		}
		
		&__chars-right {
			flex: 1 0 0;
		}
	}
</style>

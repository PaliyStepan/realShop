<template>
	<div class="slider">
		<swiper
			:slides-per-view="slidesPerView"
			:space-between="spaceBetween"
			:loop="loop"
			:thumbs="{ swiper: thumbsSwiper }"
			class="slider__main"
		>
			<swiper-slide
				v-for="(slide, index) in slides"
				:key="index"
				class="slider__slide"
			>
				<img
					:src="slide"
					class="slider__image"
				>
			</swiper-slide>
		</swiper>
		<div class="slider__bottom">
			<swiper
				:slides-per-view="thumbsPerView"
				:space-between="thumbsSpaceBetween"
				:loop="false"
				@swiper="setThumbsSwiper"
				:navigation="{
					prevEl: '.slider__button--left',
					nextEl: '.slider__button--right',
				}"
				class="slider__thumbs"
			>
				<swiper-slide
					v-for="(slide, index) in slides"
					:key="index"
					class="slider__slide"
				>
					<img
						:src="slide"
						class="slider__image"
					>
				</swiper-slide>
			</swiper>
			<div class="slider__button slider__button--left">
				<app-icon name="arrow-left"/>
			</div>
			<div class="slider__button slider__button--right">
				<app-icon name="arrow-right"/>
			</div>
		</div>
	</div>
	
	
	
</template>

<script>
	import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
	import SwiperCore, {Navigation, Thumbs} from 'swiper';
	import AppIcon from "../Icon/Icon";
	
	import 'swiper/swiper.min.css';

	SwiperCore.use([Navigation, Thumbs]);
	
	export default {
		name: "Slider",
		components: {
			AppIcon,
			Swiper,
			SwiperSlide
		},
		props: {
			slides: {
				required: true,
				type: Array,
				default: []
			},
			slidesPerView: {
				required: true,
				type: Number,
				default: 1
			},
			spaceBetween: {
				required: true,
				type: Number,
				default: 15
			},
			loop: {
				type: Boolean,
				default: false
			},
			thumbsPerView: {
				required: true,
				type: Number,
				default: 1
			},
			thumbsSpaceBetween: {
				required: true,
				type: Number,
				default: 15
			},
			title: {
				type: String
			}
		},
		data: ()=>({
			thumbsSwiper: null,
		}),
		methods: {
			setThumbsSwiper(swiper){
				this.thumbsSwiper = swiper;
			},
		}
	}
</script>

<style lang="scss">
	
	@import "../../assets/variables";
	
	.slider {
		
		&__slide  {
			box-sizing: border-box;
		}
		
		&__image {
			width: auto;
			max-width: 100%;
			max-height: 100%;
			object-fit: cover;
		}
		
		&__main {
			margin-bottom: 40px;
		}
		
		&__main  &__slide {
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #ddd;
			border-radius: 4px;
			height: 400px;
			padding: 40px;
		}
		
		&__bottom {
			display: flex;
			align-items: center;
		}
		
		&__thumbs {
			order: 1;
			margin-left: 20px;
			margin-right: 20px;
		}
		
		&__thumbs &__slide {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 90px;
			box-sizing: border-box;
			position: relative;
			cursor: pointer;
			
			&:hover {
				@media (hover: hover) {
					&:before {
						border-color: $green;
					}
				}
			}
			
			&:before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				transition: border 0.3s ease;
				border: 1px solid #ddd;
				border-radius: 4px;
				pointer-events: none;
			}
			
			&.swiper-slide-thumb-active {
				
				&:before {
					border-color: $green;
					border-width: 2px;
				}
			}
		}
		
		&__button {
			min-width: 30px;
			height: 30px;
			border: 1px solid transparent;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			
			&:first-of-type {
				order: 0;
			}
			
			&:last-of-type {
				order: 2;
			}
			
			.icon {
				width: 24px;
				height: 24px;
			}
			
			&.swiper-button-disabled {
				pointer-events: none;
				opacity: 0.4;
			}
			
			&:hover {
				border-color: #ddd;
			}
			
			&--left {
				order: 0;
			}
			
			&--right {
				order: 2;
			}
		}
	}
	

	
	.swiper-thumbs {
		
		
		.swiper-wrapper {
			box-sizing: border-box;
		}
		
		.swiper-slide {
		
		}
		
		.swiper-slide__img {
			max-width: 100%;
			max-height: 100%;
			object-fit: cover;
		}
		
		
	}
	.swiper-button {
	
	}
</style>

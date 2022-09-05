<template>
	<section class="section">
		<div class="container">
			<transition name="fade" mode="out-in">
				<div v-if="!orderDone">
					<form action=""
						@submit.prevent
					>
						<transition-group
							name="switch"
							tag="div"
							class="order-steps"
							appear
						>
							<div class="order-step" v-if="activeStep === 1">
								<div class="order-step__header">
									<transition
										name="left"
										appear
									>
										<h4>
											1. Контактные данные
										</h4>
									</transition>
								</div>
								<div class="order-step__items">
									<div class="order-step__row">
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Имя *
												</div>
												<input type="text"
													class="form-input__field"
													v-model.trim="order.user.name"
													@blur="v$.order.user.name.$touch()"
													:class="{'is-error' : v$.order.user.name.$error}"
												>
												<div class="form-input__error" v-if="errorName.length">
													<p v-for="(error,index) in errorName" :key="index">
														{{error}}
													</p>
												</div>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Фамилия *
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="order.user.lastName"
											       @blur="v$.order.user.lastName.$touch()"
											       :class="{'is-error' : v$.order.user.lastName.$error}"
												>
												<div class="form-input__error" v-if="errorLastName.length">
													<p v-for="(error,index) in errorLastName" :key="index">
														{{error}}
													</p>
												</div>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Телефон *
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="order.user.phone"
											       @blur="v$.order.user.phone.$touch()"
											       :class="{'is-error' : v$.order.user.phone.$error}"
										           v-maska="['+7 ### ### ## ##', '+7 ### ### ## ##']"
												>
												<div class="form-input__error" v-if="errorPhone.length">
													<p v-for="(error,index) in errorPhone" :key="index">
														{{error}}
													</p>
												</div>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Email *
												</div>
												<input type="email"
											       class="form-input__field"
											       v-model.trim="order.user.email"
											       :class="{'is-error' : v$.order.user.email.$error}"
										           @blur="v$.order.user.email.$touch()"
												>
												<div class="form-input__error" v-if="errorEmail.length">
													<p v-for="(error,index) in errorEmail" :key="index">
														{{error}}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<transition
									name="right"
									appear
								>
									<app-button
										title="Далее"
										:disabled="!isUserValid"
										@click="nextStep"
									/>
								</transition>
							</div>
							<div class="order-step" v-if="activeStep === 2">
								<div class="order-step__header">
									<transition
										name="left"
										appear
									>
										<h4>
											2. Способ получения
										</h4>
									</transition>
								</div>
								<div class="order-step__tabs">
									<app-check-label value="shop" v-model="order.receiving">
										Самовывоз
									</app-check-label>
									<app-check-label value="delivery" v-model="order.receiving">
										Доставка
									</app-check-label>
								</div>
								<div class="order-step__tabs-inner">
									<transition name="fade" mode="out-in">
										<div class="order-step__tab" v-if="isReceiving">
											<div class="order-step__tabs-inner">
												<div class="order-step__tabs">
													<app-check-label
														size="sm"
														v-for="shop in shops"
														:key="shop.value"
														v-model="order.deliveryShop"
														:value="shop.value"
													>
														{{shop.name}}
													</app-check-label>
												</div>
											</div>
											<transition
												name="right"
												appear
											>
												<div class="order-step__buttons">
													<app-button
														title="Назад"
														@click="prevStep"
													/>
													<app-button
														title="Далее"
														@click="nextStep"
														:disabled="!isShopChoose"
													/>
												</div>
											</transition>
										</div>
										<div class="order-step__tab" v-else>
											<div class="order-step__items">
												<div class="order-step__row">
													<div class="order-step__col">
														<div class="form-input">
															<div class="form-input__label">
																Город *
															</div>
															<input type="text"
														       class="form-input__field"
														       v-model.trim="order.address.city"
														       @blur="v$.order.address.city.$touch()"
														       :class="{'is-error' : v$.order.address.city.$error}"
															>
															<div class="form-input__error" v-if="errorAddress.length">
																<p v-for="(error,index) in errorAddress" :key="index">
																	{{error}}
																</p>
															</div>
														</div>
													</div>
													<div class="order-step__col">
														<div class="form-input">
															<div class="form-input__label" >
																Улица *
															</div>
															<input type="text"
														       class="form-input__field"
														       v-model.trim="order.address.street"
														       @blur="v$.order.address.street.$touch()"
														       :class="{'is-error' : v$.order.address.street.$error}"
															>
															<div class="form-input__error" v-if="errorStreet.length">
																<p v-for="(error,index) in errorStreet" :key="index">
																	{{error}}
																</p>
															</div>
														</div>
													</div>
													<div class="order-step__col">
														<div class="form-input">
															<div class="form-input__label" >
																Строение *
															</div>
															<input type="text"
														       class="form-input__field"
														       v-model.trim="order.address.building"
														       @blur="v$.order.address.building.$touch()"
														       :class="{'is-error' : v$.order.address.building.$error}"
															>
															<div class="form-input__error" v-if="errorBuilding.length">
																<p v-for="(error,index) in errorBuilding" :key="index">
																	{{error}}
																</p>
															</div>
														</div>
													</div>
													<div class="order-step__col">
														<div class="form-input">
															<div class="form-input__label" >
																Корпус
															</div>
															<input type="text"
														       class="form-input__field"
														       v-model.trim="order.address.frame"
															>
														</div>
													</div>
													<div class="order-step__col">
														<div class="form-input">
															<div class="form-input__label" >
																Подъезд
															</div>
															<input type="text"
														       class="form-input__field"
														       v-model.trim="order.address.entrance"
															>
														</div>
													</div>
													<div class="order-step__col">
														<div class="form-input">
															<div class="form-input__label" >
																Этаж
															</div>
															<input type="text"
														       class="form-input__field"
														       v-model.trim="order.address.floor"
															>
														</div>
													</div>
													<div class="order-step__col">
														<div class="form-input">
															<div class="form-input__label" >
																Квартира
															</div>
															<input type="text"
														       class="form-input__field"
														       v-model.trim="order.address.flat"
															>
														</div>
													</div>
												</div>
											</div>
											<transition
												name="right"
												appear
											>
												<div class="order-step__buttons">
													<app-button
														title="Назад"
														@click="prevStep"
													/>
													<app-button
														title="Далее"
														@click="nextStep"
														:disabled="!isAddressValid"
													/>
												</div>
											</transition>
										</div>
									</transition>
								</div>
							</div>
							<div class="order-step" v-if="activeStep === 3">
								<div class="order-step__header">
									<transition
										name="left"
										appear
									>
										<h4>
											3. Способ оплаты
										</h4>
									</transition>
								</div>
								<div class="order-step__tabs-inner">
									<div class="order-step__tabs">
										<app-check-label
											size="sm"
											v-for="pay in payment"
											:key="pay.value"
											v-model="order.orderPayment"
											:value="pay.value"
										>
											{{pay.name}}
										</app-check-label>
									</div>
									<transition
										name="right"
										appear
									>
										<div class="order-step__buttons">
											<app-button
												title="Сделать заказ"
												@click="sendOrder"
											/>
										</div>
									</transition>
								</div>
							</div>
						</transition-group >
					</form>
				</div>
				<div class="order-result" v-else>
					<h2 class="order-result__title">Ваш заказ</h2>
					<div class="order-result__list">
						<div class="order-result__item">
							<div class="order-result__row">
								<div class="order-result__col order-result__col--1">
									Имя
								</div>
								<div class="order-result__col order-result__col--2">
									{{order.user.name}}
								</div>
							</div>
						</div>
						<div class="order-result__item">
							<div class="order-result__row">
								<div class="order-result__col order-result__col--1">
									Фамилия
								</div>
								<div class="order-result__col order-result__col--2">
									{{order.user.lastName}}
								</div>
							</div>
						</div>
						<div class="order-result__item">
							<div class="order-result__row">
								<div class="order-result__col order-result__col--1">
									Телефон
								</div>
								<div class="order-result__col order-result__col--2">
									{{order.user.phone}}
								</div>
							</div>
						</div>
						<div class="order-result__item">
							<div class="order-result__row">
								<div class="order-result__col order-result__col--1">
									Почта
								</div>
								<div class="order-result__col order-result__col--2">
									{{order.user.email}}
								</div>
							</div>
						</div>
						<div v-if="order.receiving === 'shop' ">
							<div class="order-result__item">
								<div class="order-result__row">
									<div class="order-result__col order-result__col--1">
										Магазин
									</div>
									<div class="order-result__col order-result__col--2">
										{{orderShop.name}}
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="order-result__item">
								<div class="order-result__row">
									<div class="order-result__col order-result__col--1">
										Город
									</div>
									<div class="order-result__col order-result__col--2">
										{{order.address.city}}
									</div>
								</div>
							</div>
							<div class="order-result__item">
								<div class="order-result__row">
									<div class="order-result__col order-result__col--1">
										Улица
									</div>
									<div class="order-result__col order-result__col--2">
										{{order.address.street}}
									</div>
								</div>
							</div>
							<div class="order-result__item">
								<div class="order-result__row">
									<div class="order-result__col order-result__col--1">
										Дом
									</div>
									<div class="order-result__col order-result__col--2">
										{{order.address.building}}
									</div>
								</div>
							</div>
							<div class="order-result__item" v-if="order.address.frame">
								<div class="order-result__row">
									<div class="order-result__col order-result__col--1">
										Корпус
									</div>
									<div class="order-result__col order-result__col--2">
										{{order.address.frame}}
									</div>
								</div>
							</div>
							<div class="order-result__item" v-if="order.address.entrance">
								<div class="order-result__row">
									<div class="order-result__col order-result__col--1">
										Подъезд
									</div>
									<div class="order-result__col order-result__col--2">
										{{order.address.entrance}}
									</div>
								</div>
							</div>
							<div class="order-result__item" v-if="order.address.floor">
								<div class="order-result__row">
									<div class="order-result__col order-result__col--1">
										Этаж
									</div>
									<div class="order-result__col order-result__col--2">
										{{order.address.floor}}
									</div>
								</div>
							</div>
							<div class="order-result__item" v-if="order.address.flat">
								<div class="order-result__row">
									<div class="order-result__col order-result__col--1">
										Квартира
									</div>
									<div class="order-result__col order-result__col--2">
										{{order.address.flat}}
									</div>
								</div>
							</div>
						</div>
						<div class="order-result__item">
							<div class="order-result__row">
								<div class="order-result__col order-result__col--1">
									Оплата
								</div>
								<div class="order-result__col order-result__col--2">
									{{orderPayment.name}}
								</div>
							</div>
						</div>
					</div>
					
					<div class="order-result__jumbotron">
						<p>
							Всего товаров - {{CART_LENGTH}} шт.
						</p>
						<p>
							Общая сумма - <b>{{$filters.numberFormat(TOTAL)}}</b> рублей
						</p>
					</div>
				</div>
			</transition>
		</div>
	</section>
</template>

<script>
	
	import AppButton from "../components/Button/Button";
	import AppCheckLabel from "../components/TabLabel/TabLabel";
	import useValidate from '@vuelidate/core';
	import FormInput from "../components/FormInput/FormInput";
	import { required, email, minLength, maxLength, numeric } from '@vuelidate/validators';
	import {mapGetters} from 'vuex';

	export default {
		components: {
			FormInput,
			AppButton,
			AppCheckLabel,
		},
		data: () => ({
			v$: useValidate(),
			activeStep: 1,
			order: {
				user: {
					name: '',
					lastName: '',
					email: '',
					phone: '',
				},
				address: {
					city: '',
					street: '',
					building: '',
					frame: '',
					entrance: '',
					floor: '',
					flat: '',
				},
				orderPayment: 'cash',
				receiving: 'shop',
				deliveryShop: ''
			},
			payment: [
				{
					name: 'Наличные',
					value: 'cash'
				},
				{
					name: 'Картой',
					value: 'card'
				},
				{
					name: 'Онлайн на сайте',
					value: 'online'
				},
				{
					name: 'Кредит Тинькофф',
					value: 'tinkoff'
				},
			],
			shops: [
				{name: 'Ленинский пр. 17', value: 'Leninskiy 17'},
				{name: 'Дыбенко ул. 29', value: 'Dybenko 29'},
				{name: 'Московский пр. 85', value: 'Moskovskij 85'},
				{name: 'Ладожская ул. 115', value: 'Ladozhskaya 115'},
				{name: 'Невский пр. 225', value: 'Nevskij 225'},
			],
			orderDone: false,
		}),
		methods: {
			nextStep(){
				this.activeStep = this.activeStep + 1
			},
			prevStep(){
				this.activeStep = this.activeStep - 1
			},
			sendOrder(){
				this.orderDone = true
			}
		},
		computed: {
			...mapGetters('cart', ['CART_LENGTH', 'TOTAL']),
			orderShop() {
				return this.shops.find(item => item.value === this.order.deliveryShop)
			},
			orderPayment() {
				return this.payment.find(item => item.value === this.order.orderPayment)
			},
			isReceiving(){
				return this.order.receiving === 'shop'
			},
			isUserValid(){
				return this.v$.order.user.$invalid;
			},
			isAddressValid(){
				return this.v$.order.address.$invalid;
			},
			isShopChoose(){
				return this.order.deliveryShop === '';
			},
			errorName(){
				const errors = [];
				if (this.v$.order.user.name.$error) errors.push('Обязательное поле');
				return errors
			},
			errorLastName(){
				const errors = [];
				if (this.v$.order.user.lastName.$error) errors.push('Обязательное поле');
				return errors
			},
			errorPhone(){
				const errors = [];
				if (this.v$.order.user.phone.$error) errors.push('Обязательное поле');
				return errors
			},
			errorEmail(){
				const errors = [];
				if (this.v$.order.user.email.$error) errors.push('Обязательное поле');
				return errors
			},
			errorAddress(){
				const errors = [];
				if (this.v$.order.address.city.$error) errors.push('Обязательное поле');
				return errors
			},
			errorStreet(){
				const errors = [];
				if (this.v$.order.address.street.$error) errors.push('Обязательное поле');
				return errors
			},
			errorBuilding(){
				const errors = [];
				if (this.v$.order.address.building.$error) errors.push('Обязательное поле');
				return errors
			},
			
		},
		validations() {
			return {
				order : {
					user: {
						name: {required},
						lastName: {required},
						phone: { required, minLength: minLength(16)},
						email: { required, email}
					},
					address: {
						city: {required},
						street: {required},
						building: {required},
						frame: '',
						entrance: '',
						floor: '',
						flat: '',
					},
				}
			}
		},
	}
</script>

<style lang="scss">
	@import "../assets/variables";
	
	.order-steps {
		position: relative;
	}
	
	.order-step {
		width: 100%;
		top: 0;
		right: 0;
		
		&__header {
			margin-bottom: 40px;
		}
		
		&__items {
			margin-bottom: 40px;
		}
		
		&__row {
			display: flex;
			flex-wrap: wrap;
			margin-left: -15px;
			margin-right: -15px;
			margin-bottom: -30px;
		}
		
		&__col {
			padding-left: 15px;
			padding-right: 15px;
			flex: 0 0 25%;
			margin-bottom: 30px;
		}
		
		&__buttons {
			display: flex;
			align-items: center;
			
			.button {
				margin-right: 20px;
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
		
		&__tabs {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 20px;
			
			.tab-label {
				margin-right: 15px;
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
	}
	

	.progressbar {
		height: 20px;
		background-color: #ddd;
		border-radius: 2px;
		overflow: hidden;
		margin-bottom: 60px;
		
		&__inner {
			width: 100%;
			height: 100%;
			background-color: $green;
		}
	}
	
	
	.order-result {
		width: 80%;
		margin: 0 auto;
		
		&__title {
			text-align: center;
			margin-bottom: 60px;
		}
		
		&__item {
			margin-bottom: 24px;
			
			&:last-of-type {
				margin-bottom: 20px;
			}
		}
		
		&__row {
			display: flex;
			margin: 0 -15px;
		}
		
		&__col {
			padding: 0 15px;
		}
		
		&__col--1 {
			flex: 0 0 40%;
		}
		
		&__col--2 {
			flex: 0 0 60%;
		}
		
		&__jumbotron {
			display: inline-flex;
			flex-direction: column;
			background-color: #ddd;
			border-radius: 10px;
			padding: 26px;
			margin-top: 60px;
			
			p {
				font-size: 20px;
				line-height: 24px;
				
				b {
					font-size: 24px;
					line-height: 28px;
				}
			}
		}
		
		
	}
	
	



</style>

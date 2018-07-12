import UI from './UItools/UItools.js';
import UItools from './UItools/UItools.js';

const log = console.log;

(() => {
	let cart;

	const InitShoppingCart = () => {
		cart = document.querySelector('#cart #contents');
		document.querySelector('#order').addEventListener('click', SubmitCart);
	};

	const SetProductButtons = () => {
		const productButtons = document.querySelectorAll('section#products div button');
		productButtons.forEach((button) => {
			button.addEventListener('click', AddToCart);
		});
	};

	const FancySVG = () => {
		const svgElements = document.querySelectorAll('svg *');
		// const whiteElements = [];
		svgElements.forEach((element) => {
			if (element.style.fill === 'rgb(255, 255, 255)') {
				element.classList.add('light');
				// whiteElements.push(element);
			}
		});
		// console.log(whiteElements);
	};

	const AddToCart = (e) => {
		// Get product
		const product = {
			id: e.target.parentElement.id,
			title: e.target.parentElement.querySelector('h3').innerText,
			description: e.target.parentElement.querySelector('p.description').innerText,
			svg: e.target.parentElement.querySelector('.wrap-svg').innerHTML,
			price: e.target.parentElement.querySelector('p.price').innerText,
		};

		// If product is already in the cart...
		const currentCartItem = document.querySelector('#p-' + product.id);
		if (currentCartItem) {
			// .. Update amount
			const currentAmount = currentCartItem.querySelector('.amount');
			currentAmount.innerText = parseInt(currentAmount.innerText) + 1;
			const aside = currentCartItem.querySelector('aside');
			const asideAmount = aside.querySelector('.amount');
			const asideValue = aside.querySelector('.total');
			const productPrice = aside.querySelector('.price');
			asideAmount.innerText = currentAmount.innerText;
			asideValue.innerHTML = '&euro; ' + (parseInt(currentAmount.innerText) * productPrice.innerText.split(' ')[1]).toFixed(2);
		} else {
			// .. else render product in cart
			RenderInCart(product);
		}

		// Tell the button to act happy
		e.target.classList.add('succes');
		setTimeout(() => {
			e.target.classList.remove('succes');
		}, 500);
		// And the cart
		if (!elements.cart) {
			elements.cart = document.querySelector('a#cart');
		}
		elements.cart.classList.add('shake');
		setTimeout(() => {
			elements.cart.classList.remove('shake');
		}, 500);
		UpdateTotals();
	};

	const RenderInCart = (product) => {
		const content = [];
		const contentSide = [];

		// Delete
		const buttonX = UI.getButton('❌');
		const buttonDelete = UI.getButton('🗑️', 'hidden');
		buttonX.addEventListener('click', () => {
			if (buttonDelete.classList.contains('hidden')) {
				buttonDelete.classList.remove('hidden');
				buttonX.parentElement.parentElement.parentElement.classList.add('deleting');
			} else {
				buttonDelete.classList.add('hidden');
				buttonX.parentElement.parentElement.parentElement.classList.remove('deleting');
			}
		});
		buttonDelete.addEventListener('click', (e) => {
			DeleteFromCart(e.target.parentElement.parentElement);
		});
		content.push(UI.wrap([buttonX, buttonDelete]));

		// Image
		const productSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		// const productSVG = document.createElement('div');
		productSVG.innerHTML = product.svg;
		content.push(UI.wrap(productSVG));
		
		// Amount (and interactions)
		const buttonSub = UI.getButton('-', 'sub');
		buttonSub.addEventListener('click', function (e) {
			const amount = e.target.parentElement.querySelector('.amount');
			if (amount.innerText === '1') {
				// DeleteFromCart(e.target.parentElement.parentElement);
				e.target.classList.add('shake');
				setTimeout(() => {
					e.target.classList.remove('shake');
				}, 500);
			} else {
				amount.innerText = parseInt(amount.innerText) - 1;
				const aside = this.parentElement.parentElement.parentElement.querySelector('aside');
				const asideAmount = aside.querySelector('.amount');
				const asideValue = aside.querySelector('.total');
				const productPrice = aside.querySelector('.price');
				asideAmount.innerText = amount.innerText;
				asideValue.innerHTML = '&euro; ' + (parseInt(amount.innerText) * productPrice.innerText.split(' ')[1]).toFixed(2);
			}
			UpdateTotals();
		});
		const buttonAdd = UI.getButton('+', 'add');
		buttonAdd.addEventListener('click', function (e) {
			const amount = e.target.parentElement.querySelector('.amount');
			amount.innerText = parseInt(amount.innerText) + 1;
			const aside = this.parentElement.parentElement.parentElement.querySelector('aside');
			const asideAmount = aside.querySelector('.amount');
			const asideValue = aside.querySelector('.total');
			const productPrice = aside.querySelector('.price');
			asideAmount.innerText = amount.innerText;
			asideValue.innerHTML = '&euro; ' + (parseInt(amount.innerText) * productPrice.innerText.split(' ')[1]).toFixed(2);
			UpdateTotals();
		});
		content.push(UI.wrap([buttonSub, UI.getText('1', 'amount'), buttonAdd]));

		// Product name
		contentSide.push(UI.wrap(product.title));
		
		// Price
		contentSide.push(UI.wrap([
			UItools.getText('1', 'amount', '', 'span'),
			UItools.getText(' x ', '', '', 'span'),
			UItools.getText(product.price, 'price', '', 'span'),
			UItools.getText(' = ', '', '', 'span'),
			UItools.getText(product.price, 'total', '', 'span')
		]));

		// // Description - TODO: Do I need this here?
		// content.push(UI.wrap(product.description));

		UI.renderIn([UI.wrap(content), UI.wrap(contentSide, '', '', 'aside')], cart, 'cart-item', 'p-' + product.id);
		SetCartButton(true);
		
	};

	const GetRadioValue = (radios) => {
		for (let i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				return radios[i].value;
			}
		}
	};

	const DeleteFromCart = (row) => {
		const parent = row.parentElement;
		const cart = parent.parentElement;
		cart.removeChild(parent);
		if (cart.childElementCount === 0) {
			elements.storeLink.click();
			SetCartButton(false);
		}
		UpdateTotals();
	};

	const SubmitCart = () => {
		log('You just ordered some crap');
	};

	const SetCartButton = (active) => {
		if (active) {
			elements.cartLink.classList.remove('hidden');
		} else {
			elements.cartLink.classList.add('hidden');
		}
	};

	const UpdateTotals = () => {
		if (!elements.totals) {
			elements.totals = {};
			elements.totals.tax = document.querySelector('.totals .tax .value');
			elements.totals.total = document.querySelector('.totals .total .value');
		}
		let totalPrice = 0;
		const cartContents = document.querySelectorAll('#contents > div');
		cartContents.forEach((item) => {
			let itemPrice = item.querySelector('aside .price').innerText;
			itemPrice = parseFloat(itemPrice.split(' ')[1]);
			let itemAmount = parseFloat(item.querySelector('.amount').innerText);
			totalPrice += itemPrice * itemAmount;
		});
		elements.totals.total.innerHTML = `&euro; ${(Math.round(totalPrice * 100) / 100).toFixed(2)}`;
		elements.totals.tax.innerHTML = `&euro; ${(Math.round((totalPrice * 0.06) * 100) / 100).toFixed(2)}`;
	};
	
	const elements = {};
	if ('addEventListener' in document && 'querySelector' in document) {
		document.addEventListener('DOMContentLoaded', () => {
			if ('classList' in document.body) { // Document.body is available after DOMContentLoaded
				elements.storeLink = document.querySelector('a#store');
				elements.cartLink = document.querySelector('a#cart');
				SetCartButton(false);
				elements.storeSection = document.querySelector('section#store');
				elements.cartSection = document.querySelector('section#cart');

				elements.storeLink.addEventListener('click', () => {
					elements.storeSection.classList.remove('hidden');
					elements.cartSection.classList.add('hidden');
				});
				elements.cartLink.addEventListener('click', () => {
					if (elements.cartSection.classList.contains('hidden')) {
						elements.cartSection.classList.remove('hidden');
						scrollTo(0,0);
						setTimeout(() => {
							elements.storeSection.classList.add('hidden');
						}, 400);
					} else {
						elements.storeSection.classList.remove('hidden');
						elements.cartSection.classList.add('hidden');
					}
				});

				elements.storeLink.click();
				setTimeout(() => {
					elements.cartSection.style.transition = '.6s ease-out';
				}, 500);

				elements.paymentMethod = document.querySelectorAll('input[name=payment]');
				elements.idealonly = document.querySelectorAll('.idealonly');
				elements.paymentMethod.forEach((method) => {
					method.addEventListener('change', () => {
						const value = GetRadioValue(elements.paymentMethod);
						if (value == 'ideal') {
							elements.idealonly.forEach((element) => {
								element.classList.remove('hidden');
							});
						} else {
							elements.idealonly.forEach((element) => {
								element.classList.add('hidden');
							});
						}
					});
				});
				
				InitShoppingCart();
				SetProductButtons();
				FancySVG();
			}
		});
	} else {
		log('Unsupported browser');
	}
})();


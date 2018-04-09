import UI from './UItools/UItools.js';

const log = console.log;

(() => {
	let cartTable;

	const InitShoppingCart = () => {
		cartTable = document.querySelector('#cart tbody');
		document.querySelector('#cart > button').addEventListener('click', SubmitCart);
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
			description: e.target.parentElement.querySelector('p').innerText,
			svg: e.target.parentElement.querySelector('.wrap-svg').innerHTML,
		};

		// If product is already in the cart...
		const currentCartItem = document.querySelector('#p-' + product.id);
		if (currentCartItem) {
			// .. Update amount
			const currentAmount = currentCartItem.querySelector('.amount');
			currentAmount.innerText = parseInt(currentAmount.innerText) + 1;
		} else {
			// .. else render product in cart
			
			const productSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			productSVG.innerHTML = product.svg;
			const productImage = UI.wrap(productSVG, '', '', 'td');

			const productTitle = UI.wrap(product.title, '', '', 'td');

			const description = UI.wrap(product.description, '', '', 'td');

			const amount = UI.wrap('1', 'amount', '', 'td');
	
			UI.renderIn([productImage, productTitle, description, amount], cartTable, 'cart-item', 'p-' + product.id, 'tr');
		}
	};

	const SubmitCart = () => {
		log('You just ordered some crap');
	};

	if ('addEventListener' in document && 'querySelector' in document) {
		document.addEventListener('DOMContentLoaded', () => {
			if ('classList' in document.body) { // Document.body is available after DOMContentLoaded
				location.hash = '#store';
				InitShoppingCart();
				SetProductButtons();
				FancySVG();
			}
		});
	} else {
		log('Unsupported browser');
	}
})();

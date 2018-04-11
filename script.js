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
		} else {
			// .. else render product in cart
			RenderInCart(product);
		}
	};

	const RenderInCart = (product) => {
		const content = [];

		// Image
		const productSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		productSVG.innerHTML = product.svg;
		content.push(UI.wrap(productSVG, '', '', 'td'));

		// Product name
		content.push(UI.wrap(product.title, '', '', 'td'));

		// Description - TODO: Do I need this here?
		content.push(UI.wrap(product.description, '', '', 'td'));

		// Amount (and interactions)
		const buttonSub = UI.getButton('-', 'sub');
		buttonSub.addEventListener('click', (e) => {
			const amount = e.target.parentElement.querySelector('.amount');
			amount.innerText = parseInt(amount.innerText) - 1;
			if (amount.innerText === '0') {
				DeleteFromCart(e.target.parentElement.parentElement);
			}
		});
		const buttonAdd = UI.getButton('+', 'add');
		buttonAdd.addEventListener('click', (e) => {
			const amount = e.target.parentElement.querySelector('.amount');
			amount.innerText = parseInt(amount.innerText) + 1;
		});
		content.push(UI.wrap([buttonSub, UI.getText('1', 'amount'), buttonAdd], '', '', 'td'));

		// Price
		content.push(UI.wrap(product.price, '', '', 'td'));
			
		// Delete
		const buttonX = UI.getButton('❌');
		const buttonDelete = UI.getButton('🗑️', 'hidden');
		buttonX.addEventListener('click', () => {
			buttonDelete.classList.remove('hidden');
			buttonX.classList.add('hidden');
		});
		buttonDelete.addEventListener('click', (e) => {
			DeleteFromCart(e.target.parentElement.parentElement);
		});
		content.push(UI.wrap([buttonX, buttonDelete], '', '', 'td'));

		UI.renderIn(content, cartTable, 'cart-item', 'p-' + product.id, 'tr');
	};

	const DeleteFromCart = (row) => {
		const parent = row.parentElement;
		parent.removeChild(row);
		if (parent.childElementCount === 0) {
			elements.storeLink.click();
		}
	};

	const SubmitCart = () => {
		log('You just ordered some crap');
	};
	
	const elements = {};
	if ('addEventListener' in document && 'querySelector' in document) {
		document.addEventListener('DOMContentLoaded', () => {
			if ('classList' in document.body) { // Document.body is available after DOMContentLoaded
				elements.storeLink = document.querySelector('a#store');
				elements.cartLink = document.querySelector('a#cart');
				elements.storeSection = document.querySelector('section#store');
				elements.cartSection = document.querySelector('section#cart');

				elements.storeLink.addEventListener('click', () => {
					elements.storeSection.classList.remove('hidden');
					elements.cartSection.classList.add('hidden');
				});
				elements.cartLink.addEventListener('click', () => {
					elements.storeSection.classList.add('hidden');
					elements.cartSection.classList.remove('hidden');
				});

				elements.storeLink.click();
				setTimeout(() => {
					elements.cartSection.style.transition = '.6s ease-out';
				}, 500);
				
				InitShoppingCart();
				SetProductButtons();
				FancySVG();
			}
		});
	} else {
		log('Unsupported browser');
	}
})();


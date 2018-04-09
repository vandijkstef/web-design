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
			const cartItem = document.createElement('tr');
			cartItem.id = 'p-' + product.id;
			
			const imageWrapper = document.createElement('td');
			const productImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			productImage.innerHTML = product.svg;
			imageWrapper.appendChild(productImage);
			cartItem.appendChild(imageWrapper);

			const productTitle = document.createElement('td');
			productTitle.innerText = product.title;
			cartItem.appendChild(productTitle);

			const description = document.createElement('td');
			description.innerText = product.description;
			cartItem.appendChild(description);
	
			const amount = document.createElement('td');
			amount.classList.add('amount');
			amount.innerText = 1;
			cartItem.appendChild(amount);
	
			cartTable.appendChild(cartItem);
		}
	};

	const SubmitCart = () => {
		log('You just ordered some crap');
	};

	if ('addEventListener' in document && 'querySelector' in document) {
		document.addEventListener('DOMContentLoaded', () => {
			if ('classList' in document.body) { // Document.body is available after DOMContentLoaded
				InitShoppingCart();
				SetProductButtons();
				FancySVG();
			}
		});
	} else {
		log('Unsupported browser');
	}
})();

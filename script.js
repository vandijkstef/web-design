(() => {
	const SetProductButtons = function() {
		const productButtons = document.querySelectorAll('section#products div button');
		productButtons.forEach((button) => {
			console.log(button);
		});
	};

	if ('addEventListener' in document && 'querySelector' in document) {
		document.addEventListener('DOMContentLoaded', () => {
			SetProductButtons();
		});
	} else {
		console.warn('Unsupported browser');
	}
})();



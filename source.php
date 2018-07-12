<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Get your coffee order together">

		<title>Beans on Demand</title>

		<link rel="stylesheet" href="style.css">
		<script src="script.js" type="module"></script>
	</head>
	<body>
		<header>
			<div>
				<a id="store" href="#"><?php echo file_get_contents('./icons/svg/' . 'coffee-shop' . '.svg'); ?></a>
			</div>
			<h1>Beans on demand</h1>
			<div>
				<a id="cart" href="#"><?php echo file_get_contents('./icons/svg/' . 'shopping-cart' . '.svg'); ?></a>
			</div>
		</header>
		<main>
			<section id="store">
				<h1>What do you want?</h1>
				<!-- <section id="filter" class="products">
					<h3>Filter</h3>
				</section> -->
				<section id="products">
					<?php
						RenderProduct('Coffee', 'Straight up caffination', 'coffee-cup', 'coffee', '2.00');
						RenderProduct('Cappuccino', 'A milky sensation', 'cappuccino', 'coffee', '2.80');
						RenderProduct('Latte', 'Some coffee, more milk', 'latte', 'coffee', '2.40');
						RenderProduct('Espresso', 'Saving water since 1900', 'espresso', 'coffee', '1.80');
						RenderProduct('Iced Coffee', 'Hot Coffee, but cold', 'iced-coffee-1', 'coffee', '2.20');
						RenderProduct('Mocha Coffee', 'When just coffee doesn\'t do it', 'mocha', 'coffee', '2.30');
						RenderProduct('Irish Coffee', 'Unsure if sleepy', 'irish-coffee', 'coffee', '3,50');
						RenderProduct('Hot Chocolate', 'Cacaoffee', 'chocolate', 'drinks', '3,50');
						RenderProduct('Tea', 'Herbal Coffee', 'tea-cup-3', 'drinks', '2.00');
						RenderProduct('Water', 'Coffee without coffee', 'glass-of-water', 'drinks', '1.40');
						RenderProduct('Milk', 'Moo!', 'milk', 'drinks', '1.00');
						RenderProduct('Cookie Chocolate', 'Om nom nom', 'cookie', 'foods', '0.50');
						RenderProduct('Cookie Murican', 'Freedom in dough', 'cookie-1', 'foods', 'freedom');
						RenderProduct('Doughnut', 'You\'re nuts!', 'doughnut', 'foods', '1.25');
						RenderProduct('Muffin', 'Like a cupcake', 'muffin', 'foods', '0.60');
						RenderProduct('Toast', 'Baked Bread', 'toast', 'foods', '0.30');
					?>
				</section>
			</section>
			<section id="cart">
				<h1>Shopping Cart</h1>
				<section id="contents">
					<!-- JS Fills this -->
				</section>
				<section id="totals">
					<!-- JS Fills this -->
					<section>
						<p>Thank you for ordering Beans on Demand. Please choose your payment method</p>
						<input type="radio" name="payment" value="cash" id="cash">
						<label for="cash">Cash</label>
						<input type="radio" name="payment" value="ideal" id="ideal" checked>
						<label for="ideal">iDeal</label>
						<div class="totals">
							<div class="tax">
								<span class="text">6% VAT</span> <span class="value">&euro; 22.22</span>
							</div>
							<div class="total">
								<span class="text">Total</span> <span class="value">&euro; 22.22</span>
							</div>
						</div>
					</section>
					<section>
						<button id="order"><span class="idealonly">Pay &amp; </span>Order</button>
					</section>
				</section>
			</section>
		</main>
		<footer>
				Icons by <a title="Freepik" href="http://www.freepik.com">Freepik</a> from <a title="Flaticon" href="http://www.flaticon.com">www.flaticon.com</a>
		</footer>
	</body>
</html>

<?php
function RenderProduct($name, $description, $svg, $category, $price = "1.23") {
	$id = urlencode(strtolower(str_replace(' ', '-', $name)));
	$addN = '';
	$addNChars = array('a', 'e', 'i', 'o', 'u');
	if (in_array(strtolower($name[0]), $addNChars)) {
		$addN = 'n';
	}
	echo '
	<div id="' . $id . '" class="' . $category . '">
		<h3>' . $name . '</h3>
		<p class="price">&euro; ' . $price . '</p>
		<button>+</button>
		<div class="wrap-svg">' . file_get_contents('./icons/svg/' . $svg . '.svg') . '</div>
		<p class="description">' . $description . '</p>
		<!-- <button>Get a' . $addN . ' ' . $name . '</button> -->
	</div>';
}

?>
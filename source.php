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

				<!-- <section id="filter" class="products">
					<h3>Filter</h3>
				</section> -->
				<section id="products">
					<?php
						RenderProduct('Coffee', 'Straight up caffination', 'coffee-cup', 'coffee');
						RenderProduct('Cappuccino', 'A milky sensation', 'cappuccino', 'coffee');
						RenderProduct('Latte', 'Some coffee, more milk', 'latte', 'coffee');
						RenderProduct('Espresso', 'Saving water since 1900', 'espresso', 'coffee');
						RenderProduct('Iced Coffee', 'Hot Coffee, but cold', 'iced-coffee-1', 'coffee');
						RenderProduct('Mocha Coffee', 'When just coffee doesn\'t do it', 'mocha', 'coffee');
						RenderProduct('Irish Coffee', 'Unsure if sleepy', 'irish-coffee', 'coffee');
						RenderProduct('Hot Chocolate', 'Cacaoffee', 'chocolate', 'drinks');
						RenderProduct('Tea', 'Herbal Coffee', 'tea-cup-3', 'drinks');
						RenderProduct('Water', 'Coffee without coffee', 'glass-of-water', 'drinks');
						RenderProduct('Milk', 'Moo!', 'milk', 'drinks');
						RenderProduct('Cookie Chocolate', 'Om nom nom', 'cookie', 'foods');
						RenderProduct('Cookie Murican', 'Freedom in dough', 'cookie-1', 'foods');
						RenderProduct('Doughnut', 'You\'re nuts!', 'doughnut', 'foods');
						RenderProduct('Muffin', 'Like a cupcake', 'muffin', 'foods');
						RenderProduct('Toast', 'Baked Bread', 'toast', 'foods');
					?>
				</section>
			</section>
			<section id="cart">
				<h1>Shopping Cart</h1>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Product</th>
							<th>Description</th>
							<th>Amount</th>
							<th>Price</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						<!-- JS Fills this -->
					</tbody>
				</table>
				<section id="totals">
					<!-- JS Fills this -->
				</section>
				<button>Pay &amp; Order</button>
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
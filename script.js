document.addEventListener("DOMContentLoaded", () => {
	const cartItems = document.querySelector(".cart-items");
	const cartTotal = document.querySelector(".cart-total p");
	let cart = [];

	document.querySelectorAll(".icon-add-to-cart").forEach((button) => {
		button.addEventListener("click", (event) => {
			event.preventDefault();
			console.log("Button clicked");

			const itemElement = button.closest(".dessert-item");
			if (!itemElement) {
				console.error("Item element not found");
				return;
			}

			const id = itemElement.dataset.id;
			const name = itemElement.querySelector("h4").innerText;

			const price = parseFloat(
				itemElement.querySelector("#price").innerText.replace("$", "")
			);

			addToCart(id, name, price);
		});
	});

	function addToCart(id, name, price) {
		const existingItem = cart.find((item) => item.id === id);
		if (existingItem) {
			existingItem.quantity++;
		} else {
			cart.push({ id, name, price, quantity: 1 });
		}
		updateCartDisplay();
	}

	function updateCartDisplay() {
		cartItems.innerHTML = "";
		let total = 0;

		cart.forEach((item) => {
			total += item.price * item.quantity;
			const cartItem = document.createElement("div");
			cartItem.classList.add("cart-item");
			cartItem.innerHTML = `
				<span>${item.name} - $${item.price} x ${item.quantity}</span>
				<button class="remove" data-id="${item.id}">Remove</button>
			`;
			cartItems.appendChild(cartItem);
		});

		cartTotal.innerText = `Total: $${total.toFixed(2)}`;
		addRemoveEventListeners();
	}

	function addRemoveEventListeners() {
		document.querySelectorAll(".cart-item .remove").forEach((button) => {
			button.addEventListener("click", (event) => {
				const id = button.dataset.id;
				removeFromCart(id);
			});
		});
	}

	function removeFromCart(id) {
		cart = cart.filter((item) => item.id !== id);
		updateCartDisplay();
	}
});

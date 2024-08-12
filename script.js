document.addEventListener("DOMContentLoaded", () => {
	const cartItems = document.querySelector(".cart-items");
	const cartTotal = document.querySelector(".cart-total p");
	let cart = [];

	// Adiciona eventos de clique para os botões de quantidade
	document.querySelectorAll(".quantity-button").forEach((button) => {
		button.addEventListener("click", (event) => {
			const action = button.dataset.action;
			const itemElement = button.closest(".dessert-item");
			if (!itemElement) return;

			const id = itemElement.dataset.id;
			const name = itemElement.querySelector("h4").innerText;
			const price = parseFloat(itemElement.querySelector("#price").innerText.replace("$", ""));
			const quantitySpan = itemElement.querySelector(".quantity");
			let quantity = parseInt(quantitySpan.innerText);

			if (action === "+") {
				quantity++;
				addToCart(id, name, price, quantity);
			} else if (action === "-" && quantity > 0) {
				quantity--;
				updateCartQuantity(id, quantity);
			}

			quantitySpan.innerText = quantity;
		});
	});

	function addToCart(id, name, price, quantity) {
		const existingItem = cart.find((item) => item.id === id);
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			cart.push({ id, name, price, quantity });
		}
		updateCartDisplay();
	}

	function updateCartQuantity(id, quantity) {
		const item = cart.find((item) => item.id === id);
		if (item) {
			if (quantity === 0) {
				cart = cart.filter((item) => item.id !== id);
			} else {
				item.quantity = quantity;
			}
			updateCartDisplay();
		}
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
                <button class="remove" data-id="${item.id}">Remover Item</button>
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

document.addEventListener("DOMContentLoaded", () => {
	// Seletores para o carrinho e suas funções
	const cartItems = document.querySelector(".cart-items");
	const cartTotal = document.querySelector(".cart-total p");
	const cart = {};

	// Função para atualizar o total do carrinho
	function updateCart() {
		let total = 0;
		let itemCount = 0;
		cartItems.innerHTML = "";

		Object.keys(cart).forEach(id => {
			const { name, price, quantity } = cart[id];
			total += price * quantity;
			itemCount += quantity;
			const itemElement = document.createElement("div");
			itemElement.className = "cart-item";
			itemElement.innerHTML = `
                <span>${name} - $${price.toFixed(2)} x ${quantity}</span>
                <button class="remove" data-id="${id}">Remove</button>
            `;
			cartItems.appendChild(itemElement);
		});

		cartTotal.innerHTML = `Total: $${total.toFixed(2)}<br>Total Items: ${itemCount}`;
	}

	// Função para adicionar item ao carrinho
	function addToCart(id, name, price, quantity) {
		if (!cart[id]) {
			cart[id] = { name, price, quantity: 0 };
		}
		cart[id].quantity += quantity;
		updateCart();
	}

	// Adiciona eventos de clique para os botões "+" e "Add to Cart"
	document.querySelectorAll(".quantity-button").forEach(button => {
		button.addEventListener("click", () => {
			const dessertItem = button.closest(".dessert-item");
			const id = dessertItem.dataset.id;
			const quantitySpan = dessertItem.querySelector(".quantity");
			let quantity = parseInt(quantitySpan.textContent);

			if (button.dataset.action === "+") {
				quantity++;
				quantitySpan.textContent = quantity;
				addToCart(id, dessertItem.querySelector("h4").textContent, parseFloat(dessertItem.querySelector(".price").textContent.replace('$', '')), quantity);
			} else if (button.dataset.action === "-" && quantity > 0) {
				quantity--;
				quantitySpan.textContent = quantity;
				addToCart(id, dessertItem.querySelector("h4").textContent, parseFloat(dessertItem.querySelector(".price").textContent.replace('$', '')), quantity);
			}
		});
	});

	document.querySelectorAll(".icon-add-to-cart").forEach(link => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			const dessertItem = link.closest(".dessert-item");
			const id = dessertItem.dataset.id;
			const quantitySpan = dessertItem.querySelector(".quantity");
			const quantity = parseInt(quantitySpan.textContent);

			if (quantity > 0) {
				addToCart(id, dessertItem.querySelector("h4").textContent, parseFloat(dessertItem.querySelector(".price").textContent.replace('$', '')), quantity);
			}
		});
	});

	// Remove item do carrinho
	cartItems.addEventListener("click", (event) => {
		if (event.target.classList.contains("remove")) {
			const id = event.target.dataset.id;
			delete cart[id];
			updateCart();
		}
	});
});

	function shufflePressCards() {
		const grid = document.getElementById("press-grid");
		if (!grid) return;

		const cards = Array.from(grid.children);
		for (let i = cards.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}

		cards.forEach((card) => grid.appendChild(card));
	}

	document.addEventListener("DOMContentLoaded", shufflePressCards, { once: true });
	document.addEventListener("astro:page-load", shufflePressCards);
function flip(flipCard, newNumber) {
	const topHalf = flipCard.querySelector(".top");
	const bottomHalf = flipCard.querySelector(".bottom");
	let startNumber = topHalf.textContent;

	if (startNumber == newNumber) return;

	let topFlip = document.createElement("div");
	let bottomFlip = document.createElement("div");

	topFlip.classList.add("top_flip");
	bottomFlip.classList.add("bottom_flip");

	topFlip.textContent = startNumber;
	bottomFlip.textContent = newNumber;

	topFlip.addEventListener("animationstart", (e) => {
		topHalf.textContent = newNumber;
	});
	topFlip.addEventListener("animationend", (e) => {
		topFlip.remove();
	});
	bottomFlip.addEventListener("animationend", (e) => {
		bottomHalf.textContent = newNumber;
		bottomFlip.remove();
	});

	flipCard.append(topFlip, bottomFlip);
}

const countToDate = new Date().setHours(new Date().getHours() + 24);

let previousTimeBetweenDate;

setInterval(() => {
	const currentDate = new Date().getTime();
	const secondsBetweenDates = Math.floor((countToDate - currentDate) / 1000);
	if (previousTimeBetweenDate !== secondsBetweenDates) {
		flipAllCard(secondsBetweenDates);
	}
	previousTimeBetweenDate = secondsBetweenDates;
}, 250);

function flipAllCard(secondsBetweenDates) {
	const seconds = secondsBetweenDates % 60;
	const minutes = Math.floor(secondsBetweenDates / 60) % 60;
	const hours = Math.floor(secondsBetweenDates / 3600) % 24;

	flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
	flip(
		document.querySelector("[data-minutes-tens]"),
		Math.floor(minutes / 10)
	);
	flip(
		document.querySelector("[data-seconds-tens]"),
		Math.floor(seconds / 10)
	);
	flip(document.querySelector("[data-hours-ones]"), hours % 10);
	flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
	flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

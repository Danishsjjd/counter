const countToDate = new Date("07 dec 2023");
let previousBetweenDate;

function slide(slider, newNumber) {
	const inner = slider.querySelector(".inner");
	let startNumber = inner.textContent;

	if (startNumber == newNumber) return;

	const nextSlider = document.createElement("div");
	nextSlider.classList.add("next_slider");
	nextSlider.textContent = newNumber;
	inner.textContent = startNumber;
	slider.classList.add("will_change");
	inner.addEventListener("animationend", (e) => {
		nextSlider.remove();
		inner.textContent = newNumber;
		slider.classList.remove("will_change");
	});
	slider.append(nextSlider);
}

function updateCounter() {
	const currentDate = new Date();
	const timeBetweenDates = Math.floor((countToDate - currentDate) / 1000);
	if (previousBetweenDate !== timeBetweenDates) {
		slideAllCard(timeBetweenDates);
	}
	previousBetweenDate = timeBetweenDates;
	setTimeout(() => {
		updateCounter();
	}, 1000);
}
(async function () {
	try {
		updateCounter();
	} catch (error) {
		document.body.innerText =
			"following error while calling updateCounter " + error;
	}
})();

function slideAllCard(time) {
	let seconds = time % 60;
	let minutes = Math.floor(time / 60) % 60;
	let hours = Math.floor(time / 3600) % 24;
	let days = Math.floor(time / 3600 / 24);

	days < 0 ? (days = 0) : (days = days);
	minutes < 0 ? (minutes = 0) : (minutes = minutes);
	seconds < 0 ? (seconds = 0) : (seconds = seconds);
	hours < 0 ? (hours = 0) : (hours = hours);

	slide(
		document.querySelector("[data-days-hundreds]"),
		Math.floor(days / 10)
			.toString()
			.charAt(0)
	);
	if (
		Math.floor(days / 10)
			.toString()
			.charAt(1) <= 0
	) {
		document.querySelector("[data-days-tens]").style.display = "none";
	} else {
		slide(
			document.querySelector("[data-days-tens]"),
			Math.floor(days / 10)
				.toString()
				.charAt(1)
		);
	}
	slide(document.querySelector("[data-days-ones]"), Math.floor(days % 10));

	console.log();

	slide(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
	slide(
		document.querySelector("[data-minutes-tens]"),
		Math.floor(minutes / 10)
	);
	slide(
		document.querySelector("[data-seconds-tens]"),
		Math.floor(seconds / 10)
	);
	slide(document.querySelector("[data-hours-ones]"), hours % 10);
	slide(document.querySelector("[data-minutes-ones]"), minutes % 10);
	slide(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

const countToDate = new Date().setHours(new Date().getHours() + 24);
let previousBetweenDate;

function slide(slider, newNumber) {
    const inner = slider.querySelector(".inner")
    let startNumber = inner.textContent

    if (startNumber == newNumber) return

    const nextSlider = document.createElement("div")
    nextSlider.classList.add("next_slider")
    nextSlider.textContent = newNumber
    inner.textContent = startNumber
    slider.classList.add("will_change")
    inner.addEventListener("animationend", e => {
        nextSlider.remove()
        inner.textContent = newNumber
        slider.classList.remove("will_change")
    })
    slider.append(nextSlider)
}
setInterval(() => {
    const currentDate = new Date()
    const timeBetweenDates = Math.floor((countToDate - currentDate) / 1000)
    if (previousBetweenDate !== timeBetweenDates) {
        slideAllCard(timeBetweenDates)
    }
    previousBetweenDate = timeBetweenDates

}, 250)

function slideAllCard(time) {
    const seconds = time % 60
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600) % 24

    slide(document.querySelector('[data-hours-tens]'), Math.floor(hours / 10))
    slide(document.querySelector('[data-minutes-tens]'), Math.floor(minutes / 10))
    slide(document.querySelector('[data-seconds-tens]'), Math.floor(seconds / 10))
    slide(document.querySelector('[data-hours-ones]'), hours % 10)
    slide(document.querySelector('[data-minutes-ones]'), minutes % 10)
    slide(document.querySelector('[data-seconds-ones]'), seconds % 10)
}

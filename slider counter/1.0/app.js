(async function () {
    try {
        const date = "07 december 2023"
        const initCounter = date => {
            const remainingTimeObj = date => {
                const timeInS = Math.floor((date - new Date().getTime()) / 1000)
                const seconds = timeInS % 60
                const minutes = Math.floor((timeInS / 60) % 60)
                const hours = Math.floor((timeInS / 60 / 60) % 24)
                const days = Math.floor((timeInS / 60 / 60 / 24))
                const obj = {}
                obj.seconds = seconds < 10 ? "0" + seconds : seconds
                obj.minutes = minutes < 10 ? "0" + minutes : minutes
                obj.hours = hours < 10 ? "0" + hours : hours
                obj.days = days < 10 ? "0" + days : days
                return obj
            }
            const timeInMs = new Date(date).getTime()
            const currentTime = remainingTimeObj(timeInMs)
            const oneSecondBeforeTime = remainingTimeObj(timeInMs - 1000)
            Object.entries(currentTime)
                .map(time => {
                    document.querySelector(`.${time[0]}`).innerHTML = `<h1 class="title">${time[0]}</h1>` + 
                    time[1].toString().split("")
                        .map((element, index) => {
                            let d = 9;
                            if (
                                index === 0 &&
                                (time[0] === "seconds" || time[0] === "minutes")
                            ) d = 5
                            if (
                                index === 0 &&
                                (time[0] === "hours")
                            ) d = 2
                            const previousTime = oneSecondBeforeTime?.[time[0]].toString()[index] || 0
                            const isChange = element !== previousTime
                            return `<span class="digit ${isChange ? "will_change" : ""}" data-next=${element - 1 > -1 ? element - 1 : d}>
                        <span class="inner">${element}</span>
                                </span>`
                        }).join("")
                })
        }
        setInterval(() => {
            initCounter(date)
        }, 1000);
        initCounter(date)
    }
    catch (error) {
        document.querySelector('.counter').innerHTML = "400 something failed"
    }
})()
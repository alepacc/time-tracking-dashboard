//——————————— json data ——————————————
async function requestData() {
  try {
    const response = await fetch("../data.json")
    if (!response.ok) throw new Error("error on JSON")

    const data = await response.json()
    return data 
  } catch (err) {
    console.error(err)
  }
}

async function init() {
  const json = await requestData() //
    //————————— switch button of time period  ——————————

    const timeOptions = document.querySelectorAll(".switch-time span")
    // const json = requestData()

    timeOptions.forEach(option => {
        option.addEventListener("click", (e) => {
            e.preventDefault()

            // remove selcted
            timeOptions.forEach(opt => opt.classList.remove("selected"))

            // adding selected on the clicked element
            option.classList.add("selected")

            // save selceted period 
            const selectedPeriod = option.classList[0]
            console.log("selected period: ", selectedPeriod)

            // change data on page
            // const cards = ['work', 'play', 'study', 'exercise', 'social', 'selfcare']
            // for each card update hours and previous hours
            const cards = { 0: 'work', 1: 'play', 2: 'study', 3: 'exercise', 4: 'social', 5: 'selfcare' }
            Object.entries(cards).forEach(([key, item]) => {// item = value        
                const hrs = document.querySelector(`.${item} .time-data .hours`)
                const prev = document.querySelector(`.${item} .time-data .previous`)
                const current = json[key].timeframes[selectedPeriod].current
                const previous = json[key].timeframes[selectedPeriod].previous
                hrs.innerText = `${current}hrs`
                var timeText = ''
                if (selectedPeriod === 'daily') timeText = 'Yesterday'
                else if (selectedPeriod === 'weekly') timeText = 'Last week'
                else if (selectedPeriod === 'monthly') timeText = 'Last month'
                prev.innerText = `${timeText} - ${previous}hrs`
            })
            

        })
    })
}

document.addEventListener("DOMContentLoaded", init)




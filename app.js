// app state
const appState = {
    data: {},
    selectedRate: {}
}

// URL
const baseURL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service"

const endpoint = "/v2/accounting/od/avg_interest_rates"

const url = baseURL + endpoint

// Function to get up to date rates
function getRates (){
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        appState.data = data.data
        renderNav()
    })
}

// Function to build the nav
function renderNav() {
    const descriptions = appState.data.map((rate) => rate.security_desc)

    document.querySelector("nav").innerHTML = ""

    for (let desc of descriptions){
        const div = document.createElement("div")
        div.innerText = desc
        div.setAttribute("id", desc)
        document.querySelector("nav").append(div)
        div.addEventListener("click", (event) => {
            renderRate(desc)
        })
    }
}

function renderRate(whichRate) {
    appState.selectedRate = appState.data.find((rate) => rate.security_desc === whichRate)
    console.log(appState.selectedRate)
    const rate = appState.selectedRate
    const html = `
    <div>
    <h1>${rate.security_desc}</h1>
    <h2>${rate.avg_interest_rate_amt}</h2>
    </div>
    `
    const main = document.querySelector("main")
    main.innerHTML = html

}



// initial fetch of rates
getRates()

// button event
document.querySelector("button").addEventListener("click", () => {
    getRates()
    alert("rates updated")
})
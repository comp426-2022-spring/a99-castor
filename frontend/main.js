let information = null;

getInformation = async (e) => {

    try {
        await fetch(
            `https://api.covidactnow.org/v2/counties.json?apiKey=dae2063fb9a24a0da3677ec88adae3e0`
        ).then(
            (res) => res.json()
        ).then(
        info => {
            information = info
        }
        )
    } catch(err){
        console.log(err)
    }
    console.log(information);

    var filteredInformation = {};

    Object.keys(information).forEach(function(key){
        if (information[key].fips == 37135){
            filteredInformation[key] = information[key]
        }
    })
    
    console.log(filteredInformation);

    let totalCases = filteredInformation[1724].actuals.cases;
    let totalVaccinated = filteredInformation[1724].actuals.vaccinationsCompleted;
    let totalDeaths = filteredInformation[1724].actuals.deaths;
    let lastUpdateDate = filteredInformation[1724].lastUpdatedDate;

    console.log(totalCases);
    console.log(totalVaccinated);

    let lastUpdateString = "Last Updated: " + lastUpdateDate
    document.getElementById("lastUpdateDate").innerHTML = lastUpdateString
    document.getElementById("totalCases").innerHTML = totalCases
    document.getElementById("totalVac").innerHTML = totalVaccinated
    document.getElementById("totalDeaths").innerHTML = totalDeaths
}
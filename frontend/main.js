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

    let totalPopulation = filteredInformation[1724].population; 
    let totalCases = filteredInformation[1724].actuals.cases;
    let totalVaccinated = filteredInformation[1724].actuals.vaccinationsCompleted;
    let totalDeaths = filteredInformation[1724].actuals.deaths;
    let lastUpdateDate = filteredInformation[1724].lastUpdatedDate;

    //5 variables for the Bar Chart 
    let bedsWithCovidPatientsRatio = filteredInformation[1724].metrics.bedsWithCovidPatientsRatio; 
    let ICUCapacityRatio = filteredInformation[1724].metrics.icuCapacityRatio; 
    let infectionRate = filteredInformation[1724].metrics.infectionRate; 
    let testPositiveRatio = filteredInformation[1724].metrics.testPositivityRatio; 
    let vacToPopRatio = totalVaccinated / totalPopulation; 


    console.log(totalCases);
    console.log(totalVaccinated);

    
    let lastUpdateString = "Last Updated: " + lastUpdateDate
    document.getElementById("lastUpdateDate").innerHTML = lastUpdateString
    document.getElementById("totalCases").innerHTML = totalCases
    document.getElementById("totalVac").innerHTML = totalVaccinated
    document.getElementById("totalDeaths").innerHTML = totalDeaths
}
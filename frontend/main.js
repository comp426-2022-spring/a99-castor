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

    //5 variables for the Bar Chart from .03 to 1.43
    let bedsWithCovidPatientsRatio = filteredInformation[1724].metrics.bedsWithCovidPatientsRatio; 
    let ICUCapacityRatio = filteredInformation[1724].metrics.icuCapacityRatio; 
    let infectionRate = filteredInformation[1724].metrics.infectionRate; 
    let testPositiveRatio = filteredInformation[1724].metrics.testPositivityRatio; 
    let vacToPopRatio = totalVaccinated / totalPopulation; 

     //CHART
     new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
          labels: ["covid beds / all beds", "ICU Capacity", "Infection Rate", "Positivity Rate", "(maybe leave out) vactopop"],
          datasets: [
            {
              label: "todo ratios",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: [bedsWithCovidPatientsRatio,ICUCapacityRatio,infectionRate,testPositiveRatio,vacToPopRatio]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: '(tonamebetter) misc. ratios'
          }
        }
    });
    //END CHART
    //totalVaccinated / totalPopulation;
    var theVaccinated = totalVaccinated / totalPopulation;
    var theUnvaccinated = 1 - theVaccinated;
    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
          labels: ["Total Vaccinated", "Total Unvaccinated"],
          datasets: [{
            label: "todo 1",
            backgroundColor: ["#3e95cd", "#8e5ea2"],
            data: [theVaccinated,theUnvaccinated]
          }]
        },
        options: {
          title: {
            display: true,
            text: 'todo 2'
          }
        }
    });


    console.log(totalCases);
    console.log(totalVaccinated);

    
    let lastUpdateString = "Last Updated: " + lastUpdateDate
    document.getElementById("lastUpdateDate").innerHTML = lastUpdateString
    document.getElementById("totalCases").innerHTML = totalCases
    document.getElementById("totalVac").innerHTML = totalVaccinated
    document.getElementById("totalDeaths").innerHTML = totalDeaths


    //test stuff for time chart
    const masterDate = "2022-04-24";
    var oldDate = masterDate;
    //todo fix this
    var currDate = filteredInformation[1724].lastUpdatedDate;

    newCaseArr = [];
    newCaseArr.length = 5;

    if (oldDate != currDate) {
      oldDate = currDate;
      newCaseArr = filteredInformation[1724].actuals.newCases;
      for (let i = 0; i < 4; i++) {
        newCaseArr[4-i] = newCaseArr[4-i-1];
      }
    }
    //the idea is that today's new cases is newCaseArr[0]
    //yesterday's new cases is newCaseArr[1]
    //the idea of the shift is
    // [14, 53, 77, 9] becomes [53, 77, 9, today's cases]
    //end stuff for time chart
}
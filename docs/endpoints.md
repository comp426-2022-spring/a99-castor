# Document API endpoints

## /views/index.html 

  -This is the main page of our website and where we display most of our important graphs and covid dashboard information 
  
## /views/main.js 

  -This is the javascript file of our API call/fetch method. Fetches API from Covid Act Now API 
  -uses special key and then a fetch command to call the api information and store into an array 
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
  
## /views/login.ejs 

  -This is the login page that our website uses with MangoDB
  
## /views/register.ejs

  -This is the register an account page for our website using MangoDB
  
## /views/forget.ejs

  -This is the page that is for if you forget your account information 

/* Global Variables */
const zipcode = document.getElementById('zip').value;
const userfeeling = document.getElementById('feelings').value;
const userInfo = document.getElementById('userInfo');

// Base URL and API Key for OpenWeatherMap API
const apiKey = '7dabfffe66086ea321b91f61b6205af5';
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    e.preventDefault();
    getWeather(baseURL, zipcode, apiKey)
        .then(function (userData) {
            // add data to POST request
            postData('/add', { temp: userData.main.temp, date: newDate, content: content })
        }).then(function (newData) {
            // call updateUI to update browser userfeeling
            updateUI()
        })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipcode, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(baseURL + zipcode + apiKey);
    try {
        // userData equals to the result of fetch function
        const userData = await res.json();
        return userData;
    } catch (error) {
        console.log("error", error);
    }
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    })

    try {
        const newData = await req.json();
        return newData;
    }
    catch (error) {
        console.log(error);
    }
};


const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()
        // update new entry values
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
        console.log("error", error);
    }
};

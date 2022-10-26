
let zipCodeTB = document.getElementById('zipCodeTB');

let submitButton = document.getElementById('submitButton');

let resultsContainer = document.getElementById('resultsContainer');

//function to make API call
async function fetchZone(zip) {
    let response = await fetch(`https://phzmapi.org/${zip}.json`);
    console.log("this is the response", response)
    let zoneResults = await response.json();

    return zoneResults;
}

submitButton.addEventListener('click', async () => {
    let zipCode = zipCodeTB.value;

    const zipCodeRegex = /^\d{5}$/

    if (zipCodeRegex.test(zipCode)) {

        let result = await fetchZone(zipCode);

        let zone = `
            <div class="zoneDisplay">
            <h2> Your Growing Zone </h2>
            <span><strong>Zone:</strong> ${result.zone} </span>
            <span><strong>Temperature Range:</strong> ${result.temperature_range}</span>
            <span><strong>Lattitude:</strong> ${result.coordinates.lat}</span>
            <span><strong>Longitude:</strong> ${result.coordinates.lon}</span>
        `

        resultsContainer.innerHTML = zone
        zipCode.value = ''
    
    } else {
        resultsContainer.innerHTML = "Please enter a valid zip code"
        zipCodeTB.value = '';
    }
    

    
})
const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all').then(res => res.json()).then(data => showCountries(data));
}

const showCountries = (countries) => {
    const countrySection = document.getElementById('countries');

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
        <h3><span style='font-weight:bold;'>Common name:</span> <span style="color:#70a1ff;">${country.name.common}</span></h3>
        <p><span style='font-weight:bold;'>Capital:</span> ${country.capital}</p>
        <button id='details-btn' onClick=loadCountryByName('${country.name.common}')>Details</button>
        `;
        countrySection.appendChild(countryDiv);
    });
}
loadCountries();

// document.getElementById('details-btn').addEventListener('click', (name) => {
//     fetch(`https://restcountries.com/v3.1/name/${name}`).then(res => res.json()).then(data => showCountries(data));
// })
const loadCountryByName = name => {
    fetch(`https://restcountries.com/v3.1/name/${name}`).then(res => res.json()).then(data => countryByNames(data));
}

function countryByNames(countries) {
    const countryDetail = document.getElementById('country-detail');
    for (const country of countries) {
        countryDetail.innerHTML = `
        <h4>Name of the country: ${country.name.official}</h4>
       <img src='${country.flags.png}'>
        <p><span style='font-weight:bold;'>Population:</span> ${country.population}</p>
        <p><span style='font-weight:bold;'>Area:</span> ${country.area}</p>
        <p><span style='font-weight:bold;'>Capital:</span> ${country.capital[0]}</p>
        <p><span style='font-weight:bold;'>Car Side:</span> ${country.car.side}</p>
        `;
        console.log(country);
    }
}
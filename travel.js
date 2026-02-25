
const searchBtn = document.querySelector('.search-btn');
const clearBtn = document.querySelector('.clear-btn');
const searchInput = document.querySelector('.search-box input');


const resultsContainer = document.createElement('div');
resultsContainer.className = 'results-container';
document.querySelector('main').appendChild(resultsContainer);


let travelData = {};
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
    })
    .catch(error => console.error("Error fetching data:", error));


searchBtn.addEventListener('click', () => {
    
    const keyword = searchInput.value.toLowerCase().trim();
    
    
    resultsContainer.innerHTML = ''; 

    if (!keyword) return; 

    let results = [];

    
    if (keyword.includes('beach') || keyword.includes('beaches')) {
        results = travelData.beaches || [];
    } else if (keyword.includes('temple') || keyword.includes('temples')) {
        results = travelData.temples || [];
    } else if (keyword.includes('country') || keyword.includes('countries')) {
        
        if (travelData.countries) {
            travelData.countries.forEach(country => {
                results = results.concat(country.cities);
            });
        }
    }

    if (results.length > 0) {
        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="visit-btn">Visit</button>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = '<div class="no-results">No recommendations found for this keyword. Try "beach", "temple", or "country".</div>';
    }
});


clearBtn.addEventListener('click', () => {
    
    searchInput.value = '';
   
    resultsContainer.innerHTML = '';
});


const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log('Current time in New York:', newYorkTime);

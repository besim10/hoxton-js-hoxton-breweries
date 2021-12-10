// Write your code here

const baseUrl = 'https://api.openbrewerydb.org/breweries'

const filterSection = document.querySelector('.filters-section')
const articleEl = document.querySelector('article')
const selectFormState = document.querySelector('#select-state-form')
const listOfBreweriesH1El = document.querySelector('.list-of-breweries')
const filterByCityForm = document.querySelector('.filter-by-city-form')
const searchBar = document.querySelector('.search-bar')

const state = {
    breweries:[],
    breweryTypes: ['micro', 'regional', 'brewpub'],
    selectedBreweryTypes : '',
    selectedState : null,
    selectedCities: []
    
}

//// SERVER FUNCTIONS

function fetchDataFromServer(){
    return fetch(baseUrl).then(resp => resp.json())
}


function fetchDataByState(state){
    return fetch(`${baseUrl}?by_state=${state}&per_page=50`).then(resp => resp.json())
}
/// HELPER FUNCTION

function getBreweriesToDisplay(){
    breweriesToDisplay = state.breweries

    breweriesToDisplay = breweriesToDisplay.filter(brewery => state.breweryTypes.includes(brewery.brewery_type))

    if(state.selectedBreweryTypes !== ''){
        breweriesToDisplay = breweriesToDisplay.filter(brewery => brewery.brewery_type === state.selectedBreweryTypes)
    }
    if(state.selectedCities.length > 0){
        breweriesToDisplay = breweriesToDisplay.filter(brewery => state.selectedCities.includes(brewery.city))
    }
    
    return breweriesToDisplay.slice(0,10)
}

function getCitiesFromBreweries(breweries){
    let cities = []
    for(const brewery of breweries){
        if(!cities.includes(brewery.city)){
            cities.push(brewery.city)
        }
    }
    return cities
}
//RENDER FUNCTIONS

function renderFiltersSection(){

    filterSection.innerHTML = ''

    const filterByEl = document.createElement('h2')
    filterByEl.textContent = 'Filter By:'

    const filterByTypeFormEl = document.createElement('form')
    filterByTypeFormEl.setAttribute('id','filter-by-type-form')
    filterByTypeFormEl.setAttribute('autocomplete','off')

    const labelEl = document.createElement('label')
    labelEl.setAttribute('for','filter-by-type')

    const h3El = document.createElement('h3')
    h3El.textContent = 'Type of Brewery'

    const selectEl = document.createElement('select')
    selectEl.setAttribute('name','filter-by-type')
    selectEl.setAttribute('id','filter-by-type')
    
    const selectOptionEl = document.createElement('option')
    selectOptionEl.setAttribute('value','')
    selectOptionEl.textContent = 'Select a type...'

    const microEl = document.createElement('option')
    microEl.setAttribute('value',`micro`)
    microEl.textContent = 'Micro'

    const regionalEl = document.createElement('option')
    regionalEl.setAttribute('value',`regional`)
    regionalEl.textContent = 'Regional'

    const brewpubEl = document.createElement('option')
    brewpubEl.setAttribute('value',`brewpub`)
    brewpubEl.textContent = 'Brewpub'

    
    const filterByCityEl = document.createElement('div')
    filterByCityEl.setAttribute('class','filter-by-city-heading')

    const h3CitiesEl = document.createElement('h3')
    h3CitiesEl.textContent = 'Cities'

    const clearAllBtnEl = document.createElement('button')
    clearAllBtnEl.setAttribute('class','clear-all-btn')
    clearAllBtnEl.textContent = 'clear all'

    const filterByCityFormEl = document.createElement('form')
    filterByCityFormEl.setAttribute('id','filter-by-city-form')

    let cities = []
    cities = getCitiesFromBreweries(state.breweries)


    for(const city of cities){

    inputEl = document.createElement('input')
    inputEl.setAttribute('class','city-input')
    inputEl.setAttribute('id', city)
    inputEl.setAttribute('type','checkbox')
    inputEl.setAttribute('name', city)
    inputEl.setAttribute('value', city)
    
    const filterByCityFormLabelEl = document.createElement('label')
    filterByCityFormLabelEl.setAttribute('for', city)
    filterByCityFormLabelEl.textContent = city


    if (state.selectedCities.includes(city)) inputEl.checked = true

  
    inputEl.addEventListener('change', function () {
      // update state.selectedCities
      const cityCheckboxes = document.querySelectorAll('.city-input')
      let selectedCities = []
      for (const checkbox of cityCheckboxes) {
        if (checkbox.checked) selectedCities.push(checkbox.value)
      }
  
      // link the current state of the checkboxes with *state.selectedSCities*
      state.selectedCities = selectedCities
  
      // render
      render()
    })

    filterByCityFormEl.append(inputEl, filterByCityFormLabelEl)
    
    }

    filterSection.append(filterByEl, filterByEl, filterByTypeFormEl, filterByCityEl, filterByCityFormEl)
    filterByTypeFormEl.append(labelEl, selectEl)
    labelEl.append(h3El)
    selectEl.append(selectOptionEl, microEl, regionalEl, brewpubEl)
    filterByCityEl.append(h3CitiesEl, clearAllBtnEl)
    
    selectEl.value = state.selectedBreweryTypes

    selectEl.addEventListener('change',function(){

        state.selectedBreweryTypes = selectEl.value

        render()

    })

    clearAllBtnEl.addEventListener('click',function(event){
        
        event.preventDefault()
        
        state.selectedCities = []

        render()

    })
}

function renderOneArticle(article){

    const breweriesListUlEl = document.createElement('ul')
    breweriesListUlEl.setAttribute('class','breweries-list')

    const breweriesLiEl = document.createElement('li')

    const titleh2El = document.createElement('h2')
    titleh2El.textContent = article.name

    const typeEl = document.createElement('div')
    typeEl.setAttribute('class','type')
    typeEl.textContent = article.brewery_type

    const addressEl = document.createElement('section')
    addressEl.setAttribute('class','address')

    const titleAddressEl = document.createElement('h3')
    titleAddressEl.textContent = 'Address:'
    const roadAddressEl = document.createElement('p')
    roadAddressEl.textContent = article.street
    const cityAddressEl = document.createElement('p')
    const strongEl = document.createElement('strong')
    strongEl.textContent = `${article.city}, ${article.postal_code}`

    const phoneEl = document.createElement('section')
    phoneEl.setAttribute('class','phone')
    const titlePhoneEl = document.createElement('h3')
    titlePhoneEl.textContent = 'Phone:'
    const phoneNumberEl = document.createElement('p')
    phoneNumberEl.textContent = article.phone

    const linkEl = document.createElement('section')
    linkEl.setAttribute('class','link')
    const anchorTagEl = document.createElement('a')
    anchorTagEl.setAttribute('href',`${article.website_url}`)
    anchorTagEl.setAttribute('target','_blank')
    anchorTagEl.textContent = 'Visit Website'


    articleEl.append(breweriesListUlEl)
    breweriesListUlEl.append(breweriesLiEl)
    breweriesLiEl.append(titleh2El, typeEl, addressEl, phoneEl, linkEl)
    addressEl.append(titleAddressEl, roadAddressEl, cityAddressEl)
    cityAddressEl.append(strongEl)
    phoneEl.append(titlePhoneEl, phoneNumberEl)
    linkEl.append(anchorTagEl)

}

function renderAllArticle(){
    if(state.breweries.length > 0){
        filterSection.style.display = 'block'
        listOfBreweriesH1El.style.display = 'block'
        searchBar.style.display = 'block'
    }else{
        filterSection.style.display = 'none'
        listOfBreweriesH1El.style.display = 'none'
        searchBar.style.display = 'none'
    }

    articleEl.innerHTML = ''
    const articleToShow = getBreweriesToDisplay()
    for(const article of articleToShow){
        renderOneArticle(article)
    }
}

function listenToSelectFromState(){
    selectFormState.addEventListener('submit',function(event){
        
        event.preventDefault()

        let value = selectFormState['select-state'].value

        if(value !== null && value !== ''){

            state.selectedState = value

            listOfBreweriesH1El.textContent = `List of Breweries for State: ${value}`

            fetchDataByState(state.selectedState).then(function (statesFromResponse){
                state.breweries = statesFromResponse
                render()
            })
        }
    })
}

// function listenToInputCheckbox(){
    
//     let cityCheckBoxes = document.querySelectorAll('.city-input')
//     cityCheckBoxes = [...cityCheckBoxes]

//     filterByCityForm.addEventListener(function(){

//         for(const checkbox of cityCheckBoxes){
//             console.log(checkbox)
//         }
//     })
// }
function render(){
    renderAllArticle()
    renderFiltersSection()
}

function init(){
    listenToSelectFromState()
    // listenToInputCheckbox()
    render()
}
init()

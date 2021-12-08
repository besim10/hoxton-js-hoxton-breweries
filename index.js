// Write your code here
const main = document.querySelector('main')
const articleEl = document.querySelector('article')

const state = {
    breweries:[]
}

function renderFiltersSection(){
    const filtersSectionEl = document.createElement('aside')
    filtersSectionEl.setAttribute('class','filters-section')

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
    selectOptionEl.setAttribute('value',' ')
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

    const inputEl = document.createElement('input')
    inputEl.setAttribute('type','checkbox')
    inputEl.setAttribute('name','chardon')
    inputEl.setAttribute('value','chardon')

    const filterByCityFormLabelEl = document.createElement('label')
    filterByCityFormLabelEl.setAttribute('for','chardon')
    filterByCityFormLabelEl.textContent = 'Chardon'

    main.append(filtersSectionEl)
    filtersSectionEl.append(filterByEl, filterByEl, filterByTypeFormEl, filterByCityEl, filterByCityFormEl)
    filterByTypeFormEl.append(labelEl, selectEl)
    labelEl.append(h3El)
    selectEl.append(selectOptionEl, microEl, regionalEl, brewpubEl)
    filterByCityEl.append(h3CitiesEl, clearAllBtnEl)
    filterByCityFormEl.append(inputEl, filterByCityFormLabelEl)
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
    articleEl.innerHTML = ''
    for(const article of state.breweries){
        renderOneArticle(article)
    }
}
function getData() {
    return fetch('https://api.openbrewerydb.org/breweries?per_page=10&page=5').then(function (resp) {
      return resp.json()
    })
}
getData().then(function (dataFromServer) {
    state.breweries = dataFromServer
    console.log(state)
    render()
})
function render(){
    renderAllArticle()
    renderFiltersSection()
}
render()
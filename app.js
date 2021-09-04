// loading display animation 
const loadingDisplay=(prop)=>{
    const loading = document.getElementById('loading');
    loading.style.display = `${prop}`; 
}

// context change 
const changeContext=(Id)=>{
    const message = document.getElementById(Id);
    message.textContent = "";
}

document.getElementById("search-btn").addEventListener('click', ()=>{
    const searchInputText = document.getElementById('search-input');
    const searchInputTextValue = searchInputText.value;
    changeContext('message');
    loadingDisplay('block');
    searchInputText.value = "";
    if(searchInputTextValue == ""){
        loadingDisplay('none');
        changeContext('display');
        const message = document.getElementById('message');
        message.innerHTML=`
        <p class="text-danger tw-bold">Please search something!!!!</p>`;
    }
    else{
        searchCocktail(searchInputTextValue);
    }
})

// search cocktail 
const searchCocktail=(inputValue)=>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.drinks){
            changeContext('display');
            displsyData(data.drinks)
        }
        else{
            loadingDisplay('none');
            changeContext('display');
            const message = document.getElementById('message');
            message.innerHTML=`
            <p class="text-danger tw-bold">No result was found for your search!!!!</p>`;
        }
    });
}

// const displaydata 
const displsyData=(data)=>{
    data = data.slice(0, 10);
    loadingDisplay('none');
    data.forEach(item => {
        const display = document.getElementById('display');
        const div = document.createElement("div");
        div.classList.add('col-lg-4');
        div.classList.add('col-md-6');
        div.classList.add('col-sm-12');
        div.innerHTML = `
        <div class="card" style="width: 18rem;" >
            <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.strDrink}</h5>
                <p class="card-text">${item.strInstructions.substring(0, 60)}</p>
                <button type="button" class="btn banner-button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="displayDetail('${item.idDrink}')">
                See details
                </button>
            </div>
        </div>`;
        display.appendChild(div);
        // console.log(item.idDrink);
    })
}

// display detail 
const displayDetail=(Id)=>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${Id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showDetail(data.drinks[0]));
}

// show detail 
const showDetail=(data)=>{
    // data is object 
    const body = document.getElementById('body');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="modal modal-dialog modal-dialog-scrollable pos-abs" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-info" id="exampleModalLabel">${data.strDrink}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-dark">
            <div class="d-flex justify-content-center">
                <div class="w-50">
                    <img src="${data.strDrinkThumb}" class="img-fluid modal-image" alt="...">
                </div>
            </div>
            <div class="mt-2">
                <p class="cat"> <span class="h4">Category : </span>${data.strCategory} </p>
                <p class="glass"> <span class="h4">Glass : </span> ${data.strGlass} </p>
                <p class="ins"> <span class="h4">Instruction : </span> ${data.strInstructions} </p>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    body.appendChild(div);
}
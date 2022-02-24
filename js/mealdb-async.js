document.getElementById('search-btn').addEventListener('click', () => {
    document.getElementById('search-result').textContent = '';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    if (searchText !== '') {
        mealLoad(searchText);
    } else {
        document.getElementById('search-result').innerHTML = '<span class="text-danger">Searchbox is empty, please provide valid keyword</span>';
    }
})

const mealLoad = async name => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await res.json()

        showMeal(data);
    } catch (error) {
        displayError();
    }

    // .then(res => res.json())
    // .then(data => showMeal(data));
}


const showMeal = data => {
    const searchResult = document.getElementById('search-result');
    if (data.meals != null) {
        for (const meal of data.meals) {
            const div = document.createElement('div');
            div.classList.add('col-lg-3');
            div.innerHTML = ` <div class="card m-3" style="width: 18rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p>${meal.strCategory}</p>
                <p class="card-text">${meal.strArea}</p>
               
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick="showMealDetail(${meal.idMeal})">
                Cooking Instructions
                </button> 
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">How to cook <span class='text-info'> </span></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Understood</button>
                    </div>
                    </div>
                </div>
                </div>
    
            </div>
            </div>`

            searchResult.appendChild(div);


        }
    } else {
        searchResult.innerHTML = '<span class="text-white">Meal Not Found</span>';
    }

}

const showMealDetail = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(res => res.json()).then(data => mealInstructions(data));
}
const mealInstructions = (data) => {
    document.querySelector('.modal-body').innerHTML = data.meals[0].strInstructions;
    document.querySelector('.text-info').innerHTML = data.meals[0].strMeal;
}

const displayError = () => {
    document.getElementById('search-result').innerHTML = '<span class="text-danger">Something went wrong, please try again later!</span>';
}
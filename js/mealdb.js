document.getElementById('search-btn').addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    mealLoad(searchText);
})

const mealLoad = (name) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then(res => res.json()).then(data => showMeal(data));
}


const showMeal = (data) => {
    for (const meal of data.meals) {
        console.log(meal.strMeal);
    }
}
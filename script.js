

const categoryContainer = document.getElementById('categoryContainer')
const greenContainer = document.getElementById('newsContainer')
const detailsBox = document.getElementById('details-container')
const addCard = document.getElementById('addToCard')


const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
        const categories = data.categories
        // console.log(categories)
        showCategory(categories)
    })
    .catch((err) => {
        console.log(err);
    })
}

const showCategory = (categories) => {
categories.forEach(cat => {
            // console.log(cat.category_name)
            categoryContainer.innerHTML += `
            <li id = "${cat.id}" class="text-left w-full btn-secondary font-semibold
            hover:bg-green-600 cursor-pointer px-3 py-2 rounded">${cat.category_name}</li>
            `;
        })
        categoryContainer.addEventListener('click', (e) => {
            const alLi = document.querySelectorAll('li')
            alLi.forEach(li => {
                li.classList.remove('bg-green-600')
            })
            if(e.target.localName === 'li'){
                // console.log(e.target.id)
                showLoading()
                e.target.classList.add('bg-green-600')
                loadGreenByCategory(e.target.id)
            }
        })
}

const loadGreenByCategory = (categoryId) =>{
    // console.log(categoryId)
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.plants)
        showNewsByCategory(data.plants)
    })

    const showNewsByCategory = (plants) =>{
        // console.log(plants)
        newsContainer.innerHTML = "";
        plants.forEach(plant => {
            newsContainer.innerHTML += `
            <div class="card bg-base-100 w-full shadow-sm">
    <figure class=" h-60">
    <img src="${plant.image}" class="rounded-xl" />
    </figure>
    <div class="card-body">
    <h2 id="${plant.id}" onclick="loadWordDetail(${plant.id})" class="card-title hover:bg-green-200 cursor-pointer">${plant.name}</h2>
    <p class="text-sm">${plant.description}</p>
    <div class="flex justify-between font-bold">
        <div><p class=" bg-[#DCFCE7] text-[#15803D] rounded-3xl p-2">${plant.category}</p></div>
        <div>
        <p id="${plant.id}"><span><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</span></p>
        </div>
    </div>
    <div class="card-actions">
    <button class="btn text-white w-full rounded-3xl bg-[#15803D]">Add to Cart</button>
    </div>
    </div>
</div>
            `;
        })
    }
}

const showLoading = () => {
    newsContainer.innerHTML = `
    <div class ="text-xl text-center font-bold">Loading....</div>
    `
}

const loadWordDetail =(id) => {
    const url = `https://openapi.programming-hero.com/api/plants`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayWordDetails(data.plants);
    })
}
    const displayWordDetails = (plant) =>{
    // console.log(plan)
    detailsBox.innerHTML = `

        <h3 class ="mb-3 font-bold">${plant.name}</h3>
    <div class="card w-full">
    <figure class=" h-60">
    <img src="${plant.image}" class="rounded-xl" />
    </figure>
    <div class="card-body">
    <h2 class="card-title font-bold">Category: ${plant.category}</h2>
    <p class ="font-bold">Price: <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
    <p>Description: ${plant.description}</p>
    </div>
</div>
    `;
    document.getElementById('word_box').showModal()
}

let addCards = [];
newsContainer.addEventListener('click', (e) => {
    // console.log(e.target.innerText)

    if(e.target.innerText === 'Add to Cart'){
        handleCards(e)
    }
})

const handleCards = (e) => {
        const title = (e.target.parentNode.parentNode.children[0].innerText)
        const taka = (e.target.parentNode.parentNode.children[2].children[1].innerText)
        const id = e.target.parentNode.parentNode.id
        // console.log(id)
        addCards.push({
            title: title,
            taka: taka,
            id: id
        })
        // console.log(addCards)
        showCarts(addCards)
        showCarts(addCards)
        alert(`✅ ${title} has added to the cart...`)
}

const showCarts = (addCards) =>{
    addCard.innerHTML = "";
    addCards.forEach(add => {
        addCard.innerHTML += `
        <div class="w-full mt-1">
        <div class="flex justify-between rounded-lg p-2 bg-[#CFF0DC]">
        <div>
            <h2 class="font-semibold">${add.title}</h2>
        <p class="text-gray-500">৳<span>${add.taka}</span></p>
        </div>
        <div>
        <button onclick ="deleteCartBox('${add.id}')" class="cursor-pointer text-xl">❌</button>
        </div>
    </div>
    
        
    </div>
        `;
    })
};

const deleteCartBox = (cartBoxId) => {
    // console.log(cartBoxId)
    const filterCart = addCards.filter(addCard => addCard.id !== cartBoxId)
    addCards = filterCart
    showCarts(addCards)
}


loadCategory()
loadGreenByCategory()







function handleLoader(isLoading) {
    let loadingPart = document.getElementById('loadingPart');
    if (isLoading) {
        loadingPart.classList.remove('hidden');
    }
    else {
        loadingPart.classList.add('hidden');
    }
}


let phoneLoader = async (isShowAll) => {
    //loading starts here
    handleLoader(true)

    let searchField = document.getElementById('searchField');
    let searchText = searchField.value || 'oppo';
    // if (!searchText) {
    //     alert('Enter phone name');
    //     return;
    // }

    let phones = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    let phone = await phones.json();

    showPhone(phone , isShowAll)
}


let showPhone = (phone,isShowAll) => {
    let phoneList = phone.data;

    let phoneContainer = document.getElementById('phoneContainer');
    let showAllBtn = document.getElementById('showAllBtn');

    //only this single line of code prevents it from making duplicate
    phoneContainer.textContent = '';


    if (phoneList.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }

    // console.log('is show all', isShowAll)
    //showing particuler number of phone
    if(!isShowAll){
        phoneList = phoneList.slice(0, 12)
    }

    phoneList.forEach(element => {
        // console.log(element)

        let div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-xl'
        div.innerHTML = `
        <figure class="px-10 pt-10">
                <img src="${element.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${element.phone_name}</h2>
                <p>${element.brand}</p>
                <div class="card-actions">
                    <button onclick="handleShowDetail('${element.slug}')" class="btn btn-success text-white">Show Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(div)
    });

    //loading ends here
    handleLoader(false)

}

// handle show all
let handleShowAll = () => {
    phoneLoader(true);
}

//handleShowDetail function
let handleShowDetail = async (id) =>{
    console.log('clicked', id)
    let res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    let data = await res.json();
    let particulerData = data.data;
    console.log(particulerData)

    showIndividualModal(particulerData)
}

let showIndividualModal = (particulerData) =>{

    let barndName = document.getElementById('barndName');
    barndName.innerText = `${particulerData.name}`
    
    showDetails_modal.showModal();
}


// showing default phones 
phoneLoader()
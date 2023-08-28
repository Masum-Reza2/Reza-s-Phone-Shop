function handleLoader(x = true) {
    let loadingPart = document.getElementById('loadingPart');
    if (x) {
        loadingPart.classList.remove('hidden');
    }
    else {
        loadingPart.classList.add('hidden');
    }
}


let phoneLoader = async () => {

    let searchField = document.getElementById('searchField');
    let searchText = searchField.value;
    if (!searchText) {
        alert('Enter phone name');
        return;
    }

    let phones = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    let phone = await phones.json();

    showPhone(phone)
}


let showPhone = (phone) => {
    let phoneList = phone.data;

    let phoneContainer = document.getElementById('phoneContainer');
    let showAllBtn = document.getElementById('showAllBtn');

    //only this single line of code prevents it from making duplicate
    phoneContainer.textContent = '';


    if (phoneList.length > 12) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }

    //showing particuler number of phone
    phoneList = phoneList.slice(0, 12)

    phoneList.forEach(element => {

        let div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-xl'
        div.innerHTML = `
        <figure class="px-10 pt-10">
                <img src="${element.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${element.phone_name}</h2>
                <p>${element.slug}</p>
                <div class="card-actions">
                    <button class="btn btn-success">Buy Now</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(div)
    });

    handleLoader(x = false)

}

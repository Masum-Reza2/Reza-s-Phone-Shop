let phoneLoader = async () => {

    let searchField = document.getElementById('searchField');
    let searchText = searchField.value;
    if(!searchText){
        alert('Enter phone name');
        return;
    }
    
    let phones = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    let phone = await phones.json();
    showPhone(phone)
}


let showPhone = (phone) => {
    let phoneContainer = document.getElementById('phoneContainer');

    //only this single line of code prevents it from making duplicate
    phoneContainer.textContent = '';

    let phoneList = phone.data;

    phoneList.forEach(element => {
        console.log(element)
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

}
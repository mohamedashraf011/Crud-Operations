var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDescription');
var productImageInput = document.getElementById('productImage');
var productSearchInput = document.getElementById('productSearch');

var uName = document.getElementById('uName');
var uPrice = document.getElementById('uPrice');
var uCategory = document.getElementById('uCategory');
var uDesc = document.getElementById('uDesc');
var uImage = document.getElementById('uImage');

var productList = [];
var updateIndex = null;

if (localStorage.getItem('productList')) {
    productList = JSON.parse(localStorage.getItem('productList'));
    displayProucts();
}

function addProduct() {
    if (
        validate(productNameInput, nameRegex, 'nameError') &&
        validate(productPriceInput, priceRegex, 'priceError') &&
        validate(productCategoryInput, categoryRegex, 'categoryError') &&
        validate(productDescInput, descRegex, 'descError')
    ) {
        var imageValue = productImageInput.files[0]
            ? productImageInput.files[0].name
            : 'portfolio-3.jpg';

        productList.push({
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value,
            image: `images/${imageValue}`
        });

        localStorage.setItem('productList', JSON.stringify(productList));
        displayProucts();
        clearForm();

        Swal.fire("Success", "Product Added Successfully", "success");
    }
}

function displayProucts() {

    var box = "";

    for (var i = 0; i < productList.length; i++) {
        box += `
        <div class="my-card col-md-6 col-lg-4 col-xl-3">
            <div class="inner shadow-lg rounded-3 overflow-hidden">

                <img class="w-100" src="${productList[i].image}" alt="${productList[i].name}">

                <div class="p-2">
                    <span class="badge text-bg-info text-white">
                        Index : ${i}
                    </span>
                    <h5>Product Name : ${productList[i].name}</h5>
                    <p>Price : ${productList[i].price}</p>
                    <p>Category : ${productList[i].category}</p>
                    <p>Description : ${productList[i].desc}</p>
                </div>

                <div class="border-top bg-body-tertiary p-2 d-flex justify-content-center gap-2">

                    <button
                        onclick="openUpdateModal(${i})"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        class="btn btn-outline-warning">
                        Update <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                        onclick="deleteProduct(${i})"
                        class="btn btn-outline-danger">
                        Delete <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>
        </div>
        `;
    }

    document.getElementById('rowData').innerHTML = box;
}


function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem('productList', JSON.stringify(productList));
    displayProucts();
}

function searchProduct() {
    var term = productSearchInput.value.toLowerCase();
    document.getElementById('rowData').innerHTML = productList
        .filter(p => p.name.toLowerCase().includes(term))
        .map(p => `
            <div class="col-md-3">
                <div class="card shadow">
                    <img src="${p.image}" class="card-img-top">
                    <div class="card-body">
                        <h5>${p.name}</h5>
                        <p>${p.price}</p>
                    </div>
                </div>
            </div>
        `).join('');
}

function openUpdateModal(index) {
    updateIndex = index;

    uName.value = productList[index].name;
    uPrice.value = productList[index].price;
    uCategory.value = productList[index].category;
    uDesc.value = productList[index].desc;

    resetModalValidation();
}

function updateProduct() {

    if (
        validate(uName, nameRegex, 'uNameError') &&
        validate(uPrice, priceRegex, 'uPriceError') &&
        validate(uCategory, categoryRegex, 'uCategoryError') &&
        validate(uDesc, descRegex, 'uDescError')
    ) {

        var imageValue = uImage.files[0]
            ? uImage.files[0].name
            : productList[updateIndex].image.split('/')[1];

        productList[updateIndex] = {
            name: uName.value,
            price: uPrice.value,
            category: uCategory.value,
            desc: uDesc.value,
            image: `images/${imageValue}`
        };

        localStorage.setItem('productList', JSON.stringify(productList));
        displayProucts();

        bootstrap.Modal.getInstance(
            document.getElementById('updateModal')
        ).hide();

        Swal.fire("Updated", "Product Updated Successfully", "success");
    }
}

function clearForm() {
    [productNameInput, productPriceInput, productCategoryInput, productDescInput]
        .forEach(input => input.classList.remove('is-valid', 'is-invalid'));
}

var nameRegex = /^[A-Z][a-z]{2,15}$/;
var priceRegex = /^[1-9][0-9]{2,8}$/;
var categoryRegex = /^[A-Z][a-z]{3,15}$/;
var descRegex = /.*[a-zA-Z].*/;

function validate(input, regex, errorId) {
    if (regex.test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        document.getElementById(errorId).classList.add('d-none');
        return true;
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        document.getElementById(errorId).classList.remove('d-none');
        return false;
    }
}

function resetModalValidation() {
    [uName, uPrice, uCategory, uDesc]
        .forEach(input => input.classList.remove('is-valid', 'is-invalid'));
}


























// function validateName(){
//     var nameRegex = /^[A-Z][a-z]{3,15}$/;

//     if(nameRegex.test(productNameInput.value)){
//         // productNameInput.classList.add('is-valid');
//         // productNameInput.classList.remove('is-invalid');
//         // console.log('tmam');
//         // document.getElementById('nameError').classList.add('d-none');

//         return true;
//     }

//     else{
//         // productNameInput.classList.add('is-invalid');
//         // productNameInput.classList.remove('is-valid');
//         // console.log('no tmam');
//         // document.getElementById('nameError').classList.remove('d-none');


//         Swal.fire({
//         icon: "Error",
//         title: "Oops...",
//         text: "Please enter a valid name",
//         });

//         return false;
//     }
// }




// function handleSubmit(){
//     if(!validateName()){
//         Swal.fire({
//             icon: "warning",
//             title: "Oops...",
//             text: "Please enter a valid name",
//         });

//         return false;
//     }

//     else{
//         Swal.fire({
//             icon: "success",
//             title: "Good Job...",
//             text: "Product Added Successfully",
//         });

//         return true;
//     }
// }








// var productNameInput = document.getElementById('productName');
// var productPriceInput = document.getElementById('productPrice');
// var productCategoryInput = document.getElementById('productCategory');
// var productDescInput = document.getElementById('productDescription');

// var productList = [];

// if(localStorage.getItem("productList") != null){

//     productList = localStorage.getItem("productList");
//     productList = JSON.parse(productList);

//     displayProucts();
// }


// function addProduct(){
    
//     var product = {
//         name : productNameInput.value,
//         price : productPriceInput.value,
//         category : productCategoryInput.value,
//         desc : productDescInput.value,
//         image : 'images/portfolio-3.jpg'
//     }

//     productList.push(product);

//     localStorage.setItem("productList" , JSON.stringify(productList));

//     displayProucts();

//     clearForm();

//     console.log(productList);

// }

// function displayProucts(){

//     var box = '';

//     for(var i = 0 ; i < productList.length ; i++){
//         box += `
        
//                 <div class="my-card col-md-6 col-lg-4 col-xl-3">

//                     <div class="inner shadow-lg rounded-3 overflow-hidden">
//                         <img class="w-100" src="images/portfolio-3.jpg" alt="">

//                         <div class="p-2">
//                             <span class="badge text-bg-info text-white">Index : ${i}  </span>
//                             <h5>Product Name : ${productList[i].name}</h5>
//                             <p>Price : ${productList[i].price}</p>
//                             <p>Category : ${productList[i].category}</p>
//                             <p>Description : ${productList[i].desc}</p>
//                         </div>
//                         <div class="border-top bg-body-tertiary p-2 d-flex justify-content-center gap-2">
//                             <button onclick="UpdateProduct(${i})" class="btn btn-outline-warning">Update <i
//                                 class="fa-solid fa-pen-to-square"></i></button>
//                             <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete <i
//                                 class="fa-solid fa-trash"></i></button>
//                         </div>
//                     </div>
//                 </div>
//         `
//     }


//     document.getElementById('rowData').innerHTML = box;
// }


// function clearForm(){
//     productNameInput.value = '';
//     productPriceInput.value = '';
//     productCategoryInput.value = '';
//     productDescInput.value = '';
// }


// function deleteProduct(index){
//     productList.splice(index,1);
//     localStorage.setItem("productList" , JSON.stringify(productList));
//     displayProucts();
// }


// function UpdateProduct(index){
//     productNameInput.value = productList[index].name;
//     productPriceInput.value = productList[index].price;
//     productCategoryInput.value = productList[index].category;
//     productDescInput.value = productList[index].desc;

    
//     displayProucts();
    
// }

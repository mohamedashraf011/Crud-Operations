var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDescription');
var productSearchInput = document.getElementById('productSearch');
var productImageInput = document.getElementById('productImage');

var productList = [];

if(localStorage.getItem('productList') != null){
    productList = JSON.parse(localStorage.getItem('productList'));

    displayProucts();
}

function addProduct(){

    if(validateName() && validatePrice() && validateCategory() && validateDesc()){

        var imageValue = productImageInput.files[0] ? productImageInput.files[0].name : 'portfolio-3.jpg';

        var product = {
            name : productNameInput.value,
            price : productPriceInput.value,
            category : productCategoryInput.value,
            desc : productDescInput.value,
            image : `images/${imageValue}`
        }

        productList.push(product);

        localStorage.setItem('productList', JSON.stringify(productList));

        displayProucts();

        clearForm();

        // console.log(productList);

        Swal.fire({
            icon: "success",
            title: "Good Job...",
            text: "Product Added Successfully",
        });


    }

    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Product Not Added",
        });
    }

}


function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productImageInput.value = "";
}


function displayProucts(){

    var box = "";

    for(var i = 0 ; i < productList.length ; i++){
        box+= `
                <div class="my-card col-md-6 col-lg-4 col-xl-3">
                    <div class="inner shadow-lg rounded-3 overflow-hidden">
                        <img class="w-100" src="${productList[i].image}" alt="${productList[i].name}">

                        <div class="p-2">
                            <span class="badge text-bg-info text-white">Index : ${i}  </span>
                            <h5>Product Name : ${productList[i].name}</h5>
                            <p>Price : ${productList[i].price}</p>
                            <p>Category : ${productList[i].category}</p>
                            <p>Description : ${productList[i].desc}</p>
                        </div>
                        <div class="border-top bg-body-tertiary p-2 d-flex justify-content-center gap-2">
                            <button class="btn btn-outline-warning">Update <i
                                class="fa-solid fa-pen-to-square"></i></button>
                            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete <i
                                class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
        `
    }

    document.getElementById('rowData').innerHTML = box;
}


function deleteProduct(index){
    productList.splice(index , 1);
    localStorage.setItem('productList', JSON.stringify(productList));
    displayProucts();

}


function searchProduct(){
    // console.log(productSearchInput.value);

    var searchValue = productSearchInput.value;
    var box = "";

    for(var i = 0 ; i < productList.length ; i++){
        if(productList[i].name.toLowerCase().includes(searchValue.toLowerCase())){
            box+= `
                <div class="my-card col-md-6 col-lg-4 col-xl-3">
                    <div class="inner shadow-lg rounded-3 overflow-hidden">
                        <img class="w-100" src="${productList[i].image}" alt="${productList[i].name}">

                        <div class="p-2">
                            <span class="badge text-bg-info text-white">Index : ${i}  </span>
                            <h5>Product Name : ${productList[i].name}</h5>
                            <p>Price : ${productList[i].price}</p>
                            <p>Category : ${productList[i].category}</p>
                            <p>Description : ${productList[i].desc}</p>
                        </div>
                        <div class="border-top bg-body-tertiary p-2 d-flex justify-content-center gap-2">
                            <button class="btn btn-outline-warning">Update <i
                                class="fa-solid fa-pen-to-square"></i></button>
                            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete <i
                                class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
        `
        }
    }

    document.getElementById('rowData').innerHTML = box;
}




function validateName(){
    var nameRegex = /^[A-Z][a-z]{2,15}$/;

    if(nameRegex.test(productNameInput.value)){
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        document.getElementById('nameError').classList.add('d-none');
        return true;
    }

    else{
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        document.getElementById('nameError').classList.remove('d-none');
        return false;
    }
}




function validatePrice(){

    var priceRegex = /^[1-9][0-9]{2,8}$/;

    if (priceRegex.test(productPriceInput.value)) {
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
        document.getElementById('priceError').classList.add('d-none');
        return true;
    }

    else{
        productPriceInput.classList.add('is-invalid');
        productPriceInput.classList.remove('is-valid');
        document.getElementById('priceError').classList.remove('d-none');
        return false;
    }
}



function validateCategory(){

    var categoryRegex = /^[A-Z][a-z]{3,15}$/;

    if (categoryRegex.test(productCategoryInput.value)) {
        productCategoryInput.classList.add('is-valid');
        productCategoryInput.classList.remove('is-invalid');
        document.getElementById('categoryError').classList.add('d-none');
        return true;
    }

    else{
        productCategoryInput.classList.add('is-invalid');
        productCategoryInput.classList.remove('is-valid');
        document.getElementById('categoryError').classList.remove('d-none');
        return false;
    }
    
}


function validateDesc(){

    // var descRegex = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
    var descRegex = /.*[a-zA-Z].*/;


    if (descRegex.test(productDescInput.value)) {
        productDescInput.classList.add('is-valid');
        productDescInput.classList.remove('is-invalid');
        document.getElementById('descError').classList.add('d-none');
        return true;
    }

    else{
        productDescInput.classList.add('is-invalid');
        productDescInput.classList.remove('is-valid');
        document.getElementById('descError').classList.remove('d-none');
        return false;
    }

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

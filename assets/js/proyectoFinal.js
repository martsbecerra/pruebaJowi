//Tomo valor de boton de "agregar al carrito"
let addToShopBtn = document.querySelectorAll(`.addToShopBtn`);
//Selecciono contenedor de elementos que se mostraran en el carrito
let shoppingCartItemsContainer = document.querySelector(`.shoppingCartItemsContainer`);
//Capturo botón de comprar
let buyButton = document.querySelector(`.buyButton`);
buyButton.addEventListener(`click`, buyProducts)

//Recorro botones de items
addToShopBtn.forEach(button => {
    button.addEventListener(`click`, addToCartButton);
});

//Función que captura titulo, precio e imagen del producto
function addToCartButton(e) {

    let product = e.target
    //Captura clase padre de la tarjeta
    let item = product.closest(`.item`);
    //Capturamos título, precio e imagen para pasar como parámetro ↓
    let itemTitle = item.querySelector(`.itemTitle`).textContent;
    let itemPrice = item.querySelector(`.itemPrice`).textContent;
    let itemImage = item.querySelector(`.itemImage`).src;
    //Ejecuta función que renderiza productos ↓
    addItemToShoppingCart(itemTitle, itemPrice, itemImage)

}

//Función que renderiza productos seleccionados 
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

    //Captura titulos del contenedor de elementos del carrito
    let elementsTitle = shoppingCartItemsContainer.getElementsByClassName(`shoppingCartItemTitle`);
    //Itera entre los titulos
    for (let i = 0; i < elementsTitle.length; i++) {
        //Evalúa si el título "i" es igual al titulo agregado
        if (elementsTitle[i].innerText == itemTitle) {
            //Caso sea igual se  captura el nodo correspondiente al a "Q"
            let elementQuantity = elementsTitle[i].parentNode.parentNode.querySelector(`.shoppingCartItemQuantity`);
            //Suma 1 a la cantidad
            elementQuantity.value++;
            updateTotalPrice();
            //Sale de la función para que no se agregue nuevamente el item al carrito
            return;
        }
    }

    let shoppingCartRow = document.createElement(`div`);
    //Crea template del producto a agregar en el contenedor
    let shopingCartContent =
        `    
    <div class="shoppingCartItem">                
        <div>
            <img class="shoppingCartItemImage" src=${itemImage} alt="tiny img" width="50px">
        </div>
        <div>
            <p class="shoppingCartItemTitle">${itemTitle}</p>
        </div>
        <div>
            <p class="shoppingCartItemPrice">${itemPrice}</p>
        </div>
        <div>
            <input class="shoppingCartItemQuantity" style="width: 50px;" min="1" max="99" type="number" value="1">
        </div>
        <div>
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>                                           
    `
    //Se le asigna el template a la variable "shoppingCartRow"
    shoppingCartRow.innerHTML = shopingCartContent
    //Se renderiza el template
    shoppingCartItemsContainer.append(shoppingCartRow)
    //Captura el botón de eliminar del carrito y crea un evento click que ejecuta función
    shoppingCartRow.querySelector(`.buttonDelete`)
        .addEventListener(`click`, removeShoppingCartItem)
    //Captura el botón de cantidad y crea un evento change que ejecuta función
    shoppingCartRow.querySelector(`.shoppingCartItemQuantity`)
        .addEventListener(`change`, updateTotalPrice)
    //Se ejecuta la función encargada de actualizar el precio ↓
    updateTotalPrice()

}

//Función que renderiza el precio del producto agregado
function updateTotalPrice() {

    //Total $ de productos agregados
    let total = 0;
    //Donde se visualizará el total
    let shoppingCartTotal = document.querySelector(`.shoppingCartTotal`);
    //Clase de cada contenedor de un nuevo producto que se ve en el carrito
    let shoppingCartItems = document.querySelectorAll(`.shoppingCartItem`);
    //Recorre todos los productos incluídos en el carrito
    shoppingCartItems.forEach((shoppingCartItem) => {
        //Toma precio de la tarjeta
        let shoppingCartItemPriceElement = shoppingCartItem.querySelector(`.shoppingCartItemPrice`);
        //Convierte en number y le saca el $
        let shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace(`$`, ``));
        //Toma la cantidad (1)
        let shoppingCartItemQuantityElement = shoppingCartItem.querySelector(`.shoppingCartItemQuantity`);
        //Convierte en number
        let shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value)
        //Actualiza el precio total
        total += shoppingCartItemQuantity * shoppingCartItemPrice

    });

    //Renderiza el total en pantalla
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`

}

//Función para remover producto del carrito
function removeShoppingCartItem(e) {

    //Captura botón clickeado
    let buttonClicked = e.target;
    //Remueve el contenedor completo de la tarjeta
    buttonClicked.closest(`.shoppingCartItem`).remove();
    //Ejecuta función para actualizar precio
    updateTotalPrice()

}

//Función para finalizar compra
function buyProducts() {

    //Captura precio
    let shoppingCartTotal = document.querySelector(`.shoppingCartTotal`);
    let totalPrice = shoppingCartTotal.innerText;
    console.log("🚀 ~ file: proyectoFinal.js ~ line 132 ~ buyProducts ~ totalPrice", totalPrice)

    //Caso no haya seleccionado productos se le avisa
    if (totalPrice == "$0.00") {

        Swal.fire({
            title: 'El carrito está vacío',
            icon: `error`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })

    }
    //Caso contrario se le agradece por su compra e informa precio
    else {

        Swal.fire({
            title: `¡Muchas gracias por su compra! \n \n Total: ${totalPrice}`,
            icon: `success`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })

    }
    //Borra contenido de carrito
    shoppingCartItemsContainer.innerHTML = ``
    //Ejecuta función para actualizar precio renderizado
    updateTotalPrice();

}

/* Formulario de ingreso */
//Captura botón
let login = document.querySelector(`.login`);
//Crea evento
login.addEventListener(`click`, verifyUser);
//Función que verifica usuario
function verifyUser() {
    //Captura mail y usuario ingresado
    let mail = document.querySelector(`.input1`).value;
    let pass = document.querySelector(`.input2`).value;
    //Booleano para comprobar si se encuentra o no el usuario
    let usuarioEncontrado = false

    fetch('usuarios.json', {
    })
        .then(response => response.json())
        .then(data => {
            //Recorre colección
            data.users.forEach(user => {
                //Evalúa que coincida mail con contraseña
                if (user.mail = mail && user.pass == pass) {
                    //Si hay coincidencia envia msj de success
                    Swal.fire({
                        title: `¡Bienvenido al sistema ${mail}!`,
                        icon: `success`,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    usuarioEncontrado = true
                }
            })
            //Si no hubo coincidencia envía msj de error
            if (usuarioEncontrado == false) {
                Swal.fire({
                    title: `Usuario o contraseña incorrecto`,
                    icon: `error`
                })
            }
        })
    /* {
    //Recorre colección
    data.forEach(usuario => {
        //Evalúa que coincida mail con contraseña
        if (usuario.mail = mail == mail && usuario.pass == pass) {
            //Si hay coincidencia envia msj de success
            Swal.fire({
                title: `¡Bienvenido al sistema ${mail}!`,
                icon: `success`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            usuarioEncontrado = true
        }
    });
    //Si no hubo coincidencia envía msj de error
    if (usuarioEncontrado == false) {
        Swal.fire({
            title: `Usuario o contraseña incorrecto`,
            icon: `error`
        })
    }

}); */

}

/* Esta última función de registro ↓ queriendo implementar POST no me está funcionando. Si pudiera orientarme sobre el motivo se lo agradecería  */

/* Formulario de registro */

let register = document.querySelector(`.register`);

register.addEventListener(`click`, newRegister);

function newRegister() {

    let mail = document.querySelector(`.input1`).value;
    let pass = document.querySelector(`.input2`).value;

    let newUser = {
        mail: mail,
        pass: pass
    }

    fetch('usuarios.json', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            console.log("error")
            console.log(error)
        })
}


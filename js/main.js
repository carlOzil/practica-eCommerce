document.addEventListener('DOMContentLoaded', () => {

    /// VARIABLES --->>>
    //URL de la API
    const urlBase = "https://dummyjson.com/products";
    //Captación de select para targetearlo en el evento change
    const categSelec = document.querySelector("#cats");
    //Captura deñ div que albergará las categorías sugeridas o solicitadas
    const cajaCat = document.querySelector('#cajaCategorias');
    //Sumatorio inicial de precio final comienza desde 0
    let suma = 0;
    //Captura de la categoría como string vacío para despues hacer uso del valor que pinta el select
    let categoria = '';
    //Capturas para el manejo de los botones del carrito
    const openModalBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("myModal");
    const closeButton = document.querySelector(".close");
    //Creación de fragment para facilitar el traspaso de variables en conjunto de un bloque a otro
    const fragment = document.createDocumentFragment();
    //Seteo del array de productos en el carro que va a albergar el localStorage 
    let arrayCarro = JSON.parse(localStorage.getItem("enelcarro")) || [];
    /// EVENTOS --->>>
    //Evento change para seleccionar categorías a mostrar en el div antes mencionado
    categSelec.addEventListener('change', () => {

        categoria = categSelec.value;
        pintarDesdeSelect()
    });
    //Eventos para desplegar y plegar carrito
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    //DELEGACION de EVENTOS poniendo a la escucha a todo el docmuento de cualquier evento 'click' que ocurra
    document.addEventListener('click', ({ target }) => {
        //Mostrar/Ocultar div del carrito
        if (target.classList.contains('carritoBtn')) {

        };
        //agregar producto al carrito o sumarle uno si ya lo hay
        if (target.classList.contains('agregar')) {

        };
        //Sumar un producto a ese stack
        if (target.classList.contains('btnSuma')) {

        };
        //Restar uno producto de ese stack o borrarlo
        if (target.classList.contains('btnResta')) {

        };
        //vaciar ese o esos productos del carro       
        if (target.classList.contains('btnX')) {

        };
        //Vaciar carrito y local, volver a index.html como si se hubiera pagado
        if (target.classList.contains('btnFin')) {

        };
    });

    /// FUNCIONES --->>>
    //Funcion para añadir al localStorage los productos añadidos al carro
    const agregarLocal = () => {
        localStorage.setItem('enelcarro', JSON.stringify(arrayCarro));
    };

    //Funcion para mostrar la categoría que elijamos desde el select, desestructurar y capturar valores de los productos en el boton de agregar al carro
    const pintarDesdeSelect = async () => {
        const url = `${urlBase}/category/${categoria}`
        try {
            const resp = await fetch(url);

            if (resp.ok) {

                const { products } = await resp.json();
                cajaCat.innerHTML = '';

                products.forEach(({ id, title, price, rating, thumbnail }) => {

                    const cajaP = document.createElement('FIGURE');
                    const fotoP = document.createElement('IMG');
                    fotoP.src = thumbnail;
                    const nombreP = document.createElement('H3');
                    nombreP.textContent = title;
                    const precioP = document.createElement('P');
                    precioP.textContent = price + "€";
                    const rateP = document.createElement('P');
                    rateP.textContent = rating + "stars";
                    const btnAgregar = document.createElement("BUTTON");
                    btnAgregar.classList.add("agregar");

                    btnAgregar.value0 = id;
                    btnAgregar.value1 = title;
                    btnAgregar.value2 = price;
                    btnAgregar.value3 = thumbnail;
                    btnAgregar.textContent = "Agregar al carro";

                    cajaP.append(fotoP, nombreP, precioP, rateP, btnAgregar);
                    fragment.append(cajaP);
                });
                cajaCat.append(fragment);
            } else {
                throw 'No disponible';
            };
        } catch (error) {
            console.log(error);
        };
    };

    //Función para desplegar categorías en el select para evento 'change'
    const selectCategorias = async () => {

        try {
            const resp = await fetch(`${urlBase}/categories`);

            if (resp.ok) {
                const cat = await resp.json();
                cat.forEach((elm) => {
                    const opt = document.createElement('OPTION');
                    opt.value = elm;
                    opt.textContent = elm;
                    fragment.append(opt);
                });
                categSelec.append(fragment);
            } else {
                throw 'Algo salió mal';
            };
        } catch (error) {
            console.log(error);
        };
    };

    const agregarCarrito = () => {

    };

    /// INVOCACIONES --->>>
    selectCategorias();


}) //////////LOAD//////////
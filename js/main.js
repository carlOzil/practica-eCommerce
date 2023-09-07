document.addEventListener('DOMContentLoaded', () => {

    /// VARIABLES --->>>
    //URL de la API
    const urlBase = "https://dummyjson.com/products";
    //Captura por ID de variables para su uso desde el DOM
    //Captación de select para targetearlo en el evento change
    const categSelec = document.querySelector("#cats")
    //Captura deñ div que albergará las categorías sugeridas o solicitadas
    const cajaCat = document.querySelector('#cajaCategorias');
    //Sumatorio inicial de precio final comienza desde 0
    let suma = 0;
    let categoria = '';
    //Creación de fragment para facilitar el traspaso de variables en conjunto de un bloque a otro
    const fragment = document.createDocumentFragment();
    //Seteo del array de productos en el carro que va a albergar el localStorage 
    let arrayCarro = JSON.parse(localStorage.getItem("enelcarro")) || [];
    /// EVENTOS --->>>
    //Evento change para seleccionar categorías a mostrar en el div antes mencionado
    categSelec.addEventListener('change', () => {

        categoria = categSelec.value;
        pintarSugerencias()
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


    const pintarSugerencias = async () => {
        const url = `${urlBase}/category/${categoria}`
        try {
            const res = await fetch(url);

            if (res.ok) {

                const data = await res.json();
                cajaCat.innerHTML = '';

                data.products.forEach(({ title, price, rating, thumbnail }) => {

                    const cajaP = document.createElement('FIGURE');
                    const fotoP = document.createElement('IMG');
                    fotoP.src = thumbnail;
                    const nombreP = document.createElement('H3');
                    nombreP.textContent = title;
                    const precioP = document.createElement('P');
                    precioP.textContent = price;
                    const rateP = document.createElement('P');
                    rateP.textContent = rating;

                    cajaP.append(fotoP, nombreP, precioP, rateP);
                    fragment.append(cajaP)
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
    const mostrarCat = async () => {

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

    //Función asincrona de consulta que retorna una promesa a la espera de la respuesta de la API Fetch
    // const consulta = async (url) => {

    //     try {
    //         const res = await fetch(url)

    //         if (res.ok) {
    //             const data = await res.json()
    //             return {
    //                 ok: true,
    //                 data: data.products
    //             };
    //         } else {
    //             throw ('Fuera de Stock')
    //         };
    //     } catch (error) {
    //         return {
    //             ok: false,
    //             error: error
    //         };
    //     };
    // };



    /// INVOCACIONES --->>>
    mostrarCat();
}) //////////LOAD//////////
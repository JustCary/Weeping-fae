let selectedProduct = null;
let selectedQuantity = 1;


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(containerId, productList) {

    const container =
        document.getElementById(containerId);


    if (!container) {

        console.error(
            "Product container not found:",
            containerId
        );

        return;
    }


    container.innerHTML = "";


    if (!productList || productList.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
            </div>
        `;

        return;
    }


    productList.forEach(function(product) {

        const card =
            document.createElement("div");


        card.className =
            "product";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <p class="product-category">
                ${product.category}
            </p>

            <h3>
                ${product.name}
            </h3>

            <p class="price">
                $${product.price.toFixed(2)}
            </p>

            <p class="${
                product.inventory > 0
                    ? "in-stock"
                    : "sold-out"
            }">

                ${
                    product.inventory > 0
                        ? product.inventory + " available"
                        : "Sold Out"
                }

            </p>

            <button
                type="button"
                class="view-product-button"
            >
                View Piece
            </button>

        `;


        card
            .querySelector(
                ".view-product-button"
            )
            .addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    openProductModal(product);

                }
            );


        card.addEventListener(
            "click",
            function() {

                openProductModal(product);

            }
        );


        container.appendChild(card);

    });

}


/* =========================
   HOMEPAGE PRODUCTS
========================= */

function displayFeaturedProducts() {

    const featured =
        window.products.filter(
            function(product) {

                return product.featured;

            }
        );


    displayProducts(
        "featured-products",
        featured
    );

}


/* =========================
   CATALOG PRODUCTS
========================= */

function displayCatalog() {

    displayProducts(
        "product-list",
        window.products
    );

}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    const searchInput =
        document.getElementById(
            "product-search"
        );


    if (!searchInput) {
        return;
    }


    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    if (searchTerm === "") {

        if (
            document.getElementById(
                "product-list"
            )
        ) {

            displayCatalog();

        }

        else {

            displayProducts(
                "featured-products",
                window.products
            );

        }

        return;
    }


    const results =
        window.products.filter(
            function(product) {

                return (

                    product.name
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    product.description
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    product.materials
                        .toLowerCase()
                        .includes(searchTerm)

                );

            }
        );


    const containerId =
        document.getElementById(
            "product-list"
        )
            ? "product-list"
            : "featured-products";


    displayProducts(
        containerId,
        results
    );

}


/* =========================
   CATEGORY FILTER
========================= */

function filterCategory(category) {

    let results;


    if (category === "All") {

        results =
            window.products;

    }

    else {

        results =
            window.products.filter(
                function(product) {

                    return (
                        product.category ===
                        category
                    );

                }
            );

    }


    const containerId =
        document.getElementById(
            "product-list"
        )
            ? "product-list"
            : "featured-products";


    displayProducts(
        containerId,
        results
    );

}


/* =========================
   PRODUCT POPUP
========================= */

function openProductModal(product) {

    const modal =
        document.getElementById(
            "product-modal"
        );


    if (!modal) {

        console.error(
            "Product modal not found"
        );

        return;
    }


    selectedProduct =
        product;


    selectedQuantity =
        1;


    document.getElementById(
        "modal-product-image"
    ).src =
        product.image;


    document.getElementById(
        "modal-product-image"
    ).alt =
        product.name;


    document.getElementById(
        "modal-product-category"
    ).textContent =
        product.category;


    document.getElementById(
        "modal-product-name"
    ).textContent =
        product.name;


    document.getElementById(
        "modal-product-price"
    ).textContent =
        "$" +
        product.price.toFixed(2);


    document.getElementById(
        "modal-product-description"
    ).textContent =
        product.description;


    document.getElementById(
        "modal-product-materials"
    ).textContent =
        product.materials;


    document.getElementById(
        "modal-product-dimensions"
    ).textContent =
        product.dimensions;


    document.getElementById(
        "modal-product-sku"
    ).textContent =
        product.id;


    document.getElementById(
        "modal-product-availability"
    ).textContent =
        product.inventory > 0
            ? product.inventory +
              " in stock"
            : "Sold Out";


    document.getElementById(
        "product-quantity"
    ).textContent =
        "1";


    const addButton =
        document.getElementById(
            "modal-add-cart"
        );


    if (product.inventory > 0) {

        addButton.disabled =
            false;

        addButton.textContent =
            "Add to Cart";

    }

    else {

        addButton.disabled =
            true;

        addButton.textContent =
            "Sold Out";

    }


    modal.classList.add(
        "open"
    );


    document.getElementById(
        "product-modal-overlay"
    ).style.display =
        "block";

}


function closeProductModal() {

    const modal =
        document.getElementById(
            "product-modal"
        );


    const overlay =
        document.getElementById(
            "product-modal-overlay"
        );


    if (modal) {

        modal.classList.remove(
            "open"
        );

    }


    if (overlay) {

        overlay.style.display =
            "none";

    }

}


/* =========================
   PRODUCT QUANTITY
========================= */

function increaseQuantity() {

    if (!selectedProduct) {
        return;
    }


    const alreadyInCart =
        typeof getCartQuantity ===
        "function"

            ? getCartQuantity(
                selectedProduct.id
            )

            : 0;


    if (
        selectedQuantity +
        alreadyInCart
        <
        selectedProduct.inventory
    ) {

        selectedQuantity++;

    }


    document.getElementById(
        "product-quantity"
    ).textContent =
        selectedQuantity;

}


function decreaseQuantity() {

    if (selectedQuantity > 1) {

        selectedQuantity--;

    }


    document.getElementById(
        "product-quantity"
    ).textContent =
        selectedQuantity;

}


/* =========================
   ADD TO CART
========================= */

function addModalProductToCart() {

    if (!selectedProduct) {
        return;
    }


    addToCart(
        selectedProduct,
        selectedQuantity
    );


    closeProductModal();

    openCart();

}
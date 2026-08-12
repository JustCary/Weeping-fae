let cart =
    JSON.parse(
        localStorage.getItem(
            "cart"
        )
    ) || [];


/*
================================
FIX OLD CART DATA
================================
*/

cart.forEach(
    function(item) {

        if (!item.quantity) {

            item.quantity = 1;

        }

    }
);


/*
================================
SAVE CART
================================
*/

function saveCart() {

    localStorage.setItem(

        "cart",

        JSON.stringify(
            cart
        )

    );

}


/*
================================
GET CART QUANTITY
================================
*/

function getCartQuantity(
    productId
) {

    const item =
        cart.find(
            function(item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    return item
        ? item.quantity
        : 0;

}


/*
================================
ADD TO CART
================================
*/

function addToCart(
    product,
    quantity = 1
) {

    if (
        product.inventory <= 0
    ) {

        alert(
            "This product is sold out."
        );

        return;

    }


    const existingProduct =
        cart.find(
            function(item) {

                return (
                    item.id ===
                    product.id
                );

            }
        );


    const currentQuantity =
        existingProduct
            ? existingProduct.quantity
            : 0;


    if (
        currentQuantity +
        quantity
        >
        product.inventory
    ) {

        alert(
            `Only ${product.inventory} of this item are available.`
        );

        return;

    }


    if (existingProduct) {

        existingProduct.quantity +=
            quantity;

    }

    else {

        cart.push({

            id:
                product.id,

            name:
                product.name,

            price:
                product.price,

            image:
                product.image,

            quantity:
                quantity,

            inventory:
                product.inventory

        });

    }


    saveCart();

    updateCart();

}


/*
================================
UPDATE CART
================================
*/

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    const cartTotal =
        document.getElementById(
            "cart-total"
        );


    if (
        !cartItems ||
        !cartCount ||
        !cartTotal
    ) {

        return;

    }


    cartItems.innerHTML =
        "";


    let totalQuantity =
        0;


    let totalPrice =
        0;


    cart.forEach(
        function(item) {

            totalQuantity +=
                item.quantity;


            totalPrice +=
                item.price *
                item.quantity;

        }
    );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        totalPrice.toFixed(2);


    if (
        cart.length === 0
    ) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;

        return;

    }


    cart.forEach(
        function(item, index) {


            const subtotal =
                item.price *
                item.quantity;


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.classList.add(
                "cart-item"
            );


            cartItem.innerHTML = `

                <div class="cart-product-info">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="cart-product-image"
                    >


                    <div class="cart-product-details">

                        <strong>
                            ${item.name}
                        </strong>


                        <p>
                            $${item.price.toFixed(2)}
                            each
                        </p>


                        <div
                            class="cart-quantity-control"
                        >

                            <button
                                onclick="
                                    decreaseCartQuantity(
                                        ${index}
                                    )
                                "
                                aria-label="
                                    Decrease quantity
                                "
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                onclick="
                                    increaseCartQuantity(
                                        ${index}
                                    )
                                "
                                aria-label="
                                    Increase quantity
                                "
                            >
                                +
                            </button>

                        </div>


                        <p class="cart-subtotal">

                            Subtotal:
                            $${subtotal.toFixed(2)}

                        </p>

                    </div>

                </div>


                <button
                    class="remove-button"
                    onclick="
                        removeFromCart(
                            ${index}
                        )
                    "
                >
                    Remove
                </button>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );

}


/*
================================
CART QUANTITY +
================================
*/

function increaseCartQuantity(
    index
) {

    const item =
        cart[index];


    if (
        item.quantity <
        item.inventory
    ) {

        item.quantity++;

    }

    else {

        alert(
            `Only ${item.inventory} available.`
        );

    }


    saveCart();

    updateCart();

}


/*
================================
CART QUANTITY -
================================
*/

function decreaseCartQuantity(
    index
) {

    if (
        cart[index].quantity >
        1
    ) {

        cart[index].quantity--;

    }

    else {

        cart.splice(
            index,
            1
        );

    }


    saveCart();

    updateCart();

}


/*
================================
REMOVE ITEM
================================
*/

function removeFromCart(
    index
) {

    cart.splice(
        index,
        1
    );


    saveCart();

    updateCart();

}


/*
================================
OPEN CART
================================
*/

function openCart() {

    const cartWindow =
        document.getElementById(
            "cart-window"
        );


    const overlay =
        document.getElementById(
            "cart-overlay"
        );


    if (cartWindow) {

        cartWindow.classList.add(
            "open"
        );

    }


    if (overlay) {

        overlay.style.display =
            "block";

    }

}


/*
================================
CLOSE CART
================================
*/

function closeCart() {

    const cartWindow =
        document.getElementById(
            "cart-window"
        );


    const overlay =
        document.getElementById(
            "cart-overlay"
        );


    if (cartWindow) {

        cartWindow.classList.remove(
            "open"
        );

    }


    if (overlay) {

        overlay.style.display =
            "none";

    }

}


saveCart();
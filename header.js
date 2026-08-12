document.getElementById(
    "site-header"
).innerHTML = `

    <header class="site-header">


        <nav class="left-navigation">

            <a href="catalog.html">
                Catalog
            </a>

            <a href="faq.html">
                FAQ
            </a>

        </nav>


        <a
            href="index.html"
            class="store-logo"
            aria-label="The Weeping Fae home"
        >

            <img
                src="https://auntymonstera.com/cdn/shop/files/White_Sand_Minimalist_Weekly_Schedule_Instagram_Story_Instagram_Post_Square_210x.png?v=1727752611"
                alt="The Weeping Fae"
            >

        </a>


        <nav class="right-navigation">

            <button
                class="search-toggle"
                type="button"
                onclick="toggleSearch()"
            >
                Search
            </button>


            <a href="about.html">
                About
            </a>


            <button
                class="cart-button"
                type="button"
                onclick="openCart()"
            >
                Cart
                (<span id="cart-count">0</span>)
            </button>

        </nav>

    </header>


    <div
        class="header-search"
        id="header-search"
    >

        <input
            type="search"
            id="header-product-search"
            placeholder="Search the collection"
            aria-label="Search the collection"
        >

        <button
            type="button"
            onclick="searchFromHeader()"
        >
            Search
        </button>

    </div>

`;


function toggleSearch() {

    const search =
        document.getElementById(
            "header-search"
        );


    search.classList.toggle(
        "open"
    );

}


function searchFromHeader() {

    const headerSearch =
        document.getElementById(
            "header-product-search"
        );


    const mainSearch =
        document.getElementById(
            "product-search"
        );


    const value =
        headerSearch.value.trim();


    if (mainSearch) {

        mainSearch.value =
            value;

        searchProducts();

    }

    else {

        window.location.href =
            "catalog.html?search=" +
            encodeURIComponent(value);

    }

}
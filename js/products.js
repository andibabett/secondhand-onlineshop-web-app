window.Products = {
    API_BASE_URL: "http://localhost:8090",

    getProducts: function () {
        $.ajax({
            url: Products.API_BASE_URL + "/products",
            method: 'GET'
        }).done(function (response) {
            console.log(response);

            Products.displayProducts(response.content);
        });
    },

    addProductToCart: function (productId) {
        var customerId = 70;
        var requestBody = {
            customerId: customerId,
            productId: productId
        };


        $.ajax( {
            url: Products.API_BASE_URL + "/carts",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            window.location.replace("cart.html");

            Products.addProductToCart(productId);
        })
    },

    getProductHtml: function (product) {
        return `<div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="img/product-2.jpg" alt="">
                        </div>
                        <h2><a href="">${product.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${product.price}</ins> 
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" 
                            data-product_id="${product.id}" rel="nofollow" 
                            href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                        </div>                       
                    </div>
                </div>`
    },

    displayProducts: function (products) {
        let productsHtml = "";

        products.forEach(oneProduct => productsHtml += Products.getProductHtml(oneProduct));

        $(".single-shop-products .row:first-child").html(productsHtml);
    },

    bindEvents: function () {
        $(".single-product-area").delegate(".add_to_cart_button", "click",
            function (event) {
            event.preventDefault();

            let productId = $(this).data("product_id");

            Products.addProductToCart(productId);

        })
    }
};

Products.getProducts();
Products.bindEvents();

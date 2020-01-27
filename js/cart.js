window.Cart = {
    API_BASE_URL: "http://localhost:8090",

    getCart: function () {

        let customerId = 70;

        $.ajax({
            url: Cart.API_BASE_URL + "/carts/" + customerId,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            Cart.displayProducts(response.products);
        })
    },

    displayProducts: function (products) {
        var productsHtml = "";

        products.forEach(oneProduct => productsHtml += Cart.getProductHtml(oneProduct));
        allProductsHtml += Cart.addcheckout();
        $(".shop_table.cart").html(productsHtml);
    },

    addProductToCart: function (productId) {
        var customerId = 70;
        var requestBody = {
            customerId: customerId,
            productId: productId
        };

        $.ajax({
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
        return ` <tr class="cart_item">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove" href="#">×</a> 
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="products.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-thumb-2.jpg"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="products.html">${product.name}</a> 
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">${product.price}</span> 
                                            </td>

                                            <td class="product-quantity">
                                                <div class="quantity buttons_added">
                                                    <input type="button" class="minus" value="-">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                                                    <input type="button" class="plus" value="+">
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">${product.price}</span> 
                                            </td>
                                        </tr>`;
        Cart.getProductHtml(product);
    },
    addPlusButton: function (id) {
        var currentValue = $(`.product-quantity-${id}`).find('input.input-text').val(),
            nextValue = parseInt(currentValue) + 1;
        $(`.product-quantity-${id}`).find('input.input-text').val(nextValue);
    },
    addMinusButton: function (id) {
        var currentValue = $(`.product-quantity-${id}`).find('input.input-text').val(),
            nextValue = parseInt(currentValue) - 1;
        $(`.product-quantity-${id}`).find('input.input-text').val(nextValue);
    },
    deleteProduct: function (productId) {
        console.log(productId);
        $.ajax({
            url: Cart.API_BASE_URL + "/carts/remove/customerId/" + productId,
            method: "DELETE"
        }).done(function (response) {
            $(`.${productId}`).html('');
            Cart.displayProducts(response.products);
        })
    },
    updateProductCount: function () {
        let items = $('.cart_item');
        items.each(function () {
            var id = $(this).find('.productId').val(),
                count = $(this).find('.product-quantity').val();
            Cart.updateSingleProduct(id, count);
        })
    },
    updateSingleProduct: (productId, count) => {
        var requestBody = {
            productId: productId,
            count: count,
        };

        $.ajax({
            url: Cart.API_BASE_URL + "/carts/update/count/15",
            method: "PUT",
            data: JSON.stringify(requestBody),
            contentType: "application/json",
        }).done(function (response) {
            console.log(response);
        })
    },
    addcheckout: function () {
        return ` <tr>
                                            <td class="actions" colspan="6">
<!--                                                <div class="coupon">-->
<!--                                                    <label for="coupon_code">Coupon:</label>-->
<!--                                                    <input type="text" placeholder="Coupon code" value="" id="coupon_code" class="input-text" name="coupon_code">-->
<!--                                                    <input type="submit" value="Apply Coupon" name="apply_coupon" class="button">-->
<!--                                                </div>-->
                                                <button type="button" onclick="Cart.updateProductCount();" class="add_to_cart_button" style="padding: 11px 20px;margin-right: 10px">Update</button>
                                                <input type="submit" onclick="Cart.proceedToCheckout(); return false;" value="Proceed to Checkout" name="proceed"  id="4" class="checkout-button button alt wc-forward">
                                            </td>
                                        </tr>`;
    },

    proceedToCheckout: function () {
        location.href = ("http://localhost:3306/secondhandOnlineshop/checkout.html");

    }
};

Cart.getCart();
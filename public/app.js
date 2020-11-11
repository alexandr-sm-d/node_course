const toCurrency = price => {
    return new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB'
    }).format(+price)
}

document.querySelectorAll('.price')
    .forEach(node => {
        node.textContent = toCurrency(node.textContent)
    })


let $cart = document.querySelector('#cart')
if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id
            fetch('/cart/remove/' + id, {
                method: "delete"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.products.length) {
                        let tr = data.products.map(p => `
                            <tr>
                                <td>${p.title}</td>
                                <td>${p.count}</td>
                                <td>
                                    <button class="btn-small js-remove" data-id="${p.id}">Delete</button>
                                </td>
                            </tr>
                        `).join('')
                        $cart.querySelector('tbody').innerHTML = tr
                        $cart.querySelector('.price').textContent = toCurrency(data.totalPrice)
                    } else {
                        $cart.innerHTML = '<h2>Cart is empty</h2>'
                    }
                })
        }
    })
}

document.querySelectorAll('.price')
    .forEach(node => {
        node.textContent = new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB'
        }).format(+node.textContent)
    })


let $cart = document.querySelector('#cart')
if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            // console.log('button delete')
            const id = event.target.dataset.id
            fetch('/cart/remove/' + id, {
                method: "delete"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
    })
}

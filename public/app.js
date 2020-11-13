const toCurrency = price => {
    return new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB'
    }).format(+price)
}

const toDate = date => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.price')
    .forEach(node => {
        node.textContent = toCurrency(node.textContent)
    })

document.querySelectorAll('.date')
    .forEach(node => {
        node.textContent = toDate(node.textContent)
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
                    if (data.courses.length) {
                        let tr = data.courses.map(p => `
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

M.Tabs.init(document.querySelectorAll('.tabs'))
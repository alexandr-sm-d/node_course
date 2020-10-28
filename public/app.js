document.querySelectorAll('.price')
    .forEach(node => {
        node.textContent = new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB'
        }).format(+node.textContent)
    })
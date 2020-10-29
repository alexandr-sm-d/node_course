const Course = require('./course')
const fsPromises = require('fs/promises');
const path = require("path");

class Cart {

    static getAllPurchaseOrders() {
        return new Promise((resolve, reject) => {
            (async (path) => {
                try {
                    let data = await fsPromises.readFile(path, "utf-8")
                    resolve(JSON.parse(data))
                } catch (err) {
                    reject(err)
                }
            })(path.join(__dirname, '..', 'data', 'cart.json'))
        })
    }

    static async addNewProductToCart(id) {
        try {
            const course = await Course.getByIdCourse(id)
            const cart = await Cart.getAllPurchaseOrders()

            let targetIndex = cart.products.findIndex(product => product.id === id)
            let candidate = cart.products[targetIndex]

            if (candidate) {
                candidate.count++
            } else {
                course.count = 1
                cart.products.push(course)
            }

            cart.totalPrice += +course.price

            return new Promise((resolve, reject) => {
                try {
                    (async (path) => {
                        await fsPromises.writeFile(path, JSON.stringify(cart))
                        resolve()
                    })(path.join(__dirname, '..', 'data', 'cart.json'))
                } catch (e) {
                    reject(e)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    static async removeProductById(id) {
        try {
            const cart = await Cart.getAllPurchaseOrders()
            let targetIndex = cart.products.findIndex(p => p.id === id)
            const course = cart.products[targetIndex]

            if (course.count === 1) {
                cart.products = cart.products.filter(p => p.id !== id)
            } else {
                cart.products[targetIndex].count--
            }

            cart.totalPrice -= course.price

            return new Promise((resolve, reject) => {
                try {
                    (async (path) => {
                        await fsPromises.writeFile(path, JSON.stringify(cart))
                        resolve(cart)
                    })(path.join(__dirname, '..', 'data', 'cart.json'))
                } catch (e) {
                    reject(e)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = Cart
const {Schema, model} = require('mongoose')

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseID: {
                    type: Schema.Types.ObjectID,
                    required: true,
                    ref: 'Courses'
                }
            }
        ]
    }
})

user.methods.addToCart = function (course) {
    let items = [...this.cart.items]
    let index = items.findIndex(c => c.courseID.toString() === course._id.toString())

    if (index >= 0) {
        items[index].count = items[index].count + 1
    } else {
        items.push({
            courseID: course._id,
            count: 1
        })
    }

    this.cart = {items}
    return this.save()
}

module.exports = model('User', user)
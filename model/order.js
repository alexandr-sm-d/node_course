const {Schema, model} = require('mongoose')

const order = new Schema({
    courses: [
        {
            course: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userID: {
            type: Schema.Types.ObjectID,
            ref: 'User',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Order', order)
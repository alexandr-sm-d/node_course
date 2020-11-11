const {Schema, model} = require('mongoose')

// const {v4: uuidv4} = require('uuid');
// const fsPromises = require('fs/promises');
// const path = require("path");
//
// class Course {
//     constructor(title, price, img) {
//         this.title = title
//         this.price = price
//         this.img = img
//         this.id = uuidv4()
//     }
//
//     static getAllCourses() {
//         return new Promise((resolve, reject) => {
//             (async (path) => {
//                 try {
//                     let data = await fsPromises.readFile(path, "utf-8")
//                     resolve(JSON.parse(data))
//                 } catch (err) {
//                     reject(err)
//                 }
//             })(path.join(__dirname, '..', 'data', 'courses.json'))
//         })
//     }
//
//     static async getByIdCourse(id) {
//         const courses = await Course.getAllCourses()
//         return courses.find(c => c.id === id)
//     }
//
//     static async updateCourse(course) {
//         try {
//             const courses = await Course.getAllCourses()
//             let targetIndex = courses.findIndex(c => c.id === course.id)
//             courses[targetIndex] = course
//
//             return new Promise((resolve, reject) => {
//                 try {
//                     (async (path) => {
//                         await fsPromises.writeFile(path, JSON.stringify(courses))
//                         resolve()
//                     })(path.join(__dirname, '..', 'data', 'courses.json'))
//                 } catch (e) {
//                     reject(e)
//                 }
//             })
//         } catch (e) {
//             console.log(e)
//         }
//     }
//
//     getCurrentCourse() {
//         return {
//             title: this.title,
//             price: this.price,
//             img: this.img,
//             id: this.id
//         }
//     }
//
//     async save() {
//         try {
//             let courses = await Course.getAllCourses()
//             courses.push(this.getCurrentCourse())
//             // console.log(typeof courses)
//             console.log('course saved', courses)
//
//             return new Promise((resolve, reject) => {
//                 try {
//                     (async (path) => {
//                         await fsPromises.writeFile(path, JSON.stringify(courses))
//                         resolve()
//                     })(path.join(__dirname, '..', 'data', 'courses.json'))
//                 } catch (e) {
//                     reject(e)
//                 }
//             })
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }
//
// module.exports = Course

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String
})

module.exports = model('Courses', course)
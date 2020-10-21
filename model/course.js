const { v4: uuidv4 } = require('uuid');
const fsPromises = require('fs/promises');
const path = require("path");

class Course {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    static getAllCourses() {
        return new Promise((resolve, reject)=>{
            (async (path) =>{
                try {
                    let data = await fsPromises.readFile(path, "utf-8")
                    resolve(JSON.parse(data))
                } catch (err) {
                    reject(err)
                }
            })(path.join(__dirname, '..','data', 'courses.json'))
        })
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        try {
            let courses = await Course.getAllCourses()
            courses.push(this.toJSON())
            // console.log(typeof courses)
            console.log('course saved', courses)

            return new Promise((resolve, reject) => {
                try {
                    (async (path) =>{
                        await fsPromises.writeFile(path, JSON.stringify(courses))
                        resolve()
                    })(path.join(__dirname, '..','data', 'courses.json'))
                } catch (e) {
                    reject(e)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = Course
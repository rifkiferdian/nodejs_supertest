const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

const userData = {
    username : "user1",
    password : "user1"
}

describe('POST /register',() => {
    it('baut user seharusnya send response 201', (done) => {
        request(app)
        .post('/register')
        .send(userData)
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(res.status).toEqual(201)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("id")
            expect(res.body).toHaveProperty("username")
            expect(res.body.username).toEqual(userData.username)
            done()
        })
    })
});

describe("POST /login",() => {
    it("login user seharusnya send response 200", (done) =>{
        request(app)
        .post('/login')
        .send(userData)
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(200)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("token")
            expect(typeof res.body.token).toEqual("string")
            done()
        })
    })
})

describe("POST /login",() => {
    it("login salah user seharusnya send response 400", (done) =>{
        request(app)
        .post('/login')
        .send({username:"asd",password:"asd"})
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(401)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("error")
            expect(typeof res.body.error).toEqual("string");
            expect(res.body.error).toEqual("username tidak ada");
            done()
        })
    })
})

afterAll((done) => {
    sequelize.queryInterface.bulkDelete('Users', {})
    .then(() => {
        return done()
    })
    .catch(() => {
        done(err)
    })
})
const request = require('supertest')
const app = require('../app')
const { sequelize, Photo } = require('../models')


const photoData = {
    title : "kocheng",
    caption : "kocheng",
    image_url : "https://cdn.kincir.com/1/old/2017-februari-2/agen-rahasia/youtube/2-kucing-garong.jpg"
}

const Wrong_photoData = {
    title_salah : "kocheng",
    caption_salah : "kocheng",
    image_url_salah : "https://cdn.kincir.com/1/old/2017-februari-2/agen-rahasia/youtube/2-kucing-garong.jpg"
}

// Auth
const header_x = "x-access-token"
const token_access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJxd2UiLCJpYXQiOjE2NjYyMTE0MDR9.vjYKpqNE7LjtKmJXdBoTX8PbdqOeH93N91DqdWgjsEI"

// GET ALL PHOTO TESTING 201 AND 500
describe('POST /photo',() => {
    it('input photo seharusnya send response 201', (done) => {
        request(app)
        .post('/photo')
        .set(header_x, token_access)
        .send(photoData)
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(res.status).toEqual(201)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("id")
            expect(res.body).toHaveProperty("title")
            expect(res.body).toHaveProperty("caption")
            expect(res.body).toHaveProperty("image_url")
            expect(res.body.title).toEqual(photoData.title)
            done()
        })
    })
});

describe('POST /photo',() => {
    it('input photo salah seharusnya send response 500', (done) => {
        request(app)
        .post('/photo')
        .set(header_x, token_access)
        .send(Wrong_photoData)
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(res.status).toEqual(500)
            expect(typeof res.body).toEqual("object")
            done()
        })
    })
});


// GET ALL PHOTO TESTING 200 AND 500
describe("GET /Photo",() => {
    it("get all photo seharusnya send response 200", (done) =>{
        request(app)
        .get('/photo')
        .set(header_x, token_access)
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(200)
            expect(typeof res.body).toEqual("object")
            expect(res.body[0]).toHaveProperty("title")
            expect(res.body[0]).toHaveProperty("caption")
            expect(res.body[0]).toHaveProperty("image_url")
            done()
        })
    })
})

describe("GET /Photo",() => {
    it("get all photo salah seharusnya send response 500", (done) =>{
        request(app)
        .get('/photo')
        .set(header_x, token_access)
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(500)
            expect(typeof res.body).toEqual("object")
            done()
        })
    })
})


// GET PHOTO BY ID TESTING 200 AND 500
describe("GET /Photo/:id",() => {
    it("get photo by id seharusnya send response 200", (done) =>{
        request(app)
        .get('/photo/1')
        .set(header_x, token_access)
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(200)
            expect(typeof res.body).toEqual("object")
            expect(res.body[0]).toHaveProperty("title")
            expect(res.body[0]).toHaveProperty("caption")
            expect(res.body[0]).toHaveProperty("image_url")
            done()
        })
    })
})

describe("GET /Photo/:id",() => {
    it("get photo by id seharusnya send response 500", (done) =>{
        request(app)
        .get('/photo/0')
        .set(header_x, token_access)
        .end(function (err, res){
            if(err){
                done(err)
            }
            expect(500)
            expect(typeof res.body).toEqual("object")
            done()
        })
    })
})

afterAll((done) => {
    sequelize.queryInterface.bulkDelete('Photos', {}, {restartIdentity: true})
    .then(() => {
        return done()
    })
    .catch(() => {
        done(err)
    })
})
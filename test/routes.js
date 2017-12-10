const app = require("../app")("test2");
const supertest = require("supertest")(app);
const mongoose = require("mongoose")
mongoose.Promise = global.Promise

describe("Route testing", function() {
   it("Test index", function(done) {
       supertest
           .get("/")
           .expect(200)
           .end(done)
   })

   it("Test api/logout", function(done) {
       supertest
           .post("/api/logout")
           .expect(302)
           .end(done)
   })


   it("Test api/user", function(done) {
       supertest
           .get("/api/user")
           .expect(209) // no user logged in ? maybe should be 403
           .end(done)
   })

   it("Test 404", function(done) {
       supertest
           .get("/shizzlwazzle")
           .expect(404)
           .end(done)
   })

   it("Test api/play", function(done) {
       supertest
           .get("/api/play")
           .expect(403) // while user is not logged in server should 403
           .end(done)
   })

   after(function(done) {
     mongoose.connection.db.dropDatabase()
     done()
   })
})

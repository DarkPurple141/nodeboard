const app = require("../app")("test2");
const supertest = require("supertest")(app);
const mongoose = require("mongoose")

describe("Route testing", function() {
   it("Test index", function(done) {
       supertest
           .get("/")
           .expect(200)
           .end(done);
   })

   it("Test api", function(done) {
       supertest
           .get("/api")
           .expect(200)
           .end(done);
   })


   it("Test api/user", function(done) {
       supertest
           .get("/api/user")
           .expect(209) // no user logged in
           .end(done);
   })

   it("Test 404", function(done) {
       supertest
           .get("/shizzlwazzle")
           .expect(404)
           .end(done);
   })

   it("Test api/play", function(done) {
       supertest
           .get("/api/play")
           .expect(200)
           .end(done);
   })

   after(function(done) {
     mongoose.connection.db.dropDatabase()
     done()
   })
})

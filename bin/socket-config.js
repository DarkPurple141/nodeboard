
module.exports = (io, name) => {

   // create nameSpace for relevant game
   const nsp = io.of(name)

   return nsp
}

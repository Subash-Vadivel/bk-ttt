const mongoose=require('mongoose');
mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://admin:admin@cluster0.ukch4lw.mongodb.net/?retryWrites=true&w=majority")
const conn = mongoose.connection;
conn.on('open', ()=>{
    console.log('Database Connected...');
});

module.exports = conn
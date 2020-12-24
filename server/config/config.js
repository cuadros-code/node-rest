// Port
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV =  process.env.NODE_ENV || 'dev'

// Database

let urlDB;

if( process.env.NODE_ENV === 'dev' ){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://cuadros:mfOGVX1wID1acspd@cluster0.htiey.mongodb.net/cafe'
}

process.env.URLDB = urlDB;


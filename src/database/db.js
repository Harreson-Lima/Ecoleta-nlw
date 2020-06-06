//import the dependece of sqlite3

const sqlite3 = require("sqlite3").verbose();

// create an object that will make operations in the database

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;
// using the object of database, for our operations


// db.serialize(() => {
//     // with SQL commands i'll:

//     // 1 create a table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//            id INTEGER PRIMARY KEY AUTOINCREMENT,
//            image TEXT,
//            name TEXT,
//            address TEXT,
//            address2 TEXT,
//            state TEXT,
//            city TEXT,
//            items TEXT 
//         );
//     `)

//     // 2 insert data into the table
//     const query = `
//     INSERT INTO places (
//         image ,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items 
//     ) VALUES (?,?,?,?,?,?,?);
// `
//     const values = [
//         "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         "Colectoria",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ];

//     function afterInsertData(error){
//         if(error) {
//             return console.log(error);
//         }

//         console.log("Cadastrado com sucesso!");
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData);


//     // 3 consult the table data
//     db.all(`SELECT * FROM places`, function (error, rows){
//         if(error) {
//             return console.log(error);
//         }

//         console.log("Aqui estão seus registros:");
//         console.log(rows);
//     })


//     // 4 delete a table data
// for( let i = 0; i <= 100; i++){
//     db.run(`DELETE FROM places WHERE id = ?`, [i], function(error) {
//         if(error) {
//             return console.log(error);
//         }
//         console.log("Registro deletado com sucesso!");
//     })
// }
// })
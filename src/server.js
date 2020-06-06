const express = require("express");
const server = express();

//get the database
const db = require("./database/db");



// set up public folder

server.use(express.static("public"));

// enable the use of req.body in our application
server.use(express.urlencoded({extended: true}));


//using template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// configure my application paths
// home page
// req: requisitation
// res: answer

server.get("/", (req, res) => {
  return res.render("index.html", { title: "Seu marketplace de coleta de resíduos"});
})
server.get("/create-point", (req, res) => {

  // req.query: Query Strings of our url
    // console.log(req.query)
  // insurt
    return res.render("create-point.html");
})

server.post("/savepoint", (req, res) => {
    
    //req.body: the body of our formulary
    // console.log(req.body);

    // insert datas in database
    // 2 insert data into the table
    const query = `
    INSERT INTO places (
        image ,
        name,
        address,
        address2,
        state,
        city,
        items 
    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
      req.body.image, 
      req.body.name, 
      req.body.address, 
      req.body.address2, 
      req.body.state, 
      req.body.city, 
      req.body.items
    ];
    
    function afterInsertData(error){
        if(error) {
            console.log(error);
            return res.render("create-point.html", {saved: false});
        }

        console.log("Cadastrado com sucesso!");
        console.log(this);

        return res.render("create-point.html", {saved: true});
    }
    
    db.run(query, values, afterInsertData);

})






server.get("/search-results", (req, res) => {

  const search = req.query.search;

  if( search == ""){
    //empty search
    return res.render("search-results.html", {total: 0}); 
  }



  //get the datas of database
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (error, rows){
    if(error) {
      return console.log(error);
    }
    const total = rows.length;
    // show the oage html with the datas from database
    return res.render("search-results.html", { places: rows, total: total }); 
  })


})




// turn on sever
server.listen(3000);
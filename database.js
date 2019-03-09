const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./test.db', (err) => {
    if (err) {
        console.log("Error creating database")
    } else {
        console.log('Database created!')
        db.serialize(function() {
            // do this so that it runs sequentially
            db.run("DROP TABLE IF EXISTS cars;")
            db.run("CREATE TABLE cars(id INTEGER PRIMARY KEY AUTOINCREMENT, model TEXT, price INTEGER)")
            
            var stmt = db.prepare("INSERT INTO cars VALUES (?, ?, ?);")
            console.log("Inserting rows...")

            let models = ['datsun','honda','mitsubishi','hyundai']
            for (let i = 0; i < 1000; i++ ){
                if (i % 100 == 0) {
                    console.log(`Statement ${i} inserting...`)
                }
                let model = models[getRandomInt(3)];
                let price = getRandomInt(10000);
                
                stmt.run(null, model, price);
                
            }
            stmt.finalize()
            db.close((err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log('Close the database connection.');
              });
        })
        

    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
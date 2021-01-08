const connection = require("./connection");

// Create an array of questions marks to notate the number of values passed in the query call.
// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function createQmarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    
    // Translate array of strings to a single comma-separated string and return it.
    return arr.toString();
  }


// Helper function to convert object key/value pairs to SQL syntax.
function translateSql(obj) {
    var arr = [];
  
    // Loop through the keys and push the key/value as a string int arr
    for (var key in obj) {
      var value = obj[key]; 
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(obj, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // Translate array of strings to a single comma-separated string and return it.
    return arr.toString();
  }


// ORM bject for all our SQL statement functions.
const orm = {
    selectAll: function(table, cb) {
        const queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        const queryString = 
            "INSERT INTO " + 
            table + 
            " (" +
            cols.toString() +
            ") " +
            "VALUES (" +
            createQmarks(vals.length) +
            ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb) { 
        const queryString = 
            "UPDATE " + 
            table + 
            " SET " +
            translateSql(objColVals) +
            " WHERE " +
            condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // Function to help manage the additions. 
    deleteOne: function(table, condition, cb) {
        const queryString = "DELETE FROM " + table + " WHERE " + condition;

    console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
}

//  Create 3 ORM methods:
//  `selectAll()`
//  `insertOne()`
//  `updateOne()`

// export orm object
module.exports = orm;
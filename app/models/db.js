const mysql=require('mysql')

const dbconfig=require('../config/config')

const connection = mysql.createConnection({
    host:dbconfig.HOST,
    user:dbconfig.USER,
    password:dbconfig.PASSWORD,
    database:dbconfig.DB
})

connection.connect((error)=>{
    if(error){
        throw error;
    }
    console.log("Db connected successfully")
})

module.exports=connection
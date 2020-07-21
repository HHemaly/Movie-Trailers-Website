
const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
//var popupS = require('popups');
//var jsdom= require("jsdom");
//var JSDOM= jsdom.JSDOM;


const fs = require('fs')

let addUsers = function(user){
    //load tasks array
    let users = loadUsers()
    //push new task in array
     var x = true
    for(var i =0;i<users.length;i++){
        if( users[i].username == user.username){
            
           // popupS.window ({
             //   mode:'alert',
               // content :'This username is already taken'
           // })
          console.log("This username is already taken")
          x= false}
    }
    if(x == true){
      users.push(user)}
    //save array back in file
    fs.writeFileSync('users.json', JSON.stringify(users))
    return x
}

let loadUsers =  function(){
     try{  let loadedusers = fs.readFileSync('users.json')
     let dataString = loadedusers.toString()
     let usersArray = JSON.parse(dataString)
     return usersArray
 } catch (error) {
     return []

     }
}

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views') )

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000, function(){
    console.log('server is running')
})

var tasks1 = ['study networks', 'study db']

app.get('/', function(req,res){
    res.render('login', {
       tasks: tasks1
    })
})
app.get('/registration', function(req,res){
    res.render('registration', {message:''
    })
})

app.post('/register', function(req,res){
    let user ={ 
        username: req.body.username,
        password: req.body.password,
        watchlist:[]
    }
    if (user.username==""|| user.password=="")
   //res.send("username or password is empty")
    res.render('registration',{message:"username or password  is empty"})
    else{


         var y= addUsers(user)
         if(y==true){
         res.send("registration was successful")
         res.redirect('/')
        }
        //res.render('/',{message:"registration was successful"})
         else{
        res.render('registration',{message:"This username is already taken"})
            }}



        })


        app.get('/action', function(req,res){
            res.render('action')
        })
        app.get('/drama', function(req,res){
            res.render('drama')
        })
        app.get('/horror', function(req,res){
            res.render('horror')
        })

        app.get('/conjuring', function(req,res){
            res.render('conjuring')
        })

        app.get('/darkknight', function(req,res){
            res.render('darkknight')
        })

        app.get('/fightclub', function(req,res){
            res.render('fightclub')
        })

        app.get('/godfather', function(req,res){
            res.render('godfather')
        })
        
        app.get('/godfather2', function(req,res){
            res.render('godfather2')
        })
        
        app.get('/scream', function(req,res){
            res.render('scream')
        })

        
        app.get('/search', function(req,res){
            res.render('Search')
        })

        //var session = require('express-session')
        var moviearray=["conjuring","fightclub","darkknight","godfather","godfatheق2","scream"]
        app.post('/search', function(req,res)  {
         var searchedmovies=[] 
         const searchstring= (req.body.Search).toLowerCase();
         var result=""
         for (var x=0; x<moviearray.length;x++){
             var g =moviearray[x]
             for(var i=0 ;i<g.length;i++){
             for(var j=0 ;j<g.length;j++){
               var res = g.substring(i, j);
                if (searchstring==res)
                 searchedmovies.push(g)}
            
        }}
        for(var z=0;z<searchedmovies.length;z++){
            result=result+" "+ `<a href=${"/"+searchedmovies[i]}>${searchedmovies[i]}</a>`
        }
        if (result===""){
        res.send("error no result found");
        }
        //message no result found
        else {
            res.send(result);
        }
        // result clickable links for the movies in the array
        //handle in html file
        //shoofii i dont have an account file maktoob ezaii
        })

      
        
      
        app.get('/watchlist', function(req,res){
            res.render('watchlist')
        })
        
        app.post('/watchlist', function(req,res){
          let usery= loadUsers()

        })

        


        app.get('/home', function(req,res){
            res.render('home')
        })
app.post('/login', function(req,res){
    let usert=loadUsers()
    var y= true
    for(var i=0;i<usert.length;i++){
        if(usert[i].username==req.body.username ){
            if(usert[i].password==req.body.password){
                res.redirect('home')
                y= false  
                req.session.username=req.body.username 
            }
            else
            {
                res.render('login',{message:"username or password  is empty"})
                //message is not displayed
            }
        }
    
    }
    if(y){
        res.render('login',{message:"the username is incorrect"})
    }
    
}
)
const http = require('http');
const fs = require('fs');
const url = require('url');
const util = require('util');
const { StringDecoder } = require('string_decoder');
const formidable = require('formidable');

//Template
const userReplace = (user, usersTemplate) => {
    let output = usersTemplate.replace('{%id%}', user.id);
    output = output.replace('{%username%}', user.username);
    output = output.replace('{%image%}', user.image);

    return output;
};


const usersTemplate = fs.readFileSync(`${__dirname}/templates/users.html`, 'utf8');


// Data
const data = fs.readFileSync(`${__dirname}/data/users.json`, 'utf8');
let dataParse = JSON.parse(data);

// Create the server
const server = http.createServer((req, res) => {
    // Path
    const path = req.url;
    // Routing
    if(path === '/login'){
        if(req.method === 'POST'){

            let form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files){
                if(err){
                    console.log(err);
                    return;
                }
               
                userLogged = fields.user;
                passLogged = fields.password;
                         
                dataParse.forEach(user => {
                    if(userLogged === user.username && passLogged === user.password){     
                                                    
                        res.writeHead(202);
                   }
                   if(passLogged !== user.password){
                        res.writeHead(401);
                    }
               
                })
              
               
        
            })
      
        }
        const index = fs.readFile(`${__dirname}/templates/login.html`, 'utf8', (error, data)=> {
            if(error){
                console.log('Something was wrong!')
            }else{
                res.end(data);
            }
            
        })
       

    }else if(path === '/game'){
        const usersListTemplate = dataParse.map(user => userReplace(user, usersTemplate)).join('');
        const index = fs.readFile(`${__dirname}/templates/game.html`, 'utf8', (error, data)=> {
            if(error){
                console.log('Something was wrong!')
            }else{
                dataView = data.replace('{%USERLIST%}', usersListTemplate);
                res.end(dataView);
            }
          
        })
    }
   
    /*else{
        res.writeHead(404);
        res.end('Page not found!')
    }*/

})

server.listen(3001,'127.0.0.1', () => {
    console.log('server on!');
});
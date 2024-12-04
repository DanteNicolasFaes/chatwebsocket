
import express from "express";
import handlebars from "express-handlebars";
import path from "node:path";   
import { __dirname } from "./utils.js"; 
import ViewRouters from './routes/viewsRouters.route.js'
import { Server } from "socket.io";

const app = express();
const PORT = 8080 || 3000;

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use('/',ViewRouters);
app.use(express.static (__dirname+ '/public'));



const httpsServer = app.listen(PORT, () => {
    console.log('Listo el server http');
});
 
const io = new Server(httpsServer);
const conversacion = [] ;

io.on('connection',(socket)=>{
    console.log('Nueva conexion')
    socket.on('mensaje',(data) =>{
        conversacion.push(data);
        console.log(data)
        io.emit('conversacion', conversacion)
    })
})



app.get('/', (req, res) => {
    res.render('home',{});  // Esto debería renderizar la vista 'home.handlebars'
});
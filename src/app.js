import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import { connectDB } from "./config/dbConnection.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { chatRouter } from "./routes/chats.routes.js";

const port = 8080;
const app = express();

//middlewares
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Servidor express http
const httpServer = app.listen(port,()=>console.log(`Servidor ejecutandose en el puerto ${port}`));
//Servidor de websocket
const io = new Server(httpServer);

//conexión base de datos
connectDB();

//configuración de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//boostrap
 // Bootstrap
app.use(express.static('node_modules/bootstrap/dist'));
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/chat", chatRouter);
app.use(viewsRouter);   

//Arreglo de chat vacio
let chat = [];

//socket server chat
io.on("connection", async(socket)=>{
    //cuando se conecta mandamos el historial de chat
    socket.emit("chatHistory", chat);
    //Recibimos el mensaje de cada usuario
    socket.on("msgChat", (data)=> {
        chat.push(data);
        //Se envia el historial de chat a todos los usuarios
        io.emit("chatHistory", chat);
    });
    //Alerta de conexion de nuevo cliente
    socket.on("authenticated", (data)=> {
        socket.broadcast.emit("NewUser", `El usuario ${data} 
        se acaba de conectar`);
    })
});
import { Router } from "express";
import { cartsService } from "../dao/index.js";

const router = Router();

// Mostrar los Carritos
router.get("/", async (req,res)=>{
    try {
        const carts = await cartsService.getCarts();
        res.json({status: "success", data:carts});
    } catch (error) {
        res.json({status: "error", error:error.message});
    }
});

// Mostrar el carrito por Id
router.get("/:cid", async (req,res)=>{
    try {
        const cartId = req.params.cid;
        const carts = await cartsService.getCarttById(cartId);
        res.json({status: "success", data:carts});
    } catch (error) {
        res.json({status: "error", error:error.message});
    }
});

// Crear Carrito
router.post("/", async (req, res) => {
    try {
        const cartCreate = await cartsService.createCart();
        res.json({status: "success", data:cartCreate})

    } catch (error) {
        res.json({status: "error", error:error.message});
    }
});

//Borrar los carritos por Id
router.delete("/:cid", async (req,res) =>{
    try {
        const cartId = req.params.cid;
        const result = await cartsService.deleteCart(cartId);
        res.json({status: "success", data:result});
    } catch (error) {
        res.json({status: "error", error:error.message});
    }
});

// Actualizar producto en carrito
router.post("/:cid/product/:pid", async (req,res)=>{
    try {
        const {cid:cartId, pid:productId} = req.params;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.addProductInCart(cartId, productId);
        res.json({status:"success", data:result});
    } catch (error) {
        res.json({status: "error", error:error.message});
    }
});

// Eliminar Producto de un carrito
router.delete("/:cid/product/:pid", async (req,res)=>{
    try {
        const {cid: cartId, pid: productId} = req.params;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.deleteProduct(cartId, productId);
        res.json({status:"success", data:result});
    } catch (error) {
        res.json({status: "error", error:error.message});
    }
});

// Actualizar Cantidad de Productos en el Carrito
router.put("/:cid/product/:pid", async (req,res)=>{
    try {
        const {cid: cartId, pid: productId} = req.params;
        const {newQuantity} = req.body;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.updateProductCart(cartId, productId, newQuantity);
        res.json({status:"success", data: result});
    } catch (error) {
        res.json({status: "error", error:error.message});
    }
});

export { router as cartsRouter};



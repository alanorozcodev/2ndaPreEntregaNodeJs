import { Router } from "express";
import { cartsService } from "../dao/index.js";

const router = Router();

// Mostrar los Carritos
router.get("/", async(req,res)=>{
    try {
        const carts = await cartsService.getCarts();
        res.json({status: "success", data:carts});
    } catch (error) {
        res.json({status: "error", error:error.message});
    }
});

// Mostrar el carrito por Id
router.get("/:cid", async(req,res)=>{
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
        res.json({status: "error", message:error.message});
    }
});

// Actualizar producto en carrito
cartsRouter.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid:cartId, pid:productId} = req.params;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.addProductInCart(cartId, productId);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
});

export { router as cartsRouter};



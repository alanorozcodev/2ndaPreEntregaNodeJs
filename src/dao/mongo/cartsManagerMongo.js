import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo{
    constructor(){
        this.model = cartsModel;
    };

    //Crear un carrito
    async createCart(cartInfo){
        try {
            const result = await this.model.create(cartInfo);
            return result;
        } catch (error) {
            console.log("cartInfo",error.message);
            throw new Error("No se pudo crear el carrito");
        }
    };

    //Obtener un listado de los carritos
    async getCarts(){
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("getCarts",error.message);
            throw new Error("No se pudo obtener el listado de carritos");
        }
    };

     //Obtener un carrito por Id
    async getCarttById(cartId){
        try {
            const result = await this.model.findById(cartId);
            return result;
        } catch (error) {
            console.log("getCarttById",error.message);
            throw new Error("No se pudo obtener el carrito por Id");
        }
    };

    //Agregar un producto a un carrito
    async addProduct(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.find( item => item.productId._id == productId);
            productExist
            ? (productExist.quantity += 1)
            : cart.products.push({
                productId: productId,
                quantity: 1
            });
            const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
            if(!result){
                throw new Error("No se pudo encontrar el carrito a actualizar");
            }
            return result;
        } catch (error) {
            console.log("updateProduct",error.message);
            throw new Error("No se pudo agregar el producto al carrito");
        }
    };


    //Borrar un carrito por Id
    async deleteCart(deleteCartId) {
        try {
            const result = await this.model.findByIdAndDelete(deleteCartId);
            if(!result){
                throw new Error("No se pudo encontrar el carrito a eliminar");
            }
            return result;
        } catch (error) {
            console.log("deleteCart",error.message);
            throw   new Error("No se pudo eliminar el carrito");
        }
    };

    // Eliminar productos del carrito
    async deleteProductCart(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.find(item => item.productId._id == productId);
            if(productExist){
                const newProducts = cart.products.filter(item => item.productId._id != productId);
                cart.products = newProducts;
                const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede eliminar");
            }
        } catch (error) {
            console.log("deleteProductCart", error.message);
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    };

    // Actualizar cantidad de productos en el carrito
    async updateProductCart(cartId, productId, newQuantity){
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex( item => item.productId._id == productId);
            if( productIndex >=0 ){
                cart.products[productIndex].quantity = newQuantity;
                const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede actualizar");
            }
        } catch (error) {
            console.log("updateProductCart", error.message);
            throw new Error("No se pudo actualizar el producto al carrito");
        }
    };
};
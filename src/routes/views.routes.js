import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    const {limit = 3, page = 1, sort = ""} = req.query;
    const query = {
        // stock: "10"
    };
    const options = {
        limit,
        page,
        sort,
        lean: true
    };
    options.sort =
    sort === "name_asc" ? { title: 1 } :
    sort === "name_desc" ? { title: -1 } :
    sort === "price_asc" ? { price: 1 } :
    sort === "price_desc" ? { price: -1 } :
    sort === "stock_asc" ? { stock: 1 } :
    sort === "stock_desc" ? { stock: -1 } :
    { price: -1 }; 

    const result = await productsService.getProductsPaginate(query, options);
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProducts = {
        status:"success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage 
            ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` 
            : null,
        nextLink: result.hasNextPage 
            ? baseUrl.includes("page") 
            ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) 
            : baseUrl.concat(`?page=${result.nextPage}`) 
            : null
    }
    console.log(dataProducts);
    res.render("home", dataProducts);
});


//view del chat
router.get("/chat", (req,res)=>{
    res.render("chat");
});


export { router as viewsRouter};
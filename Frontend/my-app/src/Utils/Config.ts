class Config {
    public supportEmail = "support@northwind.com";
    public supportPhone = "031234567";
    public supportPage = "";
    
 
    public productsUrl = "";
    public productImagesUrl = "";
    public tokenRefreshUrl = "";

}


class DevelopmentConfig extends Config {
    public categoriesUrl = "http://127.0.0.1:8000/api/products/categories";
    public productsUrl = "http://127.0.0.1:8000/api/products";
    public checkOutUrl = "http://127.0.0.1:8000/api/products/check-out";
    public productImagesUrl = "http://127.0.0.1:8000/";
    public registerUrl = "http://127.0.0.1:8000/api/register";
    public loginUrl = "http://127.0.0.1:8000/api/token";
    public tokenRefreshUrl = "http://127.0.0.1:8000/api/token/refresh";
}

// class TestConfig extends Config {
//     public supportPage = "http://northwnd.com/qa-support/";

//     public productsUrl = "http://localhost:3030/api/products/";
//     public productImagesUrl = "http://localhost:3030/api/products/images/";
// }

class ProductionConfig extends Config {
    public categoriesUrl = "https://e-commers-quiker.onrender.com/api/products/categories";
    public productsUrl = "https://e-commers-quiker.onrender.com/api/products";
    public checkOutUrl = "https://e-commers-quiker.onrender.com/api/products/check-out";
    public productImagesUrl = "https://e-commers-quiker.onrender.com";
    public registerUrl = "https://e-commers-quiker.onrender.com/api/register";
    public loginUrl = "https://e-commers-quiker.onrender.com/api/token";
    public tokenRefreshUrl = "https://e-commers-quiker.onrender.com/api/token/refresh";
}


let config = new DevelopmentConfig();

if (process.env.NODE_ENV === "development") {
    config = new DevelopmentConfig();
}
// else if (process.env.NODE_ENV === "test") {
//     config = new TestConfig();
// }
else if(process.env.NODE_ENV === "production") { 
    config = new ProductionConfig();
}

export default config;
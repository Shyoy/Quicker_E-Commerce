class Config {
    public supportEmail = "support@northwind.com";
    public supportPhone = "031234567";
    public supportPage = "";
    
 
    public productsUrl = "";
    public productImagesUrl = "";
}


class DevelopmentConfig extends Config {
    public supportPage = "http://northwnd.com/it-support/";

    public productsUrl = "http://127.0.0.1:8000/api/products";
    public productImagesUrl = "http://127.0.0.1:8000/";
    public registerUrl = "http://127.0.0.1:8000/api/auth/register/";
    public loginUrl = "http://127.0.0.1:8000/api/auth/login/";
}

// class TestConfig extends Config {
//     public supportPage = "http://northwnd.com/qa-support/";

//     public productsUrl = "http://localhost:3030/api/products/";
//     public productImagesUrl = "http://localhost:3030/api/products/images/";
// }

// class ProductionConfig extends Config {
//     public supportPage = "http://northwnd.com/support/";

//     public productsUrl = "http://localhost:3030/api/products/";
//     public productImagesUrl = "http://localhost:3030/api/products/images/";
// }


let config = new DevelopmentConfig();

// if (process.env.NODE_ENV === "development") {
//     config = new DevelopmentConfig();
// }
// else if (process.env.NODE_ENV === "test") {
//     config = new TestConfig();
// }
// else if(process.env.NODE_ENV === "production") { 
//     config = new ProductionConfig();
// }

export default config;
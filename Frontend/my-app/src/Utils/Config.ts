class Config {
    public supportEmail = "support@northwind.com";
    public supportPhone = "031234567";
    public supportPage = "";
    
 
    public productsUrl = "";
    public productImagesUrl = "";
    public tokenRefreshUrl = "";
    public BASE_URL =""

}


class DevelopmentConfig extends Config {
    public categoriesUrl = "http://127.0.0.1:8000/api/products/categories";
    public productsUrl = "http://127.0.0.1:8000/api/products";
    public checkOutUrl = "http://127.0.0.1:8000/api/products/check-out";
    public productImagesUrl = "http://127.0.0.1:8000";
    public registerUrl = "http://127.0.0.1:8000/api/register";
    public loginUrl = "http://127.0.0.1:8000/api/token";
    public tokenRefreshUrl = "http://127.0.0.1:8000/api/token/refresh";
    public dummyImgUrl = "http://127.0.0.1:8000/media/dummy_image.jpg";

}

// class TestConfig extends Config {
//     public supportPage = "http://northwnd.com/qa-support/";

//     public productsUrl = "http://localhost:3030/api/products/";
//     public productImagesUrl = "http://localhost:3030/api/products/images/";
// }

class ProductionConfig extends Config {
    public categoriesUrl = `${this.BASE_URL}/api/products/categories`;
    public productsUrl = `${this.BASE_URL}/api/products`;
    public checkOutUrl = `${this.BASE_URL}/api/products/check-out`;
    public productImagesUrl = `${this.BASE_URL}`;
    public registerUrl = `${this.BASE_URL}/api/register`;
    public loginUrl = `${this.BASE_URL}/api/token`;
    public tokenRefreshUrl = `${this.BASE_URL}/api/token/refresh`;
    public dummyImgUrl = `${this.BASE_URL}/mediaTmp/dummy_image.jpg`;
}


let config = new DevelopmentConfig();

if (process.env.NODE_ENV === "development") {
    config = new DevelopmentConfig();
}
// else if (process.env.NODE_ENV === "test") {
//     config = new TestConfig();
// }
else if(process.env.NODE_ENV === "production") { 
    config.BASE_URL = process.env.API_URL||"404"
    config = new ProductionConfig();
}

export default config;
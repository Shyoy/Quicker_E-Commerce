class Config {
    public supportEmail = "support@northwind.com";
    public supportPhone = "031234567";
    public supportPage = "";
    
 
    public productsUrl = "";
    public productImagesUrl = "";
    public tokenRefreshUrl = "";
    public BACK_URL = "";

}


class DevelopmentConfig extends Config {
    BACK_URL ="http://127.0.0.1:8000"
    public categoriesUrl = `${this.BACK_URL}/api/products/categories`;
    public productsUrl = `${this.BACK_URL}/api/products`;
    public checkOutUrl = `${this.BACK_URL}/api/products/check-out`;
    public productImagesUrl = `${this.BACK_URL}`;
    public registerUrl = `${this.BACK_URL}/api/register`;
    public loginUrl = `${this.BACK_URL}/api/token`;
    public tokenRefreshUrl = `${this.BACK_URL}/api/token/refresh`;
    public dummyImgUrl = `${this.BACK_URL}/media/dummy_image.jpg`;

}

// class TestConfig extends Config {
//     public supportPage = "http://northwnd.com/qa-support/";

//     public productsUrl = "http://localhost:3030/api/products/";
//     public productImagesUrl = "http://localhost:3030/api/products/images/";
// }

class ProductionConfig extends Config {
    BACK_URL = process.env.REACT_APP_API_URL||"http://localhost"
    public categoriesUrl = `${this.BACK_URL}/api/products/categories`;
    public productsUrl = `${this.BACK_URL}/api/products`;
    public checkOutUrl = `${this.BACK_URL}/api/products/check-out`;
    public productImagesUrl = `${this.BACK_URL}`;
    public registerUrl = `${this.BACK_URL}/api/register`;
    public loginUrl = `${this.BACK_URL}/api/token`;
    public tokenRefreshUrl = `${this.BACK_URL}/api/token/refresh`;
    public dummyImgUrl = `${this.BACK_URL}/mediaTmp/dummy_image.jpg`;
    
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
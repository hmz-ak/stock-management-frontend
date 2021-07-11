import GenericService from "./GenericService";

class StockService extends GenericService {
  constructor() {
    super();
  }

  getStock = () => this.get("/stocks/");
  getSingleStock = (id) => this.get("/stocks/" + id);
  addStock = (data) => this.post("/stocks/", data);
  deleteStock = (id) => this.delete("/stocks/" + id);
  updateStock = (_id, data) => this.put("/stocks/" + _id, data);
  // getStories = () => this.get("/api/novels/mystories");
  // getCart = (formData, config) => this.post("/api/novels/cart", formData);
  // addCart = (formData, config) =>
  //   this.postData("/api/novels/cart", formData, config);
}

let stockService = new StockService();
export default stockService;

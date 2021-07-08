import GenericService from "./GenericService";

class StockService extends GenericService {
  constructor() {
    super();
  }

  getStock = () => this.get("/api/novels");
  getSingleStock = (id) => this.get("/api/novels/" + id);
  addStock = (formData, config) =>
    this.postData("/api/novels", formData, config);
  deleteStock = (_id) => this.delete("/api/novels/delete/" + _id);
  updateStock = (_id, formData, config) =>
    this.putData("/api/novels/update/" + _id, formData, config);
  // getStories = () => this.get("/api/novels/mystories");
  // getCart = (formData, config) => this.post("/api/novels/cart", formData);
  // addCart = (formData, config) =>
  //   this.postData("/api/novels/cart", formData, config);
}

let stockService = new StockService();
export default stockService;

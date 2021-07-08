import GenericService from "./GenericService";

class CategoryService extends GenericService {
  constructor() {
    super();
  }

  getCategory = () => this.get("/categories/");
  getSingleCategory = (id) => this.get("/api/novels/" + id);
  addCategory = (name) => this.post("/categories/", { name });
  deleteStock = (_id) => this.delete("/api/novels/delete/" + _id);
  updateStock = (_id, formData, config) =>
    this.putData("/api/novels/update/" + _id, formData, config);
  // getStories = () => this.get("/api/novels/mystories");
  // getCart = (formData, config) => this.post("/api/novels/cart", formData);
  // addCart = (formData, config) =>
  //   this.postData("/api/novels/cart", formData, config);
}

let categoryService = new CategoryService();
export default categoryService;

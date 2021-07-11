import GenericService from "./GenericService";

class CategoryService extends GenericService {
  constructor() {
    super();
  }

  getCategory = () => this.get("/categories/");
  getSingleCategory = (id) => this.get("/categories/" + id);
  addCategory = (name) => this.post("/categories/", { name });
  deleteCategory = (_id) => this.delete("/categories/" + _id);
  updateCategory = (id, name) => this.put("/categories/" + id, name);
  // getStories = () => this.get("/api/novels/mystories");
  // getCart = (formData, config) => this.post("/api/novels/cart", formData);
  // addCart = (formData, config) =>
  //   this.postData("/api/novels/cart", formData, config);
}

let categoryService = new CategoryService();
export default categoryService;

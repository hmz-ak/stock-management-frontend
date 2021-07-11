import GenericService from "./GenericService";

class InvoiceService extends GenericService {
  constructor() {
    super();
  }

  getInvoice = () => this.get("/categories/");
  getSingleInvoice = (id) => this.get("/api/novels/" + id);
  addInvoice = (name, data) => this.post("/sales/", { name, data });
  deleteInvoice = (_id) => this.delete("/api/novels/delete/" + _id);
  updateInvoice = (_id, formData, config) =>
    this.putData("/api/novels/update/" + _id, formData, config);
  // getStories = () => this.get("/api/novels/mystories");
  // getCart = (formData, config) => this.post("/api/novels/cart", formData);
  // addCart = (formData, config) =>
  //   this.postData("/api/novels/cart", formData, config);
}

let invoiceService = new InvoiceService();
export default invoiceService;

import GenericService from "./GenericService";

class InvoiceService extends GenericService {
  constructor() {
    super();
  }
  getInvoiceNumber = () => this.get("/sales/getInvoiceNum/");
  getInvoice = () => this.get("/sales/");
  getInvoiceCustomer = () => this.get("/customers/");
  Profit = (data) => this.Data("/sales/profit/", data);
  getSingleInvoice = (id) => this.get("/sales/" + id);
  getSingleCustomer = (id) => this.get("/customers/" + id);
  updateSingleCustomer = (id, remaining) =>
    this.put("/customers/" + id, { remaining });
  addInvoice = (costPriceTotal, salePriceTotal, name, data) =>
    this.post("/sales/", { costPriceTotal, salePriceTotal, name, data });
  addInvoiceCustomer = (data) => this.post("/customers/", data);

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

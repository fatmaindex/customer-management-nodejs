const Customer = require("../models/customerSchema");

// Create
addCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, age, gender } = req.body;
    const customer = new Customer({ name, email, phone, address, age, gender });
    await customer.save();
    res.redirect("/");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Read all
getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.render("index", { customers });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get one customer from the db
getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Not found" });

    res.render("view", { customer });
  } catch (err) {
    return res.status(400).json({ error: "Invalid id" });
  }
};

getCustomerForEdit = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Not found" });

    res.render("edit", { customer });
  } catch (err) {
    return res.status(400).json({ error: "Invalid id" });
  }
};

// Update
updateCustomer = async (req, res) => {
  try {
    const { name, email, age, gender, phone, address } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, age, gender, phone, address },
      { new: true, runValidators: true }
    );

    if (!customer) return res.status(404).json({ error: "Not found" });
    res.redirect("/");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Delete
deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Invalid id" });
  }
};

//search customers
searchCustomers = async (req, res) => {
  try {
    const { searchInput } = req.query;
    const customers = await Customer.find({
      $or: [
        { name: { $regex: searchInput, $options: "i" } },
        { email: { $regex: searchInput, $options: "i" } },
        { phone: { $regex: searchInput, $options: "i" } },
        { address: { $regex: searchInput, $options: "i" } },
        { age: { $regex: searchInput.toString(), $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.render("index", { customers });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerForEdit,
  searchCustomers,
};

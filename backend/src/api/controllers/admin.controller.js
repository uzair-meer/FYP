import Service from "../models/Services.model";
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send(error);
  }
};

// READ: Get a specific service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).send();
    }
    res.send(service);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE: Modify a specific service by ID
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).send();
    }
    res.send(service);
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE: Remove a specific service by ID
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).send();
    }
    res.send(service);
  } catch (error) {
    res.status(500).send(error);
  }
};

// READ: Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.send(services);
  } catch (error) {
    res.status(500).send(error);
  }
};

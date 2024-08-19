import { errorHandler } from "../utils/error.js";
import db from "../db/database.js";

export const getComponents = (req, res, next) => {
  const {
    searchTerm,
    name,
    family,
    package_type,
    nominal_value,
    electrical_supply,
    suppliers_name,
  } = req.query;

  let q = "SELECT * FROM components";
  let queryParams = [];
  let conditions = [];

  if (searchTerm) {
    conditions.push(
      "(family LIKE ? OR name LIKE ? OR package_type LIKE ? OR nominal_value LIKE ? OR electrical_supply LIKE ? OR suppliers_name LIKE ?)"
    );
    const likeTerm = `%${searchTerm}%`;
    queryParams.push(
      likeTerm,
      likeTerm,
      likeTerm,
      likeTerm,
      likeTerm,
      likeTerm
    );
  }

  if (name) {
    conditions.push("name LIKE ?");
    queryParams.push(`%${name}%`);
  }

  if (family) {
    conditions.push("family LIKE ?");
    queryParams.push(`%${family}%`);
  }

  if (package_type) {
    conditions.push("package_type LIKE ?");
    queryParams.push(`%${package_type}%`);
  }

  if (nominal_value) {
    conditions.push("nominal_value LIKE ?");
    queryParams.push(`%${nominal_value}%`);
  }

  if (electrical_supply) {
    conditions.push("electrical_supply LIKE ?");
    queryParams.push(`%${electrical_supply}%`);
  }

  if (suppliers_name) {
    conditions.push("suppliers_name LIKE ?");
    queryParams.push(`%${suppliers_name}%`);
  }

  if (conditions.length > 0) {
    q += " WHERE " + conditions.join(" AND ");
  }

  db.query(q, queryParams, (err, data) => {
    if (err) {
      return next(errorHandler(500, "Database query failed"));
    }
    if (!data || data.length === 0) {
      return next(errorHandler(404, "Components not found!"));
    }

    return res.status(200).json(data);
  });
};

export const getComponent = (req, res, next) => {
  const componentId = req.params.id;
  const q = "SELECT * FROM components WHERE id = ?";

  db.query(q, [componentId], (err, data) => {
    if (err) {
      return next(errorHandler(500, "Database query failed"));
    }
    if (!data || data.length === 0) {
      return next(errorHandler(404, "Component not found!"));
    }

    return res.status(200).json(data);
  });
};

export const addComponent = (req, res, next) => {
  const {
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    available_quantity,
    storage_cabinet,
    storage_drawer,
    storage_shelf,
    suppliers_name,
    suppliers_contact_person,
    suppliers_contact_details,
    images_urls = [], // Default to an empty array if not provided
    dataSheet,
  } = req.body;

  // SQL query to insert a new component
  const q = `
    INSERT INTO components 
    (family, name, purpose, package_type, nominal_value, electrical_supply, unit_cost, available_quantity, storage_cabinet, storage_drawer, storage_shelf, suppliers_name, suppliers_contact_person, suppliers_contact_details, images_urls, dataSheet)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Convert images_urls array to a JSON string if using JSON column
  const imagesUrlsString = JSON.stringify(images_urls);

  // Array of values to insert
  const values = [
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    available_quantity,
    storage_cabinet,
    storage_drawer,
    storage_shelf,
    suppliers_name,
    suppliers_contact_person,
    suppliers_contact_details,
    imagesUrlsString,
    dataSheet,
  ];

  // Execute the SQL query
  db.query(q, values, (err, result) => {
    if (err) {
      console.error(err); // Log the error to see what went wrong
      return next(errorHandler(500, "Failed to add component"));
    }
    return res
      .status(201)
      .json({ id: result.insertId, message: "Component added successfully" });
  });
};

export const deleteComponent = (req, res, next) => {
  const componentId = req.params.id;

  // SQL query to delete a component by ID
  const q = `DELETE FROM components WHERE id = ?`;

  // Execute the SQL query
  db.query(q, [componentId], (err, result) => {
    if (err) {
      console.error(err); // Log the error to see what went wrong
      return next(errorHandler(500, "Failed to delete component"));
    }

    if (result.affectedRows === 0) {
      // No rows were affected, which means no component with the given ID was found
      return next(errorHandler(404, "Component not found"));
    }

    return res.status(200).json({ message: "Component deleted successfully" });
  });
};

export const updateComponent = (req, res, next) => {
  const componentId = req.params.id;

  const {
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    available_quantity,
    storage_cabinet,
    storage_drawer,
    storage_shelf,
    suppliers_name,
    suppliers_contact_person,
    suppliers_contact_details,
    images_urls = [], // Default to an empty array if not provided
    dataSheet,
  } = req.body;

  // SQL query to update the component details
  const q = `
    UPDATE components
    SET 
      family = ?, 
      name = ?, 
      purpose = ?, 
      package_type = ?, 
      nominal_value = ?, 
      electrical_supply = ?, 
      unit_cost = ?, 
      available_quantity = ?, 
      storage_cabinet = ?, 
      storage_drawer = ?, 
      storage_shelf = ?, 
      suppliers_name = ?, 
      suppliers_contact_person = ?, 
      suppliers_contact_details = ?, 
      images_urls = ?, 
      dataSheet = ?
    WHERE id = ?`;

  // Convert images_urls array to a JSON string if using JSON column
  const imagesUrlsString = JSON.stringify(images_urls);

  // Array of values to update
  const values = [
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    available_quantity,
    storage_cabinet,
    storage_drawer,
    storage_shelf,
    suppliers_name,
    suppliers_contact_person,
    suppliers_contact_details,
    imagesUrlsString,
    dataSheet,
    componentId, // ID is the last value in the array
  ];

  // Execute the SQL query
  db.query(q, values, (err, result) => {
    if (err) {
      console.error(err); // Log the error to see what went wrong
      return next(errorHandler(500, "Failed to update component"));
    }

    if (result.affectedRows === 0) {
      // No rows were affected, which means no component with the given ID was found
      return next(errorHandler(404, "Component not found"));
    }

    return res.status(200).json({ message: "Component updated successfully" });
  });
};
import pool from "../db/database.js";

export const getComponents = (req, res) => {
  const {
    search_term,
    name,
    family,
    package_type,
    nominal_value,
    electrical_supply,
    suppliers_name,
    page,
  } = req.query;

  const pageSize = 10;
  let offset = 0;
  let paginationClause = "";

  if (page) {
    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ message: "Invalid page number" });
    }
    offset = (pageNumber - 1) * pageSize;
    paginationClause = " LIMIT ? OFFSET ?";
  }

  let q = "SELECT * FROM components";
  let queryParams = [];
  let conditions = [];

  if (search_term) {
    conditions.push(
      "(family LIKE ? OR name LIKE ? OR package_type LIKE ? OR nominal_value LIKE ? OR electrical_supply LIKE ? OR suppliers_name LIKE ?)"
    );
    const likeTerm = `%${search_term}%`;
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

  // Add pagination if applicable
  q += paginationClause;
  if (page) {
    queryParams.push(pageSize, offset);
  }

  pool.query(q, queryParams, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(200).json(data);
  });
};

export const getComponent = (req, res) => {
  const componentId = req.params.id;
  const q = "SELECT * FROM components WHERE id = ?";

  pool.query(q, [componentId], (err, data) => {
    if (err) {
      // Send a generic 500 error response if the database query fails
      return res.status(500).json({ message: "Server error" });
    }
    if (!data || data.length === 0) {
      // Send a 404 response if no component is found
      return res.status(404).json({ message: "Component not found!" });
    }

    // Send the first item from the data array as a single object
    return res.status(200).json(data[0]);
  });
};

export const addComponent = (req, res) => {
  const {
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    other_cost,
    invoice_number,
    available_quantity,
    storage_cabinet,
    storage_drawer,
    storage_shelf,
    suppliers_name,
    suppliers_contact_person,
    suppliers_contact_details,
    receipt_date,
    images_urls = ["../../public/image.png"],
    data_sheet,
  } = req.body;

  // Convert images_urls array to a JSON string if using JSON column
  const imagesUrlsString = Array.isArray(images_urls)
    ? images_urls.join(",")
    : images_urls;

  // SQL query to check if a component with the same name already exists
  const checkNameQuery = "SELECT * FROM components WHERE name = ?";

  pool.query(checkNameQuery, [name], (err, results) => {
    if (err) {
      console.error("Error checking for existing component:", err);
      return res.status(500).json({ message: "Database error occurred" });
    }

    // If a component with the same name exists, return 409 status
    if (results.length > 0) {
      return res.status(409).json({ message: "Component already exists" });
    }

    // SQL query to insert a new component if the name does not exist
    const insertQuery = `
      INSERT INTO components 
      (family, name, purpose, package_type, nominal_value, electrical_supply, unit_cost, other_cost, invoice_number, available_quantity, storage_cabinet, storage_drawer, storage_shelf, suppliers_name, suppliers_contact_person, suppliers_contact_details, receipt_date, images_urls, data_sheet)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Array of values to insert
    const values = [
      family,
      name,
      purpose,
      package_type,
      nominal_value,
      electrical_supply,
      unit_cost,
      other_cost,
      invoice_number,
      available_quantity,
      storage_cabinet,
      storage_drawer,
      storage_shelf,
      suppliers_name,
      suppliers_contact_person,
      suppliers_contact_details,
      receipt_date,
      imagesUrlsString,
      data_sheet,
    ];

    // Execute the SQL query to insert the new component
    pool.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting component:", err);
        return res.status(500).json({ message: "Failed to add component" });
      }
      return res.status(201).json({
        id: result.insertId,
        message: "Component added successfully",
      });
    });
  });
};

export const deleteComponent = (req, res) => {
  const componentId = req.params.id;

  // SQL query to delete a component by ID
  const q = `DELETE FROM components WHERE id = ?`;

  // Execute the SQL query
  pool.query(q, [componentId], (err, result) => {
    if (err) {
      console.error(err); // Log the error to see what went wrong
      return res.status(500).json({ error: "Failed to delete component" });
    }

    if (result.affectedRows === 0) {
      // No rows were affected, which means no component with the given ID was found
      return res.status(404).json({ error: "Component not found" });
    }

    return res.status(200).json({ message: "Component deleted successfully" });
  });
};

export const updateComponent = (req, res) => {
  const componentId = req.params.id;

  const {
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    other_cost,
    invoice_number,
    available_quantity,
    storage_cabinet,
    storage_drawer,
    storage_shelf,
    suppliers_name,
    suppliers_contact_person,
    suppliers_contact_details,
    receipt_date,
    images_urls, // Assuming this is already a JSON string or can be stringified
    data_sheet,
  } = req.body;

  // Query to check if another component with the same name exists
  const checkQuery = `SELECT * FROM components WHERE name = ? AND id != ?`;

  pool.query(checkQuery, [name, componentId], (err, result) => {
    if (err) {
      console.error("Error checking for existing component name:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // If a component with the same name already exists, return 409 Conflict
    if (result.length > 0) {
      return res
        .status(409)
        .json({ message: "Component with this name already exists" });
    }

    // Proceed to update the component if no conflict is found
    const updateQuery = `
      UPDATE components
      SET 
        family = ?, 
        name = ?, 
        purpose = ?, 
        package_type = ?, 
        nominal_value = ?, 
        electrical_supply = ?, 
        unit_cost = ?, 
        other_cost =?,
        invoice_number =?,
        available_quantity = ?, 
        storage_cabinet = ?, 
        storage_drawer = ?, 
        storage_shelf = ?, 
        suppliers_name = ?, 
        suppliers_contact_person = ?, 
        suppliers_contact_details = ?, 
        receipt_date = ?,
        images_urls = ?, 
        data_sheet = ?
      WHERE id = ?`;

    // Ensure images_urls is a properly formatted JSON string
    const imagesUrlsString =
      typeof images_urls === "string"
        ? images_urls
        : JSON.stringify(images_urls);

    const values = [
      family,
      name,
      purpose,
      package_type,
      nominal_value,
      electrical_supply,
      unit_cost,
      other_cost,
      invoice_number,
      available_quantity,
      storage_cabinet,
      storage_drawer,
      storage_shelf,
      suppliers_name,
      suppliers_contact_person,
      suppliers_contact_details,
      receipt_date,
      imagesUrlsString,
      data_sheet,
      componentId,
    ];

    // Execute the update query
    pool.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error updating component:", err);
        return res.status(500).json({ message: "Failed to update component" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Component not found" });
      }

      return res
        .status(200)
        .json({ message: "Component updated successfully" });
    });
  });
};

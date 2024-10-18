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

  let q = `
    SELECT c.*,
    (
      SELECT i.image_url
      FROM images i
      WHERE i.component_id = c.id
      LIMIT 1
    ) AS default_image
    FROM components c

  `;
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
    console.log(data);

    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(200).json(data);
  });
};

export const getComponent = async (req, res) => {
  const id = req.params.id;

  try {
    const query = `
      SELECT 
        c.id,
        c.family,
        c.purpose,
        c.package_type,
        c.nominal_value,
        c.electrical_supply,
        c.unit_cost,
        c.other_cost,
        c.invoice_number,
        c.available_quantity,
        c.storage_cabinet,
        c.storage_drawer,
        c.storage_shelf,
        c.suppliers_name,
        c.suppliers_contact_person,
        c.suppliers_contact_details,
        c.receipt_date,
       data_sheet,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'image_url', i.image_url,
            'image_id', i.id
          )
        ) as images
      FROM 
        components c
      LEFT JOIN 
        images i ON c.id = i.component_id
      WHERE 
        c.id = ?
      GROUP BY 
        c.id;
    `;

    const device = await pool.query(query, id, (err, data) => {
      data[0] = {
        ...data[0],
        images: JSON.parse(data[0].images),
      };

      if (err) {
        return res.status(500).json({ message: "Server error" });
      }
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Component not found!" });
      }
      return res.status(200).json(data[0]);
    });

    console.log(device);
  } catch (error) {
    console.error("Error fetching component:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
    data_sheet,
  } = req.body;

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
      (family, name, purpose, package_type, nominal_value, electrical_supply, unit_cost, other_cost, invoice_number, available_quantity, storage_cabinet, storage_drawer, storage_shelf, suppliers_name, suppliers_contact_person, suppliers_contact_details, receipt_date, data_sheet)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        data_sheet = ?
      WHERE id = ?`;

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

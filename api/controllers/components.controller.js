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

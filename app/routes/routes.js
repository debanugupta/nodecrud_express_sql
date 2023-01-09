const express = require("express");
const db = require("../models/db");
const router = express.Router();

let usStates = require("./useStates.json");

// manage companies
router.get("/companies", (req, res) => {
  let sql = "select * from customer";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res.send(result);
  });
});

router.get("/company/:id", (req, res) => {
  let sql = "select * from companies where id=" + req.params.id;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res.send(result);
  });
});

router.post("/createcompany", (req, res) => {
  let data = req.body;
  let sql = "INSERT INTO companies SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send({
      data: req.body,
      message: "Company created Successfully",
    });
  });
});

router.post("/updatecompany/:id", (req, res) => {
  let data = req.body;
  let sql = `UPDATE companies SET name = '${data.name}', address='${data.address}', coordinates='${data.coordinates}' WHERE id = ${req.params.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send({
      data: req.body,
      message: "Company created Successfully",
    });
  });
});

router.post("/insertusertocompany", (req, res) => {
  let data = req.body;
  let sql = "INSERT INTO companyuser SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send({
      data: req.body,
      message: "User mapped to company Successfully",
    });
  });
});

router.get("/deletecompany/:id", (req, res) => {
  let sql2 = "DELETE FROM companyuser WHERE companyid = " + req.params.id;
  db.query(sql2, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let sql = "DELETE FROM companies WHERE id = " + req.params.id;
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.send({ message: "Company deleted successfully" });
    });
  });
});

// manage users

router.get("/users", (req, res) => {
  let sql = "select * from users";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res.send(result);
  });
});

router.get("/user/:id", (req, res) => {
  let sql = "select * from users where id=" + req.params.id;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res.send(result);
  });
});

router.post("/createuser", (req, res) => {
  let data = req.body;
  let sql = "INSERT INTO users SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send({ data: result, message: "User created Successfully" });
  });
});

router.post("/updateuser/:id", (req, res) => {
  let data = req.body;
  let sql = `UPDATE users SET firstname = '${data.firstname}',lastname = '${data.lastname}', email='${data.email}', designation='${data.designation}',dob = '${data.dob}', active = '${data.active}' WHERE id = ${req.params.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send({ data: req.body, message: "User Updated Successfully" });
  });
});

router.get("/deactivateuser/:id", (req, res) => {
  let sql = `UPDATE users SET active = '${false}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send({ message: "User deactivated Successfully" });
  });
});

router.get("/deleteuser/:id", (req, res) => {
  let sql2 = "DELETE FROM companyuser WHERE userid = " + req.params.id;
  db.query(sql2, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let sql = "DELETE FROM users WHERE id = " + req.params.id;
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.send({ message: "User deleted successfully" });
    });
  });
});

router.post("/migrateuser", (req, res) => {
  let data = req.body;
  let sql = `UPDATE companyuser SET companyid = '${data.companyid}' WHERE userid = ${data.userid}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send({ message: "User migrated Successfully" });
  });
});

router.get("/states", (req, res) => {
  res.json(usStates);
});

module.exports = router;

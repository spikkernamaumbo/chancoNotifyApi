const dbConnection = require("../DatabaseConnection");
const DataTypes = require("sequelize");
const department = require("../models/department.js");

const faculty = dbConnection.define(
  "faculty",
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);


faculty.hasMany(department,{
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
department.belongsTo(faculty)


module.exports = faculty;

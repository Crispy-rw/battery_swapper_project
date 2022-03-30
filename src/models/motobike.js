const Sequelize = require('sequelize');
import { sequelize } from '../config/dbConnect';


  const motobike = sequelize.define('motobike', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    platenumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    driver_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'motobike',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  export default motobike;

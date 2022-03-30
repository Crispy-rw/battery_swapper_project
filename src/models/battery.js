const Sequelize = require('sequelize');
import { sequelize } from '../config/dbConnect';

  const battery =  sequelize.define('battery', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serial_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    max_power: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    battery_status: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'available'
    }
  }, {
    sequelize,
    tableName: 'battery',
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


  export default battery;

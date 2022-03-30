const Sequelize = require('sequelize');
import {sequelize} from '../config/dbConnect'

  const travel = sequelize.define('travel', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    battery_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    motorbike_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    battery_power_start : {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    battery_power_end : {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    distance: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    start_time: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: Date.now()
    },
    end_time: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'travel',
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

  export default travel;

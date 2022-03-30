const Sequelize = require('sequelize');
import { sequelize } from '../config/dbConnect';

  const coordinates =  sequelize.define('coordinates', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    travel_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    latitude: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    longitude: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: Date.now()
    }
  }, {
    sequelize,
    tableName: 'coordinates',
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

export default coordinates;

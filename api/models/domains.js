const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('domains', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stores',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active','suspend','nonactive'),
      allowNull: false,
      defaultValue: "active"
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'domains',
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
      {
        name: "store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
};

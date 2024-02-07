const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detail_transactions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    total_unit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
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
    tableName: 'detail_transactions',
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
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    account_number: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    account_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    qrcode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('bank','ewallet'),
      allowNull: true
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
    dele: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'payments',
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

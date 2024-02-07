const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    id: {
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
    code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_item: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    voucher_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    voucher_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    min_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    admin: {
      type: DataTypes.JSON,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    delivery: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    status_delivery: {
      type: DataTypes.ENUM('waiting','process','delivery','success','cancel'),
      allowNull: true
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
    tableName: 'transactions',
    timestamps: false,
    indexes: [
      {
        name: "store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

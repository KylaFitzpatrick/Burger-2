module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 160]
        }
      }
    });
    Customer.associate = function(models) {
        // We're saying that a Burger should belong to an Customer
        // A Burger can't be created without an Customer due to the foreign key constraint
        Customer.belongsTo(models.Burger, {
        //   foreignKey: {
        //     allowNull: false
          })
        // });
      };
  
    return Customer;
  };
const { Model, DataTypes } = require('sequelize')

class Account extends Model {
    static init(sequelize) {
        super.init({
            companyName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: { 
                type: DataTypes.STRING, 
                allowNull: false,
                unique: true,
            },
            subDomain: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            deletedAt: {
                type: DataTypes.DATE
            }
        }, {
           sequelize,
           tableName: 'accounts'
        })
    }
}

module.exports = Account;
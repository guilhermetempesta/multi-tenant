const { Model, DataTypes } = require('sequelize')

class Bank extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            code: DataTypes.STRING,
            deletedAt: DataTypes.DATE
        }, {
           sequelize,
           tableName: 'banks'
        })
    }
/*    
    static associate(models) {
        
    }
*/
}

module.exports = Bank;
const { Model, DataTypes } = require('sequelize')

class City extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            state: DataTypes.STRING,
            code: DataTypes.STRING,
            deleted_at: DataTypes.DATE
        }, {
           sequelize,
           tableName: 'cities'
        })
    }
/*    
    static associate(models) {
        this.hasMany(models.Broker, { foreignKey: 'city_id', as: 'brokers' });
        this.hasMany(models.Company, { foreignKey: 'city_id', as: 'companies' });
        this.hasMany(models.BankAccount, { foreignKey: 'city_id', as: 'bank_accounts' });
    }
*/
}

module.exports = City;
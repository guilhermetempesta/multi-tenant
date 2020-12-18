const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
            deletedAt: DataTypes.DATE
        }, {
           sequelize,
           tableName: 'users' 
        })
    }

    // static associate(models) {
    //     this.hasMany(models.Contract, { foreignKey: 'user_id', as: 'contracts' })
    // }
}

module.exports = User;
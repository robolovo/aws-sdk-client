const {Model, DataTypes} = require('sequelize');

module.exports = class Vpc extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            cidr_block: {
                type: DataTypes.STRING, 
            },
            dhcp_options_id: {
                type: DataTypes.STRING, 
            },
            state: {
                type: DataTypes.STRING, 
            },
            vpc_id: {
                type: DataTypes.STRING, 
            },
            owner_id: {
                type: DataTypes.STRING, 
            },
            instance_tenancy: {
                type: DataTypes.STRING, 
            },
            is_default: {
                type: DataTypes.STRING, 
            },
            ipv6_cidr_block_association_set: {
                type: DataTypes.JSON,
            },
            cidr_block_association_set: {
                type: DataTypes.JSON,
            },
            tags: {
                type: DataTypes.JSON,
            },
        }, {
            sequelize,  
            modelName: 'Vpc',      
            tableName: 'vpc',     
            charset: 'utf8',
            collate: 'utf8_general_ci',
            indexes: [
                {
                    unique: true,
                    fields: ['vpc_id']
                }
            ]
        });
    }
}
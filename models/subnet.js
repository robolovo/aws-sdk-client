const {Model, DataTypes} = require('sequelize');

module.exports = class Subnet extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            availability_zone: {
                type: DataTypes.STRING, 
            },
            availability_zone_id: {
                type: DataTypes.STRING, 
            },
            available_ip_address_count: {
                type: DataTypes.BIGINT, 
            },
            cidr_block: {
                type: DataTypes.STRING, 
            },
            default_for_az: {
                type: DataTypes.BOOLEAN, 
            },
            map_public_ip_on_launch: {
                type: DataTypes.BOOLEAN, 
            },
            map_customer_owned_ip_on_launch: {
                type: DataTypes.BOOLEAN, 
            },
            state: {
                type: DataTypes.STRING,
            },
            subnet_id: {
                type: DataTypes.STRING,
            },
            vpc_id: {
                type: DataTypes.STRING,
            },
            owner_id: {
                type: DataTypes.STRING,
            },
            assign_ipv6_address_on_creation: {
                type: DataTypes.BOOLEAN,
            },
            ipv6_cidr_block_association_set: {
                type: DataTypes.JSON,
            },
            tags: {
                type: DataTypes.JSON,
            },
            subnet_arn: {
                type: DataTypes.STRING,
            },
            enable_dns64: {
                type: DataTypes.BOOLEAN,
            },
            ipv6_native: {
                type: DataTypes.BOOLEAN,
            },
            private_dns_name_options_on_launch: {
                type: DataTypes.JSON,
            },
        }, {
            sequelize,  
            modelName: 'Subnet',      
            tableName: 'subnet',     
            charset: 'utf8',
            collate: 'utf8_general_ci',
            indexes: [
                {
                    unique: true,
                    fields: ['subnet_id', 'vpc_id']
                }
            ]
        });
    }
}
const AWS = require('aws-sdk');
const Vpc = require('../models/vpc');
const Subnet = require('../models/subnet');
const e = require('express');

module.exports = {
    getVpcs(req, res) {
        const ec2 = new AWS.EC2({
            credentials: new AWS.Credentials(
                process.env.AWS_ACCESS_KEY_ID,
                process.env.AWS_SECRET_ACCESS_KEY
            ),
            region: req.query.region
        });
        
        try {
            ec2.describeVpcs((err, data) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: err.message,
                        stack_trace: err.stack
                    });
                } else {
                    const vpcs = data.Vpcs;
                    vpcs.forEach(async vpc => {
                        const findVpc = await Vpc.findOne({
                            where: {
                                vpc_id: vpc.VpcId
                            } 
                        });
    
                        let query = {
                            cidr_block: vpc.CidrBlock,
                            dhcp_options_id: vpc.DhcpOptionsId,
                            state: vpc.State,
                            vpc_id: vpc.VpcId,
                            owner_id: vpc.OwnerId,
                            instance_tenancy: vpc.InstanceTenancy,
                            is_default: vpc.IsDefault,
                            ipv6_cidr_block_association_set: vpc.Ipv6CidrBlockAssociationSet,
                            cidr_block_association_set: vpc.CidrBlockAssociationSet,
                            tags: vpc.Tags,
                        };
    
                        if (findVpc === undefined || findVpc === null) {
                            await Vpc.create(query);
                        } else {
                            await Vpc.update(query, {
                                where: {
                                    vpc_id: vpc.VpcId
                                } 
                            });
                        }
                    })
                    
                    res.status(200).send({
                        vpcs: vpcs
                    });
                }
            });
        } catch(err) {
            console.log('err hello');
            res.status(500).send({
                success: false,
                message: err.message,
                stack_trace: err.stack
            });
        }
    },
    async getSubnets(req, res) {
        const ec2 = new AWS.EC2({
            credentials: new AWS.Credentials(
                process.env.AWS_ACCESS_KEY_ID,
                process.env.AWS_SECRET_ACCESS_KEY
            ),
            region: req.query.region
        });

        try {
            await ec2.describeSubnets((err, data) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: err.message,
                        stack_trace: err.stack
                    });
                } else {
                    const subnets = data.Subnets;
                    subnets.forEach(async subnet => {
                        const findSubnet = await Subnet.findOne({
                            where: {
                                subnet_id: subnet.SubnetId,
                                vpc_id: subnet.VpcId
                            } 
                        });
    
                        let query = {
                            availability_zone: subnet.AvailabilityZone,
                            availability_zone_id: subnet.AvailabilityZoneId,
                            available_ip_address_count: subnet.AvailableIpAddressCount,
                            cidr_block: subnet.CidrBlock,
                            default_for_az: subnet.DefaultForAz,
                            map_public_ip_on_launch: subnet.MapPublicIpOnLaunch,
                            map_customer_owned_ip_on_launch: subnet.MapCustomerOwnedIpOnLaunch,
                            state: subnet.State,
                            subnet_id: subnet.SubnetId,
                            vpc_id: subnet.VpcId,
                            owner_id: subnet.OwnerId,
                            assign_ipv6_address_on_creation: subnet.AssignIpv6AddressOnCreation,
                            ipv6_cidr_block_association_set: subnet.Ipv6CidrBlockAssociationSet,
                            tags: subnet.Tags,
                            subnet_arn: subnet.SubnetArn,
                            enable_dns64: subnet.EnableDns64,
                            ipv6_native: subnet.Ipv6Native,
                            private_dns_name_options_on_launch: subnet.PrivateDnsNameOptionsOnLaunch
                        };
    
                        if (findSubnet === undefined || findSubnet === null) {
                            await Subnet.create(query);
                        } else {
                            await Subnet.update(query, {
                                where: {
                                    subnet_id: subnet.SubnetId,
                                    vpc_id: subnet.VpcId
                                } 
                            });
                        }
                    });
    
                    res.status(200).send({
                        subnets: subnets
                    });
                }
            });
        } catch(err) {
            res.status(500).send({
                success: false,
                message: err.message,
                stack_trace: err.stack
            });
        }
    },
};
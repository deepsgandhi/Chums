CREATE DATABASE IF NOT EXISTS `AccessManagement`;

GRANT ALL PRIVILEGES ON AccessManagement.* To 'admin'@'%';


USE `AccessManagement`;


SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `roleMembers`;
DROP TABLE IF EXISTS `rolePermissions`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `churches`;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE `churches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `subDomain` varchar(45) DEFAULT NULL,
  `registrationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `authGuid` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `registrationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `lastLogin` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `appName` varchar(45) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_roles_churches_idx` (`churchId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `roleMembers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `dateAdded` datetime DEFAULT NULL,
  `addedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_roleMembers_roles_idx` (`roleId`),
  KEY `fk_roleMembers_users_idx` (`userId`),
  KEY `fk_roleMembers_churches_idx` (`churchId`),
  CONSTRAINT `fk_roleMembers_roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_roleMembers_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `rolePermissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `contentType` varchar(45) DEFAULT NULL,
  `contentId` int(11) DEFAULT NULL,
  `action` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rolePermissions_churches_idx` (`churchId`),
  KEY `fk_rolePermissions_role_idx` (`roleId`),
  CONSTRAINT `fk_rolePermissions_Role` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
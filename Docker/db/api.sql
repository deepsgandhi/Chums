#CREATE DATABASE IF NOT EXISTS `chums`;
USE `chums`;
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `answers`;
DROP TABLE IF EXISTS `campuses`;
DROP TABLE IF EXISTS `donationBatches`;
DROP TABLE IF EXISTS `donations`;
DROP TABLE IF EXISTS `forms`;
DROP TABLE IF EXISTS `formSubmissions`;
DROP TABLE IF EXISTS `fundDonations`;
DROP TABLE IF EXISTS `funds`;
DROP TABLE IF EXISTS `groupMembers`;
DROP TABLE IF EXISTS `groups`;
DROP TABLE IF EXISTS `groupServiceTimes`;
DROP TABLE IF EXISTS `households`;
DROP TABLE IF EXISTS `notes`;
DROP TABLE IF EXISTS `people`;
DROP TABLE IF EXISTS `questions`;
DROP TABLE IF EXISTS `reports`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `serviceTimes`;
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `visits`;
DROP TABLE IF EXISTS `visitSessions`;

SET FOREIGN_KEY_CHECKS=1;

# Round 1

CREATE TABLE `campuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address1` varchar(50) DEFAULT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `removed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

CREATE TABLE `donationBatches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `batchDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;


CREATE TABLE `forms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contentType` varchar(50) DEFAULT NULL,
  `createdTime` datetime DEFAULT NULL,
  `modifiedTime` datetime DEFAULT NULL,
  `removed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

CREATE TABLE `funds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `removed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `categoryName` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `trackAttendance` bit(1) DEFAULT NULL,
  `parentPickup` bit(1) DEFAULT NULL,
  `removed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=555 DEFAULT CHARSET=latin1;

CREATE TABLE `households` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=613 DEFAULT CHARSET=latin1;

CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `contentType` varchar(50) DEFAULT NULL,
  `contentId` int(11) DEFAULT NULL,
  `noteType` varchar(50) DEFAULT NULL,
  `addedBy` int(11) DEFAULT NULL,
  `dateAdded` datetime DEFAULT NULL,
  `contents` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;


#Round2

CREATE TABLE `people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `displayName` varchar(100) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `nickName` varchar(50) DEFAULT NULL,
  `prefix` varchar(10) DEFAULT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `birthDate` datetime DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `maritalStatus` varchar(10) DEFAULT NULL,
  `anniversary` datetime DEFAULT NULL,
  `membershipStatus` varchar(50) DEFAULT NULL,
  `homePhone` varchar(20) DEFAULT NULL,
  `mobilePhone` varchar(20) DEFAULT NULL,
  `workPhone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address1` varchar(50) DEFAULT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `photoUpdated` datetime DEFAULT NULL,
  `householdId` int(11) DEFAULT NULL,
  `householdRole` varchar(10),
  `removed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1005 DEFAULT CHARSET=latin1;


CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `formId` int(11) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fieldType` varchar(50) DEFAULT NULL,
  `placeholder` varchar(50) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `choices` text,
  `removed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_questions_forms_idx` (`formId`),
  CONSTRAINT `fk_questions_forms` FOREIGN KEY (`formId`) REFERENCES `forms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyName` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `query` text,
  `parameters` varchar(512) DEFAULT NULL,
  `reportType` varchar(45) DEFAULT NULL,
  `columns` text,
  `groupLevels` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `campusId` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `removed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Services_campuses_idx` (`campusId`),
  CONSTRAINT `fk_Services_campuses` FOREIGN KEY (`campusId`) REFERENCES `campuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

CREATE TABLE `serviceTimes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `serviceId` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `removed` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_serviceTimes_services_idx` (`serviceId`),
  CONSTRAINT `fk_serviceTimes_Services` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=latin1;

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `serviceTimeId` int(11) DEFAULT NULL,
  `sessionDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sessions_groups_idx` (`GroupId`),
  KEY `fk_sessions_serviceTimes_idx` (`ServiceTimeId`),
  CONSTRAINT `fk_sessions_Groups` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sessions_ServiceTimes` FOREIGN KEY (`serviceTimeId`) REFERENCES `serviceTimes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1125 DEFAULT CHARSET=latin1;

CREATE TABLE `visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  `serviceId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `visitDate` datetime DEFAULT NULL,
  `checkinTime` datetime DEFAULT NULL,
  `addedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_visits_people_idx` (`PersonId`),
  CONSTRAINT `fk_visits_people` FOREIGN KEY (`personId`) REFERENCES `people` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1209 DEFAULT CHARSET=latin1;

CREATE TABLE `visitSessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `visitId` int(11) DEFAULT NULL,
  `sessionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_visitSessions_visits_idx` (`visitId`),
  KEY `fk_visitSessions_sessions_idx` (`sessionId`),
  CONSTRAINT `fk_visitSessions_Sessions` FOREIGN KEY (`sessionId`) REFERENCES `sessions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_visitSessions_Visits` FOREIGN KEY (`visitId`) REFERENCES `visits` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1172 DEFAULT CHARSET=latin1;


#Round 3
CREATE TABLE `donations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `batchId` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  `donationDate` datetime DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `method` varchar(50) DEFAULT NULL,
  `methodDetails` varchar(50) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `fk_donations_Batches_idx` (`batchId`),
  KEY `fk_donations_People_idx` (`personId`),
  CONSTRAINT `fk_donations_batches` FOREIGN KEY (`batchId`) REFERENCES `donationBatches` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_donations_people` FOREIGN KEY (`personId`) REFERENCES `people` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=latin1;

CREATE TABLE `formSubmissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `formId` int(11) DEFAULT NULL,
  `contentType` varchar(50) DEFAULT NULL,
  `contentId` int(11) DEFAULT NULL,
  `submissionDate` datetime DEFAULT NULL,
  `submittedBy` int(11) DEFAULT NULL,
  `revisionDate` datetime DEFAULT NULL,
  `revisedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_submissions_forms_idx` (`FormId`),
  KEY `fk_submissions_people_idx` (`SubmittedBy`),
  CONSTRAINT `fk_submissions_forms` FOREIGN KEY (`formId`) REFERENCES `forms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_submissions_people` FOREIGN KEY (`submittedBy`) REFERENCES `people` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

CREATE TABLE `fundDonations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `donationId` int(11) DEFAULT NULL,
  `fundId` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_fundDonations_donations_idx` (`DonationId`),
  KEY `fk_fundDonations_funds_idx` (`FundId`),
  CONSTRAINT `fk_fundDonations_donations` FOREIGN KEY (`donationId`) REFERENCES `donations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_fundDonations_Funds` FOREIGN KEY (`fundId`) REFERENCES `funds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=latin1;

CREATE TABLE `groupMembers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  `joinDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_groupMembers_groups_idx` (`groupId`),
  KEY `fk_groupMembers_people_idx` (`personId`),
  CONSTRAINT `fk_groupMembers_groups` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_groupMembers_people` FOREIGN KEY (`personId`) REFERENCES `people` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1395 DEFAULT CHARSET=latin1;

CREATE TABLE `groupServiceTimes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `serviceTimeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_groupServiceTimes_groups_idx` (`groupId`),
  KEY `fk_groupServiceTimes_serviceTime_idx` (`serviceTimeId`),
  CONSTRAINT `fk_groupServiceTimes_groups` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_groupServiceTimes_serviceTime` FOREIGN KEY (`serviceTimeId`) REFERENCES `serviceTimes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=454 DEFAULT CHARSET=latin1;

CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `churchId` int(11) DEFAULT NULL,
  `formSubmissionId` int(11) DEFAULT NULL,
  `questionId` int(11) DEFAULT NULL,
  `value` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_answers_formSubmissions_idx` (`formSubmissionId`),
  KEY `fk_answers_questions_idx` (`questionId`),
  CONSTRAINT `fk_answers_formSubmissions` FOREIGN KEY (`formSubmissionId`) REFERENCES `formSubmissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_answers_questions` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;






















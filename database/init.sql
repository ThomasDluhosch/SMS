CREATE DATABASE IF NOT EXISTS `sms`;
USE `sms`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role_id` INT NOT NULL,
    `address_id` INT NOT NULL,
    FOREIGN KEY (`role_id`) REFERENCES `role`(`id`),
    FOREIGN KEY (`address_id`) REFERENCES `address`(`id`)
);
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `street` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `zip_code` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL
);
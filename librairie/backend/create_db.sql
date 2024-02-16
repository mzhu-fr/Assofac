CREATE SCHEMA `books` ;
CREATE TABLE `books`.`user` (
  `iduser` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `prenom` VARCHAR(45) NULL,
  `nom` VARCHAR(45) NULL,
  `adresse` VARCHAR(250) NULL,
  `codepost` VARCHAR(45) NULL,
  PRIMARY KEY (`iduser`));
CREATE TABLE `books`.`book` (
  `idbook` INT NOT NULL,
  `book_title` VARCHAR(45) NULL,
  `book_author` VARCHAR(45) NULL,
  `book_desc` VARCHAR(300) NULL,
  `book_price` INT NULL,
  `book_cover` VARCHAR(45) NULL,
  `book_quantite` INT NULL,
  `cat` VARCHAR(45) NULL,
  PRIMARY KEY (`idbook`));
ALTER TABLE `books`.`user` 
CHANGE COLUMN `iduser` `iduser` INT NOT NULL AUTO_INCREMENT ;
ALTER TABLE `books`.`book` 
CHANGE COLUMN `idbook` `idbook` INT NOT NULL AUTO_INCREMENT ;
ALTER TABLE `books`.`user` 
ADD COLUMN `role` VARCHAR(45) NOT NULL DEFAULT 'user' AFTER `codepost`;

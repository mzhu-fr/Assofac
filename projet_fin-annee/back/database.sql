CREATE SCHEMA `e-rigation` ;

CREATE TABLE `e-rigation`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(100) NOT NULL,
  `prenom` VARCHAR(50) NOT NULL,
  `adresse` VARCHAR(200) NOT NULL,
  `complement_adresse` VARCHAR(45) NULL,
  `code-postal` VARCHAR(10) NOT NULL,
  `ville` VARCHAR(45) NOT NULL,
  `telephone` VARCHAR(45) NULL,
  `role` VARCHAR(10) NOT NULL DEFAULT 'user',
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`iduser`));

ALTER TABLE `e-rigation`.`user` 
ADD COLUMN `create` TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP AFTER `password`;


CREATE TABLE `e-rigation`.`product-cable` (
  `idcable` INT NOT NULL AUTO_INCREMENT,
  `SKU` VARCHAR(45) NOT NULL,
  `reference` VARCHAR(45) NOT NULL,
  `quantite` INT NOT NULL,
  `longueur` INT NOT NULL,
  `poids` FLOAT NOT NULL,
  `couleur` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `entree-type` VARCHAR(45) NOT NULL,
  `prix` FLOAT NOT NULL,
  `vitesse` FLOAT NOT NULL,
  `create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcable`),
  UNIQUE INDEX `SKU_UNIQUE` (`SKU` ASC) VISIBLE);

CREATE TABLE `e-rigation`.`comments` (
  `idcomments` INT NOT NULL AUTO_INCREMENT,
  `iduser` INT NULL,
  `idproduct` INT NULL,
  `message` VARCHAR(500) NULL,
  `note` INT NULL,
  PRIMARY KEY (`idcomments`),
  INDEX `idproduct_idx` (`idproduct` ASC) VISIBLE,
  INDEX `iduser_idx` (`iduser` ASC) VISIBLE,
  CONSTRAINT `idproduct`
    FOREIGN KEY (`idproduct`)
    REFERENCES `e-rigation`.`product-cable` (`idcable`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `iduser`
    FOREIGN KEY (`iduser`)
    REFERENCES `e-rigation`.`user` (`iduser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `e-rigation`.`historic_command` (
  `idcommand` INT NOT NULL AUTO_INCREMENT,
  `iduser` INT NOT NULL,
  PRIMARY KEY (`idcommand`),
  INDEX `iduser_idx` (`iduser` ASC) VISIBLE,
  CONSTRAINT `idclient`
    FOREIGN KEY (`iduser`)
    REFERENCES `e-rigation`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `e-rigation`.`historic_sold` (
  `idsold` INT NOT NULL AUTO_INCREMENT,
  `idproduct` INT NOT NULL,
  `quantity` INT NOT NULL,
  `idcmd` INT NOT NULL,
  PRIMARY KEY (`idsold`),
  INDEX `idprod_idx` (`idproduct` ASC) VISIBLE,
  INDEX `idcmd_idx` (`idcmd` ASC) VISIBLE,
  CONSTRAINT `idprod`
    FOREIGN KEY (`idproduct`)
    REFERENCES `e-rigation`.`product-cable` (`idcable`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idcmd`
    FOREIGN KEY (`idcmd`)
    REFERENCES `e-rigation`.`historic_command` (`idcommand`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `e-rigation`.`historic_sold` 
ADD COLUMN `datesold` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP AFTER `idcmd`;

ALTER TABLE `e-rigation`.`historic_command` 
ADD COLUMN `date_order` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP AFTER `iduser`;

ALTER TABLE `e-rigation`.`user` 
CHANGE COLUMN `code-postal` `code_postal` VARCHAR(10) NOT NULL ;

ALTER TABLE `e-rigation`.`product-cable` 
CHANGE COLUMN `entree-type` `entree_type` VARCHAR(45) NOT NULL ;

ALTER TABLE `e-rigation`.`product-cable` 
ADD COLUMN `image` VARCHAR(500) NOT NULL AFTER `vitesse`;

ALTER TABLE `e-rigation`.`historic_command` 
ADD COLUMN `status` VARCHAR(45) NULL DEFAULT 'PAID' AFTER `iduser`;



-- INSERT FIRST USER INTO TABLE

INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `complement_adresse`, `code_postal`, `ville`, `telephone`, `role`, `email`, `password`) VALUES ('Zhu', 'Melanie', '14 rue de la beaune', 'Assofac', '93100', 'Montreuil', '0123456789', 'Sadmin', 'monemail@melanie.zhu', '$2a$10$hVtFN5.Qha8u2y5v2zDB5u8Ii0T8LmMrgA/SgGHI1qZwcYM9pTy4q');



-- INSERT FIRST ITEM INTO TABLE

INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, 'image') VALUES ('123-4578', 'USBC-C', '150', '3', '0.3', 'BLEU', 'C', 'C', '14.99', '2.0', 'none');

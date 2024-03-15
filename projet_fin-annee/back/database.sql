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

ALTER TABLE `e-rigation`.`comments` 
ADD UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC) VISIBLE,
ADD UNIQUE INDEX `idproduct_UNIQUE` (`idproduct` ASC) VISIBLE;
;




-- INSERT FIRST USER INTO TABLE

INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `complement_adresse`, `code_postal`, `ville`, `telephone`, `role`, `email`, `password`) VALUES ('Zhu', 'Melanie', '14 rue de la beaune', 'Assofac', '93100', 'Montreuil', '0123456789', 'Sadmin', 'monemail@melanie.zhu', '$2a$10$hVtFN5.Qha8u2y5v2zDB5u8Ii0T8LmMrgA/SgGHI1qZwcYM9pTy4q');

INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `code_postal`, `ville`, `telephone`, `role`, `email`, `password`) VALUES ('PIEUVRE', 'Ursula', '1 Rue Mathis', '92220', 'Gennevilliers', '0612345678', 'user', 'ursula@pieuvre.fr', '$2a$10$Q/hap0v5roKaj6UrIiRIr.bq3zqoV1.tM8SSGmivCVfmuQ/IKyvue');
INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `code_postal`, `ville`, `telephone`, `role`, `email`, `password`) VALUES ('Jean', 'Tom', '19 rue Julien', '75019', 'PARIS', '0620304050', 'user', 'tom@jean.fr', '$2a$10$Q/hap0v5roKaj6UrIiRIr.bq3zqoV1.tM8SSGmivCVfmuQ/IKyvue');
INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `code_postal`, `ville`, `telephone`, `role`, `email`, `password`) VALUES ('Papa', 'Dopoulos', '1 rue Rien', '95000', 'Argentuil', '0789654323', 'user', 'dopoulos@papa.fr', '$2a$10$Q/hap0v5roKaj6UrIiRIr.bq3zqoV1.tM8SSGmivCVfmuQ/IKyvue');
INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `complement_adresse`, `code_postal`, `ville`, `telephone`, `role`, `email`, `password`) VALUES ('Théquin', 'Pigeon', '1 rue de la Blague', 'PAHISI', '93100', 'Montreuil', '0777777777', 'user', 'pigeon@théquin.fr', '$2a$10$Q/hap0v5roKaj6UrIiRIr.bq3zqoV1.tM8SSGmivCVfmuQ/IKyvue');
INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `code_postal`, `ville`, `telephone`, `role`, `email`, `password`) VALUES ('Snee', 'Quers', '298 rue du gros', '31000', 'NULPART', '0788888888', 'user', 'quers@snee.fr', '$2a$10$Q/hap0v5roKaj6UrIiRIr.bq3zqoV1.tM8SSGmivCVfmuQ/IKyvue');
INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `complement_adresse`, `code_postal`, `ville`, `telephone`, `role`, `email`, `password`) VALUES ('Dédieu', 'Caprice', '190 rue du fromage', 'Ferme Dedieu', '12333', 'Pré', '0799999999', 'user', 'caprice@dédieu.com', '$2a$10$Q/hap0v5roKaj6UrIiRIr.bq3zqoV1.tM8SSGmivCVfmuQ/IKyvue');


-- INSERT FIRST ITEM INTO TABLE

INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, 'image') VALUES ('123-4578', 'USBC-C', '150', '3', '0.3', 'BLEU', 'C', 'C', '14.99', '2.0', 'none');
INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, `image`) VALUES ('11122-1', 'USBC-V', '120', '1', '0.1', 'VERT', 'C', 'USB', '25.99', '3.0', 'https://media.startech.com/cms/products/gallery_large/usbaubxmgn.main.jpg');
INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, `image`) VALUES ('11122-2', 'USBC-R', '200', '2', '0.2', 'ROUGE', 'C', 'USB', '35.99', '3.0', 'https://dxbyzx5id4chj.cloudfront.net/fit-in/700x700/filters:fill(fff)/pub/media/catalog/product/c/d/cd183d04_a641_49e7_89a5_ae1cbb42f01c_c623.jpg');
INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, `image`) VALUES ('11123-1', 'USBM-N', '500', '1', '0.1', 'NOIR', 'MICRO', 'USB', '10.99', '2.0', 'https://www.mbtech.fr/38691-thickbox_default/cable-usb-a-micro-usb-noir-1m-.jpg');
INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, `image`) VALUES ('11123-2', 'USBM-B', '100', '3', '0.3', 'BLEU', 'MICRO', 'USB', '8.99', '2.0', 'https://media.startech.com/cms/products/gallery_large/usbaubxmbl.main.jpg');
INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, `image`) VALUES ('11124-1', 'USBL-V', '666', '3', '0.3', 'VIOLET', 'LIGHTNING', 'USB', '12.99', '3.0', 'https://www.cdiscount.com/pdt2/7/4/9/1/700x700/auc9124892917749/rw/cable-de-donnees-de-charge-cable-violet-pour-appl.jpg');
INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, `image`) VALUES ('11124-2', 'USB-R', '300', '2', '0.2', 'ROSE', 'LIGHTNING', 'USB', '14.99', '3.0', 'https://www.sbsmobile.com/fra/190819-thickbox_default/cable-de-donnees-apple-lightning-gold-collection.jpg');


-- INSERT COMMENT
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('2', '18', 'A', '8');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('2', '19', 'B', '9');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('2', '20', 'C', '6');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('2', '21', 'D', '9');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('2', '22', 'E', '8');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('2', '23', 'F', '9');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('11', '18', 'G', '7');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('11', '20', 'H', '7');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('11', '22', 'I', '0');
INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES ('11', '23', 'J', '8');

CREATE TABLE ‘User’ (
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    PRIMARY KEY (Username));

CREATE TABLE ‘Manager’ (
    Username VARCHAR(50) NOT NULL,
    PRIMARY KEY(Username),
    FOREIGN KEY(Username)
        REFERENCES ‘User’ (Username));

CREATE TABLE ‘Customer’ (
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    IsStudent BOOLEAN NOT NULL,
    PRIMARY KEY(Username),
    FOREIGN KEY(Username)
        REFERENCES ‘User’ (Username));

CREATE TABLE ‘Review’ (
    ReviewNumber VARCHAR(50) NOT NULL,
    Comment VARCHAR(50)  NULL,
    Rating VARCHAR(50) NOT NULL,
    PRIMARY KEY (ReviewNumber));

CREATE TABLE ‘Reservation’ (
    ReservationID VARCHAR(50) NOT NULL,
    IsCancelled BOOLEAN NOT NULL,
    PRIMARY KEY (ReservationID));

CREATE TABLE ‘Give’ (
    Username VARCHAR(50) NOT NULL,
    ReviewNumber VARCHAR(50) NOT NULL,
    PRIMARY KEY (Username, ReviewNumber),
    FOREIGN KEY (Username)
        REFERENCES ‘Customer’(Username),
    FOREIGN KEY (ReviewNumber)
        REFERENCES ‘Review’(ReviewNumber));

CREATE TABLE ‘Makes’ (
    Username VARCHAR(50) NOT NULL,
    ReservationID VARCHAR(50) NOT NULL,
    PRIMARY KEY (Username, ReservationID),
    FOREIGN KEY (Username)
        REFERENCES ‘Customer’(Username),
    FOREIGN KEY (ReservationID)
        REFERENCES ‘Reservation’(ReservationID));

CREATE TABLE ‘TrainRoute’ (
    TrainNumber VARCHAR(50) NOT NULL,
    1stClassPrice DECIMAL(6,2) NOT NULL,
    2ndClassPrice DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (TrainNumber));

CREATE TABLE ‘Station’ (
    Name VARCHAR(50) NOT NULL,
    Location VARCHAR(50) NOT NULL,
    PRIMARY KEY (Name));

CREATE TABLE ‘PaymentInfo’ (
    CardNumber VARCHAR(50) NOT NULL,
    CVV VARCHAR(50) NOT NULL,
    ExpDate VARCHAR(50) NOT NULL,
    NameOnCard VARCHAR(50) NOT NULL,
    PRIMARY KEY (CardNumber));

CREATE TABLE ‘SystemInfo’ (
    MaxNumberBaggage INT NOT NULL,
    NumberFreeBags INT NOT NULL,
    StudentDiscount BOOLEAN NOT NULL,
    ChangeFee DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (MaxNumberBaggage));

CREATE TABLE ‘Has’ (
    UserName VARCHAR(50) NOT NULL,
    CardNumber VARCHAR (50) NOT NULL,
    PRIMARY KEY (Username, CardNumber),
    FOREIGN KEY (Username)
        REFERENCES ‘User’(Username),
    FOREIGN KEY (CardNumber)
        REFERENCES ‘PaymentInfo’(CardNumber));

CREATE TABLE ‘Uses’ (
    CardNumber VARCHAR(50) NOT NULL,
    ReservationID VARCHAR(50) NOT NULL,
    PRIMARY KEY (CardNumber, ReservationID),
    FOREIGN KEY (CardNumber)
        REFERENCES ‘PaymentInfo’ (CardNumber),
    FOREIGN KEY (ReservationID)
        REFERENCES ‘Reservation’ (ReservationID));

CREATE TABLE ‘Stop’ (
    TrainNumber VARCHAR(50) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    PRIMARY KEY (TrainNumber, Name),
    FOREIGN KEY (TrainNumber)
        REFERENCES ‘TrainRoute’ (TrainNumber),
    FOREIGN KEY (Name)
        REFERENCES ‘Station’ (Name));

CREATE TABLE ‘Reserves’ (
    TrainNumber VARCHAR(50) NOT NULL,
    ReservationID VARCHAR(50) NOT NULL,
    PRIMARY KEY (TrainNumber, ReservationID),
    FOREIGN KEY (TrainNumber)
        REFERENCES ‘TrainRoute’ (TrainNumber),
    FOREIGN KEY (ReservationID)
        REFERENCES ‘Reservation’ (ReservationID));

CREATE TABLE ‘About’ (
    ReviewNumber VARCHAR(50) NOT NULL,
    TrainNumber VARCHAR(50) NOT NULL,
    PRIMARY KEY (ReviewNumber),
    FOREIGN KEY (ReviewNumber)
        REFERENCES ‘Review’ (ReviewNumber),
    FOREIGN KEY (TrainNumber)
        REFERENCES ‘TrainRoute’ (TrainNumber));
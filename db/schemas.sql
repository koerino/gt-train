CREATE TABLE ‘User’(
            Username varchar(50) NOT NULL,
            Password varchar(50) NOT NULL,
            PRIMARY KEY (Username));

CREATE TABLE ‘Manager’(
            Username varchar(50) NOT NULL,
            PRIMARY KEY(Username),
            FOREIGN KEY(Username)
                   REFERENCES ‘User’ (Username));

CREATE TABLE ‘Customer’ (
           Username varchar(50) NOT NULL,
           Email varchar(50) NOT NULL,
           IsStudent boolean NOT NULL,
           PRIMARY KEY(Username),
           FOREIGN KEY(Username)
                   REFERENCES ‘User’ (Username));

CREATE TABLE ‘Review’(
          ReviewNumber varchar(50) NOT NULL,
          Comment varchar(50)  NULL,
          Rating varchar(50) NOT NULL,
          PRIMARY KEY (ReviewNumber));

CREATE TABLE ‘Reservation’(
          ReservationID varchar(50) NOT NULL,
          TotalCost DECIMAL(8,2) NOT NULL,
          IsCancelled boolean NOT NULL,
          PRIMARY KEY (ReservationID));

CREATE TABLE ‘Give’(
	Username varchar(50) NOT NULL,
	ReviewNumber varchar(50) NOT NULL,
	PRIMARY KEY (Username, ReviewNumber),
	FOREIGN KEY (Username)
		REFERENCES ‘Customer’(Username),
	FOREIGN KEY (ReviewNumber)
		REFERENCES ‘Review’(ReviewNumber));

CREATE TABLE ‘Makes’(
	Username varchar(50) NOT NULL,
	ReservationID varchar(50) NOT NULL,
	PRIMARY KEY (Username, ReservationID),
	FOREIGN KEY (Username)
		REFERENCES ‘Customer’(Username),
	FOREIGN KEY (ReservationID)
		REFERENCES ‘Reservation’(ReservationID));

CREATE TABLE ‘TrainRoute’(
	TrainNumber varchar(50) NOT NULL,
	1stClassPrice DECIMAL(6,2) NOT NULL,
	2ndClassPrice DECIMAL(6,2) NOT NULL,
	PRIMARY KEY (TrainNumber));

CREATE TABLE ‘Station’(
	Name varchar(50) NOT NULL,
	Location varchar(50) NOT NULL,
	PRIMARY KEY (Name));

CREATE TABLE ‘PaymentInfo’(
	CardNumber varchar(50) NOT NULL,
	CVV varchar(50) NOT NULL,
	ExpDate varchar(50) NOT NULL,
	NameOnCard varchar(50) NOT NULL,
PRIMARY KEY (CardNumber));

CREATE TABLE ‘SystemInfo’(
	MaxNumberBaggage INT NOT NULL,
	NumberFreeBags INT NOT NULL,
	StudentDiscount BOOLEAN NOT NULL,
	ChangeFee DECIMAL(6,2) NOT NULL,
	PRIMARY KEY (MaxNumberBaggage));

CREATE TABLE ‘Has’(
	UserName varchar(50) NOT NULL,
	CardNumber varchar (50) NOT NULL,
	PRIMARY KEY (Username, CardNumber),
	FOREIGN KEY (Username)
		REFERENCES ‘User’(Username),
	FOREIGN KEY (CardNumber)
		REFERENCES ‘PaymentInfo’(CardNumber));

CREATE TABLE ‘Uses’(
	CardNumber varchar(50) NOT NULL,
	ReservationID varchar(50) NOT NULL,
	PRIMARY KEY (CardNumber, ReservationID),
	FOREIGN KEY (CardNumber)
		REFERENCES ‘PaymentInfo’ (CardNumber),
	FOREIGN KEY (ReservationID)
		REFERENCES ‘Reservation’ (ReservationID));

CREATE TABLE ‘Stop’(
	TrainNumber varchar(50) NOT NULL,
	Name varchar(50) NOT NULL,
	PRIMARY KEY (TrainNumber, Name),
	FOREIGN KEY (TrainNumber)
		REFERENCES ‘TrainRoute’ (TrainNumber),
	FOREIGN KEY (Name)
		REFERENCES ‘Station’ (Name));

CREATE TABLE ‘Reserves’(
	TrainNumber varchar(50) NOT NULL,
	ReservationID varchar(50) NOT NULL,
	PRIMARY KEY (TrainNumber, ReservationID),
	FOREIGN KEY (TrainNumber)
		REFERENCES ‘TrainRoute’ (TrainNumber),
	FOREIGN KEY (ReservationID)
		REFERENCES ‘Reservation’ (ReservationID));

CREATE TABLE ‘About’ (
          ReviewNumber varchar(50) NOT NULL,
          TrainNumber varchar(50) NOT NULL,
          PRIMARY KEY (ReviewNumber),
          FOREIGN KEY (ReviewNumber)
                  REFERENCES ‘Review’ (ReviewNumber),
          FOREIGN KEY (TrainNumber)
                  REFERENCES ‘TrainRoute’ (TrainNumber));
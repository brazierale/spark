DROP TABLE TestCase
DROP TABLE Tag
DROP TABLE TestCaseTag

CREATE TABLE TestCase (
	Id int IDENTITY(1,1) PRIMARY KEY,
	Summary varchar(255) NOT NULL,
)

CREATE TABLE Comment (
	Id int IDENTITY(1,1) PRIMARY KEY,
	TestCaseId int FOREIGN KEY REFERENCES TestCase(Id),
	Comment varchar(255) NOT NULL,
)

CREATE TABLE Tag (
	Id int IDENTITY(1,1) PRIMARY KEY,
	TagText varchar(64),
)

CREATE TABLE TestCaseTag (
	TestCaseId int FOREIGN KEY REFERENCES TestCase(Id),
	TagId int FOREIGN KEY REFERENCES Tag(Id),
)

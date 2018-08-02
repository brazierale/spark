DROP TABLE dbo.Comment
DROP TABLE dbo.TestCaseTag
DROP TABLE dbo.Tag
DROP TABLE dbo.TestCase

CREATE TABLE TestCase (
	id int IDENTITY(1,1) PRIMARY KEY,
	summary varchar(255) NOT NULL,
)

CREATE TABLE Comment (
	id int IDENTITY(1,1) PRIMARY KEY,
	testCaseId int FOREIGN KEY REFERENCES TestCase(Id),
	comment varchar(255) NOT NULL,
)

CREATE TABLE Tag (
	id int IDENTITY(1,1) PRIMARY KEY,
	tagText varchar(64),
)

CREATE TABLE TestCaseTag (
	testCaseId int FOREIGN KEY REFERENCES TestCase(Id),
	tagId int FOREIGN KEY REFERENCES Tag(Id),
)
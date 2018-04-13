INSERT INTO TestCase VALUES
	('First Test Case')
	
INSERT INTO Tag VALUES
	('TestTag'),
	('Second')

INSERT INTO TestCaseTag VALUES
	(1, 1),
	(1, 2)

SELECT * FROM TestCase
SELECT * FROM Tag
SELECT * FROM TestCaseTag
SELECT * FROM Comment

select * from testcase tc
inner join TestCaseTag tct on tc.id = tct.TestCaseId
where tagid = 2
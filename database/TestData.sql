INSERT INTO testCase VALUES
	('First Test Case')
	
INSERT INTO tag VALUES
	('TestTag'),
	('Second')

INSERT INTO testCaseTag VALUES
	(1, 1),
	(1, 2)

SELECT * FROM testCase
SELECT * FROM tag
SELECT * FROM testCaseTag
SELECT * FROM comment

select * from testcase tc
inner join TestCaseTag tct on tc.id = tct.TestCaseId
where tagid = 2
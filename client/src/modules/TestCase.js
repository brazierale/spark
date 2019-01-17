export class TestCase {
    constructor(
        key,
        summary,
        description,
        tags
        )
        {
            this.key = key;
            this.summary = summary;
            this.description = description;
            this.tags = tags;
        }
}

export const blankTestCase = new TestCase(
    0,
    '',
    '',
    []
);
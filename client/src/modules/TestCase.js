export class TestCase {
    constructor(
        key,
        summary,
        description,
        steps,
        tags
        )
        {
            this.key = key;
            this.summary = summary;
            this.description = description;
            this.steps = steps;
            this.tags = tags;
        }
}

export const blankTestCase = new TestCase(
    0,
    '',
    '',
    [],
    []
);
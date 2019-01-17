export class TestCase {
    constructor(key, summary, tags) {
        this.key = key;
        this.summary = summary;
        this.tags = tags;
    }
}

export const blankTestCase = new TestCase(
    0,
    '',
    []
);
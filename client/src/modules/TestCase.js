export class TestCase {
    constructor(id, summary, tags) {
        this.id = id;
        this.summary = summary;
        this.tags = tags;
    }
}

export const blankTestCase = new TestCase(0, '', []);
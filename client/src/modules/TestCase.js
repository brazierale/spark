export class TestCase {
    constructor(id, summary) {
        this.id = id;
        this.summary = summary;
    }
}

export const blankTestCase = new TestCase(0, '');
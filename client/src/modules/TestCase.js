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
            this.saving = false;
        }
}

export class Step {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export const blankTestCase = new TestCase(
    0,
    '',
    '',
    [],
    [],
);

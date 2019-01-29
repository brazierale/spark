export class TestCaseObject {
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

export class StepObject {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export const blankTestCase = new TestCaseObject(
    0,
    '',
    '',
    [],
    [],
);

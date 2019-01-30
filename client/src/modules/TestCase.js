import { PropTypes } from 'prop-types';

export class StepObject {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

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
            this.disabled = false;
        }
}

export let StepPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })
).isRequired

export let TestCasePropTypes = PropTypes.shape({
    key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    summary: PropTypes.string,
    description: PropTypes.string,
    steps: StepPropTypes,
    tags: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool
})

export const blankTestCase = new TestCaseObject(
    0,
    '',
    '',
    [],
    [],
);

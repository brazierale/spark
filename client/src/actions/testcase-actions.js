import { TestCase, blankTestCase } from '../modules/TestCase';
import axios from 'axios';

export const ADD_TEST_CASE = 'addTestCase';
export const GET_TESTCASES_BEGIN = 'GET_TESTCASES_BEGIN';
export const GET_TESTCASES_SUCCESS = 'GET_TESTCASES_SUCCESS';
export const GET_TESTCASES_FAILURE = 'GET_TESTCASES_FAILURE';

export const getTestCasesBegin = () => ({
    type: GET_TESTCASES_BEGIN
});
export const getTestCasesSuccess = testCases => ({
    type: GET_TESTCASES_SUCCESS,
    payload: { testCases }
});
export const getTestCasesFailure = err => ({
    type: GET_TESTCASES_FAILURE,
    payload: { err }
});

export function addTestCase(testCase) {
    return {
        type: ADD_TEST_CASE,
        testCase: {
            id: testCase.id,
            summary: testCase.summary
        }
    }
}

export function getTestCases() {
    return dispatch => {
        dispatch(getTestCasesBegin());

        let testCases = [];
        axios.get("/api/testCases")
            .then(res => {
                if (res.data.data.length > 0) {
                    testCases = res.data.data.map((testCase) => new TestCase(testCase._id, testCase.summary));
                }
                testCases.push(blankTestCase);
            })
            .then(() => {
                dispatch(getTestCasesSuccess(testCases));
                return testCases;
            })
            .catch(err => dispatch(getTestCasesFailure(err)));
    }
}
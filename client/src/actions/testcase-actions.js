import { TestCase, blankTestCase } from '../modules/TestCase';
import axios from 'axios';

export const SET_SELECTED_TESTCASE = 'SET_SELECTED_TESTCASE'
export const ADD_TEST_CASE_BEGIN = 'ADD_TESTCASE_BEGIN';
export const ADD_TEST_CASE_SUCCESS = 'ADD_TESTCASE_SUCCESS';
export const ADD_TEST_CASE_FAILURE = 'ADD_TESTCASE_FAILURE';
export const GET_TESTCASES_BEGIN = 'GET_TESTCASES_BEGIN';
export const GET_TESTCASES_SUCCESS = 'GET_TESTCASES_SUCCESS';
export const GET_TESTCASES_FAILURE = 'GET_TESTCASES_FAILURE';

export const setSelectedTestCase = testCaseId => ({
    type: SET_SELECTED_TESTCASE,
    payload: { testCaseId }
})
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
export const addTestCasesBegin = () => ({
    type: ADD_TEST_CASE_BEGIN
});
export const addTestCaseSuccess = (testCase) => ({
    type: ADD_TEST_CASE_SUCCESS,
    payload: { testCase }
});
export const addTestCaseFailure = (err) => ({
    type: ADD_TEST_CASE_FAILURE,
    payload: { err }
})

export function setSelectedTestCaseById(testCaseId) {
    return dispatch => {
        dispatch(setSelectedTestCase(testCaseId));
    }
}

export function addTestCase(testCase) {
    return dispatch => {
        dispatch(addTestCasesBegin());

        axios.post("/api/testCases", {
            summary: testCase.summary
        })
        .then(res => {
            dispatch(addTestCaseSuccess(testCase));
            dispatch(getTestCases());
        })
        .catch(err => dispatch(addTestCaseFailure(err)));
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
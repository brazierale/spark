import { TestCase, blankTestCase } from '../modules/TestCase';
import axios from 'axios';

export const SET_SELECTED_TESTCASE = 'SET_SELECTED_TESTCASE'
export const ADD_TEST_CASE_BEGIN = 'ADD_TESTCASE_BEGIN';
export const ADD_TEST_CASE_SUCCESS = 'ADD_TESTCASE_SUCCESS';
export const ADD_TEST_CASE_FAILURE = 'ADD_TESTCASE_FAILURE';
export const DELETE_TEST_CASE_BEGIN = 'DELETE_TESTCASE_BEGIN';
export const DELETE_TEST_CASE_SUCCESS = 'DELETE_TESTCASE_SUCCESS';
export const DELETE_TEST_CASE_FAILURE = 'DELETE_TESTCASE_FAILURE';
export const UPDATE_TEST_CASE_BEGIN = 'UPDATE_TESTCASE_BEGIN';
export const UPDATE_TEST_CASE_SUCCESS = 'UPDATE_TESTCASE_SUCCESS';
export const UPDATE_TEST_CASE_FAILURE = 'UPDATE_TESTCASE_FAILURE';
export const GET_TESTCASES_BEGIN = 'GET_TESTCASES_BEGIN';
export const GET_TESTCASES_SUCCESS = 'GET_TESTCASES_SUCCESS';
export const GET_TESTCASES_FAILURE = 'GET_TESTCASES_FAILURE';

export const setSelectedTestCase = id => ({
    type: SET_SELECTED_TESTCASE,
    payload: { id }
});
export const addTestCasesBegin = testCase => ({
    type: ADD_TEST_CASE_BEGIN,
    payload: { testCase }
});
export const addTestCaseSuccess = () => ({
    type: ADD_TEST_CASE_SUCCESS,
});
export const addTestCaseFailure = err => ({
    type: ADD_TEST_CASE_FAILURE,
    payload: { err }
});
export const deleteTestCasesBegin = id => ({
    type: DELETE_TEST_CASE_BEGIN,
    payload: { id }
});
export const deleteTestCaseSuccess = () => ({
    type: DELETE_TEST_CASE_SUCCESS
});
export const deleteTestCaseFailure = err => ({
    type: DELETE_TEST_CASE_FAILURE,
    payload: { err }
});
export const updateTestCasesBegin = testCase => ({
    type: UPDATE_TEST_CASE_BEGIN,
    payload: { testCase }
});
export const updateTestCaseSuccess = () => ({
    type: UPDATE_TEST_CASE_SUCCESS
});
export const updateTestCaseFailure = err => ({
    type: UPDATE_TEST_CASE_FAILURE,
    payload: { err }
});
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

export function setSelectedTestCaseById(id) {
    return dispatch => {
        dispatch(setSelectedTestCase(id));
    }
}

export function addTestCase(testCase) {
    return dispatch => {
        dispatch(addTestCasesBegin(testCase));

        axios.post("/api/testCases", {
            summary: testCase.summary
        })
        .then(res => {
            dispatch(addTestCaseSuccess());
            dispatch(getTestCases());
        })
        .catch(err => dispatch(addTestCaseFailure(err)));
    }
}

export function deleteTestCaseById(id) {
    return dispatch => {
        dispatch(deleteTestCasesBegin(id));
        axios.delete(`/api/testCases/${id}`)
        .then(res => {
            dispatch(deleteTestCaseSuccess());
            dispatch(getTestCases());
        })
        .catch(err => dispatch(deleteTestCaseFailure(err)));
    }
}

export function updateTestCase(testCase) {
    return dispatch => {
        const updatedTestCase = new TestCase(testCase.id, testCase.summary);
        dispatch(updateTestCasesBegin(updatedTestCase));

        axios.put(`/api/testCases/${testCase.id}`, {
            update: {summary: updatedTestCase.summary}
        })
        .then(res => {
            dispatch(updateTestCaseSuccess());
            dispatch(getTestCases());
        })
        .catch(err => dispatch(deleteTestCaseFailure(err)));
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
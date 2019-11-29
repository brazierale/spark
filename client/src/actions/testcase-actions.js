import { TestCaseObject, blankTestCase } from '../modules/TestCase';
import axios from 'axios';

export const SET_SELECTED_TESTCASE = 'SET_SELECTED_TESTCASE';
export const UPDATE_SELECTED_TESTCASE = 'UPDATE_SELECTED_TESTCASE';
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
export const TOGGLE_TAG_FILTER = 'TOGGLE_TAG_FILTER';
export const SET_DRAG_ENABLED = 'SET_DRAG_ENABLED';

export const setSelectedTestCase = key => ({
    type: SET_SELECTED_TESTCASE,
    payload: { key }
});
export const updateSelectedTestCaseExecute = (updateType, update) => ({
    type: UPDATE_SELECTED_TESTCASE,
    payload: { updateType, update }
})
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
export const deleteTestCasesBegin = key => ({
    type: DELETE_TEST_CASE_BEGIN,
    payload: { key }
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
export const toggleTagFilter = tag => ({
    type: TOGGLE_TAG_FILTER,
    payload: { tag }
});
export const setDragEnabled = dragEnabled => ({
    type: SET_DRAG_ENABLED,
    payload: { dragEnabled }
});

export function setSelectedTestCaseByKey(key) {
    return dispatch => {
        dispatch(setSelectedTestCase(key));
    }
}

export function updateSelectedTestCase(updateType, update) {
    return dispatch => {
        dispatch(updateSelectedTestCaseExecute(updateType, update));
    }
}

export function addTestCase(testCase) {
    return dispatch => {
        let updatedTestCase = testCase;
        updatedTestCase.disabled = true;

        dispatch(addTestCasesBegin(testCase));

        axios.post("/api/testCases", {
            key: testCase.key,
            sortId: testCase.sortId,
            summary: testCase.summary,
            description: testCase.description,
            steps: testCase.steps,
            tags: testCase.tags
        })
        .then(res => {
            dispatch(addTestCaseSuccess());
            dispatch(getTestCases());
        })
        .catch(err => dispatch(addTestCaseFailure(err)));
    }
}

export function deleteTestCaseByKey(key) {
    return dispatch => {
        dispatch(deleteTestCasesBegin(key));
        axios.delete(`/api/testCases/${key}`)
        .then(res => {
            dispatch(deleteTestCaseSuccess());
            dispatch(getTestCases());
        })
        .catch(err => dispatch(deleteTestCaseFailure(err)));
    }
}

export function updateTestCase(testCase) {
    return dispatch => {
        let updatedTestCase = testCase;
        updatedTestCase.disabled = true;

        dispatch(updateTestCasesBegin(updatedTestCase));

        axios.put(`/api/testCases/${testCase.key}`, {
            update: {
                summary: testCase.summary,
                sortId: testCase.sortId,
                description: testCase.description,
                steps: testCase.steps,
                tags: testCase.tags
            }
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
        axios.get("/api/testCases/")
            .then(res => {
                if (res.data.data.length > 0) {
                    testCases = res.data.data.map((testCase) =>
                        new TestCaseObject(
                            testCase.key,
                            testCase.sortId,
                            testCase.summary,
                            testCase.description,
                            testCase.steps,
                            testCase.tags
                        )
                    );
                }
                testCases.push(blankTestCase());
            })
            .then(() => {
                dispatch(getTestCasesSuccess(testCases));
            })
            .catch(err => dispatch(getTestCasesFailure(err)));
    }
}

export function filterByTag(tag) {
    return dispatch => {
        dispatch(toggleTagFilter(tag));
        dispatch(getTestCases());
    }
}

export function setDragEnabledStatus(bool) {
    return dispatch => {
        dispatch(setDragEnabled(bool));
    }
}
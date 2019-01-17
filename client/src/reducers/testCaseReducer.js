import {
    SET_SELECTED_TESTCASE,
    UPDATE_SELECTED_TESTCASE,
    GET_TESTCASES_BEGIN,
    GET_TESTCASES_SUCCESS,
    GET_TESTCASES_FAILURE,
    ADD_TEST_CASE_BEGIN,
    ADD_TEST_CASE_SUCCESS,
    ADD_TEST_CASE_FAILURE,
    DELETE_TEST_CASE_BEGIN,
    DELETE_TEST_CASE_SUCCESS,
    DELETE_TEST_CASE_FAILURE,
    UPDATE_TEST_CASE_BEGIN,
    UPDATE_TEST_CASE_SUCCESS,
    UPDATE_TEST_CASE_FAILURE
} from '../actions/testcase-actions';
import { blankTestCase } from '../modules/TestCase';

const blankState = {
    testCases: [blankTestCase],
    selectedTestCase: blankTestCase,
    loading: false,
    saving: false,
    error: null
}

export default function testCaseReducer(state = blankState, action) {
    switch (action.type) {
        case SET_SELECTED_TESTCASE:
            return {
                ...state,
                selectedTestCase: state.testCases.find(x => x.key === action.payload.key)
            }
        case UPDATE_SELECTED_TESTCASE:
            return {
                ...state,
                selectedTestCase: action.payload.testCase
            }
        case ADD_TEST_CASE_BEGIN:
            return {
                ...state,
                testCases: [
                    ...state.testCases.slice(0, state.testCases.length-1),
                    action.payload.testCase,
                    blankTestCase
                ],
                saving: true,
                error: null
            }
        case ADD_TEST_CASE_SUCCESS:
            return {
                ...state,
                saving: false
            };
        case ADD_TEST_CASE_FAILURE:
            return {
                ...state,
                saving: false,
                error: action.payload.error
            }
        case DELETE_TEST_CASE_BEGIN:
            return {
                ...state,
                testCases: [
                    ...state.testCases.filter(tc => tc.key !== action.payload.key)
                ],
                saving: true,
                error: null
            }
        case DELETE_TEST_CASE_SUCCESS:
            return {
                ...state,
                saving: false
            };
        case DELETE_TEST_CASE_FAILURE:
            return {
                ...state,
                saving: false,
                error: action.payload.error
            }
        case UPDATE_TEST_CASE_BEGIN:
            let newArray = state.testCases;
            let index = newArray.findIndex( tc => {return tc.key === action.payload.testCase.key });

            newArray[index] = action.payload.testCase;
            
            return {
                ...state,
                testCases: newArray,
                saving: true,
                error: null
            }
        case UPDATE_TEST_CASE_SUCCESS:
            return {
                ...state,
                saving: false
            };
        case UPDATE_TEST_CASE_FAILURE:
            return {
                ...state,
                saving: false,
                error: action.payload.error
            }
        case GET_TESTCASES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_TESTCASES_SUCCESS:
            return {
                ...state,
                testCases: action.payload.testCases,
                selectedTestCase: action.payload.testCases.find(x => x.key === state.selectedTestCase.key),
                loading: false,
                error: null
            }
        case GET_TESTCASES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
import {
    SET_SELECTED_TESTCASE,
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
                selectedTestCase: state.testCases.find(x => x.id === action.payload.id)
            }
        case ADD_TEST_CASE_BEGIN:
            return {
                ...state,
                saving: true,
                error: null
            }
        case ADD_TEST_CASE_SUCCESS:
            return {
                ...state,
                testCases: [
                    ...state.testCases.slice(0, state.testCases.length-1),
                    action.payload.testCase,
                    blankTestCase
                ],
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
                saving: true,
                error: null
            }
        case DELETE_TEST_CASE_SUCCESS:
            return {
                ...state,
                testCases: [
                    ...state.testCases.filter(tc => tc.id !== action.payload.id)
                ],
                saving: false
            };
        case DELETE_TEST_CASE_FAILURE:
            return {
                ...state,
                saving: false,
                error: action.payload.error
            }
        case UPDATE_TEST_CASE_BEGIN:
            return {
                ...state,
                saving: true,
                error: null
            }
        case UPDATE_TEST_CASE_SUCCESS:
            let newArray = state.testCases;
            let index = newArray.findIndex( tc => {return tc.id === action.payload.testCase.id });

            newArray[index].summary = action.payload.testCase.summary;

            return {
                ...state,
                testCases: newArray,
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
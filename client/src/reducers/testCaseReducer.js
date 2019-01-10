import {
    SET_SELECTED_TESTCASE,
    GET_TESTCASES_BEGIN,
    GET_TESTCASES_SUCCESS,
    GET_TESTCASES_FAILURE,
    ADD_TEST_CASE_BEGIN,
    ADD_TEST_CASE_SUCCESS,
    ADD_TEST_CASE_FAILURE
} from '../actions/testcase-actions';
import { blankTestCase } from '../modules/TestCase';

const blankState = {
    testCases: [blankTestCase],
    selectedTestCase: blankTestCase,
    loading: false,
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
            loading: true,
            error: null
        }
        case ADD_TEST_CASE_SUCCESS:
            return {
                ...state,
                testCases: [
                    ...state.testCases.slice(0, state.testCases.length-1),
                    action.payload.testCase,
                    ...state.testCases.slice(state.testCases.length-1)
                ]
            };
        case ADD_TEST_CASE_FAILURE:
        return {
            ...state,
            loading: false,
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
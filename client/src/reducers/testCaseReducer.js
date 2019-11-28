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
    UPDATE_TEST_CASE_FAILURE,
    SET_DRAG_ENABLED,
    TOGGLE_TAG_FILTER
} from '../actions/testcase-actions';
import { blankTestCase } from '../modules/TestCase';

const blankState = {
    testCases: [blankTestCase()],
    selectedTestCase: blankTestCase(),
    loading: false,
    saving: false,
    error: null,
    tagFilters: [],
    dragEnabled: false
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
                selectedTestCase: {
                    ...state.selectedTestCase,
                    [action.payload.updateType] : action.payload.update
                }
            }
        case ADD_TEST_CASE_BEGIN:
            return {
                ...state,
                testCases: [
                    ...state.testCases.slice(0, state.testCases.length-1),
                    action.payload.testCase,
                    blankTestCase()
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
            
            // update selected test case too to ensure state updates
            return {
                ...state,
                testCases: newArray,
                selectedTestCase: action.payload.testCase,
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
        case TOGGLE_TAG_FILTER:
            // if we find the tag, remove it
            if (state.tagFilters.find(tag => tag === action.payload.tag)) {
                return {
                    ...state,
                    tagFilters: [
                        ...state.tagFilters.filter(tag => tag !== action.payload.tag)
                    ]
                }
            }
            // otherwise, add it
            else {
                return {
                    ...state,
                    tagFilters: [
                        ...state.tagFilters,
                        action.payload.tag
                    ]
                }
            }
            
        case SET_DRAG_ENABLED:
            return {
                ...state,
                dragEnabled: action.payload.dragEnabled
            }
        default:
            return state;
    }
}
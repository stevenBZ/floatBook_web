import {
    PUBLISH_BOOK_REQUEST,
    PUBLISH_BOOK_SUCCESS,
    PUBLISH_BOOK_FAILURE,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAILURE,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAILURE,
    GET_BOOKS_REQUEST,
    GET_BOOKS_SUCCESS,
    GET_BOOKS_FAILURE,
    GET_BOOK_REQUEST,
    GET_BOOK_SUCCESS,
    GET_BOOK_FAILURE,
    APPLY_BOOK_REQUEST,
    APPLY_BOOK_SUCCESS,
    APPLY_BOOK_FAILURE,
    GET_APPLIED_BOOK_REQUEST,
    GET_APPLIED_BOOK_SUCCESS,
    GET_APPLIED_BOOK_FAILURE,
    GET_APPLIER_LIST_REQUEST,
    GET_APPLIER_LIST_SUCCESS,
    GET_APPLIER_LIST_FAILURE,
    UPDATE_APPLIER_LIST_REQUEST,
    UPDATE_APPLIER_LIST_SUCCESS,
    UPDATE_APPLIER_LIST_FAILURE,
    GET_EVALUATE_REQUEST,
    GET_EVALUATE_SUCCESS,
    GET_EVALUATE_FAILURE,
    CREATE_EVALUATE_REQUEST,
    CREATE_EVALUATE_SUCCESS,
    CREATE_EVALUATE_FAILURE,
    GET_RECORD_REQUEST,
    GET_RECORD_SUCCESS,
    GET_RECORD_FAILURE
} from '../constants/bookTypes';

const initialState = {
    books: [],
    detailBook: {},
    applyList: [],
    publishedBook: []
};

export default function book(state = initialState, actions = {}) {
    const {
        type,
        result,
        error
    } = actions;
    switch (type) {
        case PUBLISH_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                books: [
                    result.book,
                    ...state.books
                ]
            };
        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                books: state.books.filter(item =>
                    item._id !== result._id
                )
            };
        case UPDATE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                books: state.books ? state.books.map(item =>
                    item._id === result.book._id ?
                    Object.assign({}, item, result.book) :
                    item
                ) : [],
                publishedBook: state.publishedBook ? state.publishedBook.map(item =>
                    item._id === result.book._id ?
                    Object.assign({}, item, result.book) :
                    item
                ) : []
            };
        case GET_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                books: result.book,
                publishedBook: result.publishedBook
            };
        case GET_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                detailBook: result.book
            };
        case GET_APPLIED_BOOK_SUCCESS:
        case GET_APPLIER_LIST_SUCCESS:
        case UPDATE_APPLIER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                applyList: result.applyList
            };
        case GET_EVALUATE_SUCCESS:
        case CREATE_EVALUATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                evaluateList: result.evaluateList
            };
        case GET_RECORD_SUCCESS:
            return {
                ...state,
                loading:false,
                error:'',
                success:result.success,
                record:result.record
            }        
        case PUBLISH_BOOK_REQUEST:
        case DELETE_BOOK_REQUEST:
        case UPDATE_BOOK_REQUEST:
        case GET_BOOKS_REQUEST:
        case GET_BOOK_REQUEST:
        case GET_APPLIED_BOOK_REQUEST:
        case GET_APPLIER_LIST_REQUEST:
        case UPDATE_APPLIER_LIST_REQUEST:
        case GET_EVALUATE_REQUEST:
        case CREATE_EVALUATE_REQUEST:
        case GET_RECORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PUBLISH_BOOK_FAILURE:
        case DELETE_BOOK_FAILURE:
        case UPDATE_BOOK_FAILURE:
        case GET_BOOKS_FAILURE:
        case GET_BOOK_FAILURE:
        case GET_APPLIED_BOOK_FAILURE:
        case GET_APPLIER_LIST_FAILURE:
        case UPDATE_APPLIER_LIST_FAILURE:
        case GET_EVALUATE_FAILURE:
        case CREATE_EVALUATE_FAILURE:
        case GET_RECORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: error,
                success: ''
            };
        default:
            return state;
    }
}

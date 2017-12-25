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
    GET_RECORD_REQUEST,
    GET_RECORD_SUCCESS,
    GET_RECORD_FAILURE
}
from '../constants/bookTypes';
import ajax from './apiAction';

// import tokenDecode from 'jwt-decode';
import {
    message
}
from 'antd';

export function publish(data, callback) {
    return {
        types: [PUBLISH_BOOK_REQUEST, PUBLISH_BOOK_SUCCESS, PUBLISH_BOOK_FAILURE],
        promise() {
            return ajax({
                url: '/books',
                method: 'POST',
                data: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                book,
                success
            } = result.data;
            message.success(success);
            return {
                book,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}

export function getBooks(data, callback) {
    return {
        types: [GET_BOOKS_REQUEST, GET_BOOKS_SUCCESS, GET_BOOKS_FAILURE],
        promise() {
            return ajax({
                url: '/books',
                method: 'GET',
                params: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                book,
                publishedBook,
                success
            } = result.data;
            return {
                book,
                publishedBook,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}

export function getBook(_id, callback) {
    return {
        types: [GET_BOOK_REQUEST, GET_BOOK_SUCCESS, GET_BOOK_FAILURE],
        promise() {
            return ajax({
                url: `/book/${_id}`,
                method: 'GET'
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                book,
                success
            } = result.data;
            return {
                book,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}

export function apply(data, callback) {

    return {
        types: [APPLY_BOOK_REQUEST, APPLY_BOOK_SUCCESS, APPLY_BOOK_FAILURE],
        promise() {
            return ajax({
                url: '/apply',
                method: 'POST',
                data: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const success = result.data.success;
            message.success(success);
            return {
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function getAppliedBooks(data, callback) {
    return {
        types: [GET_APPLIED_BOOK_REQUEST, GET_APPLIED_BOOK_SUCCESS, GET_APPLIED_BOOK_FAILURE],
        promise() {
            return ajax({
                url: '/apply',
                method: 'GET',
                params: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                applyList,
                success
            } = result.data;
            return {
                applyList,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function getApplierList(data, callback) {
    return {
        types: [GET_APPLIER_LIST_REQUEST, GET_APPLIER_LIST_SUCCESS, GET_APPLIER_LIST_FAILURE],
        promise() {
            return ajax({
                url: '/apply',
                method: 'GET',
                params: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                applyList,
                success
            } = result.data;
            return {
                applyList,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function updateApplierList(data, callback) {
    return {
        types: [UPDATE_APPLIER_LIST_REQUEST, UPDATE_APPLIER_LIST_SUCCESS, UPDATE_APPLIER_LIST_FAILURE],
        promise() {
            return ajax({
                url: '/apply',
                method: 'PUT',
                data: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                applyList,
                success
            } = result.data;
            return {
                applyList,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function deleteBook(_id, callback) {
    return {
        types: [DELETE_BOOK_REQUEST, DELETE_BOOK_SUCCESS, DELETE_BOOK_FAILURE],
        promise() {
            return ajax({
                url: `/book/${_id}`,
                method: 'DELETE'
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                _id,
                success
            } = result.data;
            return {
                _id: _id,
                success: success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function updateBook(data, callback) {
    return {
        types: [UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAILURE],
        promise() {
            return ajax({
                url: `/book/${data._id}`,
                method: 'PUT',
                data: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                book,
                success
            } = result.data;
            return {
                book,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}

export function getRecord(data, callback) {
    return {
        types: [GET_RECORD_REQUEST, GET_RECORD_SUCCESS, GET_RECORD_FAILURE],
        promise() {
            return ajax({
                url: '/record',
                method: 'GET',
                params: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                record,
                success
            } = result.data;
            return {
                record,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
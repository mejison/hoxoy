const API_URL = 'http://localhost:3000'
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

const responseHandler = (response) => {
    return new Promise((resolve) => {
        resolve(response.json());
    });
}

export default {
    getAllBoards() {
        return fetch(API_URL + '/boards')
            .then(responseHandler)
    },
    createBoard(data) {
        return fetch(API_URL + '/boards', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({name: data.value})
        })
        .then(responseHandler)
    },
    deleteBoard(hash) {
        return fetch(API_URL + '/boards/' + hash, {
            method: 'delete'
        })
        .then(responseHandler)
    },
    getAllTasks() {
        return fetch(API_URL + '/tasks')
            .then(responseHandler)
    },
    createTask(data) {
        return fetch(API_URL + '/tasks', {
            method: 'post',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },
    updateTask(hash, data) {
        return fetch(API_URL + '/tasks/' + hash, {
            method: 'put',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    }
}
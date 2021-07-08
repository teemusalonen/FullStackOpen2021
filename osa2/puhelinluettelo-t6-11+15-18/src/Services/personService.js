import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const del = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response)
}  

const replace = (person, id) => {
    const request = axios.put(`${url}/${id}`, person)
    return request.then(response => response)
}

const e = {
    getAll,
    create,
    del,
    replace
}

export default e
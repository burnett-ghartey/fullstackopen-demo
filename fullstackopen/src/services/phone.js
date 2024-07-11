import axios from "axios";

const baseUrl = 'http://localhost:3001/contacts'

const getAllPhone = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const createPhone = (newPhone) => {
    const request = axios.post(baseUrl, newPhone)
    return request.then(response => response.data)
}
const updatePhone = (id, newPhone) => {
    const request = axios.put(`${baseUrl}/${id}`, newPhone)
    return request.then(response => response.data)
}
const deletePhone = (id) => {
     const request = axios.delete(`${baseUrl}/${id}`)
     return request.then(response => {
        return request.then(response => response.data)
     })
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllPhone, createPhone, updatePhone, deletePhone }
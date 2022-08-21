import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/users/";

const api = {
    fetchAll: () => axios.get(url),
    read: (id: number) => axios.get(url + id),
    create: (newRecord: any) => axios.post(url, newRecord),
    update: (id: number, updateRecord: any) => axios.put(url + id, updateRecord),
    delete: (id: number) => axios.delete(url + id)
};

export default api;
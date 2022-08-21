import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
};

export const fetchAll = () => (dispatch: any) => {
    api.fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const read = (id: number) => (dispatch: any) => {
    api.read(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.READ,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const create = (data: any) => (dispatch: any) => {
    api.create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const update = (id: number, data: any) => (dispatch: any) => {
    api.update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            });
        })
        .catch(err => console.log(err));
};

export const Delete = (id: number) => (dispatch: any) => {
    api.delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            });
        })
        .catch(err => console.log(err));
};
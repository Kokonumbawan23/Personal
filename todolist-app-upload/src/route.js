import {addHandler, deleteHandler, getHandler} from './handler.js';

const route = [{
    method : 'POST',
    path : '/',
    handler : addHandler,
},
{
    method : 'GET',
    path : '/',
    handler : getHandler,
},
{
    method: 'DELETE',
    path: '/{id}',
    handler : deleteHandler,
}]

export default route;
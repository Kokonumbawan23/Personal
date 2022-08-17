import todolist from "./todolist.js";
import {nanoid} from 'nanoid';

const addHandler = (request, h) => {
    const {title,desc} = request.payload;

    const sameTitle = (todolist.findIndex((tdl) => tdl.title == title) >= 0);
    
    if(sameTitle){
        const response = h.response({
            status: 'fail',
            message: 'tidak boleh ada nama task yang sama',
        });

        response.code(400);
        return response;
    }
  
    const id = nanoid();
    
    const newTdl = {id,title,desc};
  
    todolist.push(newTdl);
  
    const isSuccess = todolist.filter((tdl) => tdl.id === id);
  
    if (isSuccess) {

      const response = h.response({
        status: 'success',
        message: 'Tugas berhasil ditambahkan',
        data: {
          TaskId: id,
        },
      });
  
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Tugas gagal ditambahkan',
    });
    response.code(500);
    return response;
  };

  const getHandler = (request, h) => {
    const todolistFiltered = [];
    const {title} = request.query;

    if(title !== undefined){
        const newTodoList = todolist.filter((tdl) => {
            if(tdl.title.search(new RegExp(title, 'i')) !== -1){
                return true;
            }
            return false;
        });
        
        newTodoList.forEach((tdl)=>{
            const id = tdl.id;
            const title = tdl.title;
            const desc = tdl.desc;
        
            todolistFiltered.push({id, title, desc});
          });     
    
          const response = h.response({
            status: 'success',
            data: {
              todolist: todolistFiltered,
            },
          });
          response.code(200);
            return response;
    }
  
    todolist.forEach((tdl)=>{
      const id = tdl.id;
      const title = tdl.title;
      const desc = tdl.desc;
  
      todolistFiltered.push({id, title, desc});
    });
  
    const response = h.response({
      status: 'success',
      data: {
        todolist: todolistFiltered,
      },
    });
    response.code(200);
    return response;
  };

  const deleteHandler = (request,h)=>{
    const {id} = request.params;

    const index = todolist.findIndex((tdl) => tdl.id === id);

    if(index !== -1){
    todolist.splice(index,1);

    const response = h.response({
        status : "success",
        message : "Task berhasil dihapus",
    });

    response.code(200);
    return response;
    }
    const response = h.response({
        'status': 'fail',
        'message': 'Task gagal dihapus. Id tidak ditemukan',
      });
    
      response.code(404);
      return response;
  }

  export {addHandler, getHandler, deleteHandler};
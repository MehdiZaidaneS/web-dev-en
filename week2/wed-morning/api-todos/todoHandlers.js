const todosLib = require("./todoLib")


function getAllTodos(req,res){
    const todos = todosLib.getAll()
    return res.json(todos)
}

function createTodo(req,res){

    const {task, completed, dueDate} = req.body
    const newTodo = todosLib.addOne(task, completed, dueDate)

    if (newTodo){
        res.json(newTodo)
    }else{
        res.status(500).json({message: "Error creating todo"})
    }
}

function getTodoById(req,res){
    const todoId = req.params.todoId

    const todo = todosLib.findById(todoId)

    if(todo){
        res.json(todo)
    }else{
        res.status(404).json({message: "Couldnt find the ID"})
    }
}

function updateTodo(req,res){
    const todoId = req.params.todoId
    const {task, completed, dueDate} = req.body
    
    const updatedTodo = todosLib.updateOneById(todoId, {task, completed, dueDate})

    if(updatedTodo){
          res.json(updatedTodo)
    }else{
        res.status.json({message: "Couldnt update the todo"})
    }
}

function deleteTodo(req,res){
      const todoId = req.params.todoId
      const isDeleted = todosLib.deleteOneById(todoId)

      if(isDeleted){
        res.status(200).json({message: "Deleted successfully"})
      }else{
        res.status(404).json({message: "Error deleting!"})
      }
}


module.exports = {
    getAllTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}

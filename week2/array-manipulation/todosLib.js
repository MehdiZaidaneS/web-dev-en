let todos = []
let nextId = 1
//comment


function addOne(task, dueDate){

    if(!task ||!dueDate){
        return false
    }
    const newToDo = {
        id: nextId++,
        task,
        completed: false,
        dueDate
    }
    todos.push(newToDo)
    return newToDo
}

function getAll(){
    return todos
}


function findById(id){
    const numericId = Number(id)
    
    const todo = todos.find(item => item.id === numericId)

    return todo || false

}


function updateOneById(id, updatedData){
    
    const todo = findById(id)

    if(todo){
       if(updatedData.task) todo.task = updatedData.task
       if(updatedData.completed) todo.completed = updatedData.completed
       if(updatedData.dueDate) todo.dueDate = updatedData.dueDate

       return todo
    }
    
    return false
}


function deleteOneById(id){
    const todo = findById(id)
    if(todo){
        todos = todos.filter(todo => todo.id !== Number(id))
        return todos
    }
    return false
}


if (require.main === module) {
    console.log(addOne("Eat banana", "2025-08-30"))
    console.log(getAll())
    console.log(findById(1))
    console.log(updateOneById(1, {completed: true, dueDate: "2025-08-31"}))
    console.log(deleteOneById(1))
}


const ToDos = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
};

module.exports = ToDos;
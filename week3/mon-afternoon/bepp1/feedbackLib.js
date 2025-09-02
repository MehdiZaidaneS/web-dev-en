let feedbacks = []
let index = 1


function getAll(){
     return feedbacks
}


function createFeedback(sender, message, rating){
     
    const newFeedback ={
        id: index++,
        sender,
        message,
        rating
    }

    feedbacks.push(newFeedback)
    return newFeedback
}



function findById(id){
    
     const numericId = Number(id)
     const feedback = feedbacks.find(feedback => feedback.id === numericId)

     return feedback
}


function updateFeedback(id, updatedData){
    const feedback = findById(id)
     
    if(feedback){
        if(updatedData.sender){
            feedback.sender = updatedData.sender
        }
        if(updatedData.message){
            feedback.message = updatedData.message
        }
        if(updatedData.rating){
            feedback.rating = updatedData.rating
        }
        return feedback
    }

    return false
}


function deleteFeedback(id){

    const feedback = findById(id)

    if(feedback){
        feedbacks = feedbacks.filter(feedback=> feedback.id !== Number(id))
        return true
    }

    return false

}




if (require.main === module) {
 let result = addOne("John Smith", "message", "Great session on React components! I found the examples very helpful.", 4);
 console.log(result);
 console.log("getAll called:", getAll());
 console.log("findById called:", findById(1));
 // rest of the tests here
}


module.exports={
    getAll,
    createFeedback,
    findById,
    updateFeedback,
    deleteFeedback
}
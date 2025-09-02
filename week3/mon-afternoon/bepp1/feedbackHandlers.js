const Feedback = require("./feedbackLib");

const getAllFeedbacks = (req, res) => {
    const feedbacks = Feedback.getAll()
    res.json(feedbacks)
};

const createFeedback = (req, res) => {
    const {sender, message, rating} = req.body

    const newFeedback = Feedback.createFeedback(sender, message, rating)

    if(newFeedback){
        res.json(newFeedback)
    }else{
        res.status(500).json({message: "Error creating new feedback"})
    }
};

const getFeedbackById = (req, res) => {
    const id = req.params.feedbackId

    const feedback = Feedback.findById(id)

    if(feedback){
        res.json(feedback)
    }else{
        res.status(404).json({message: "Error finding feedback by id"})
    }
};

const updateFeedback = (req, res) => {
    const id = req.params.feedbackId 
    const {sender, message, rating} = req.body

    const updatedFeedback = Feedback.updateFeedback(id, {sender, message, rating})

    if(updatedFeedback){
        res.json(updatedFeedback)
    }else{
        res.status(404).json({message: "Error updating feedback by id"})
    }
};


const deleteFeedback = (req, res) => {
    const id = req.params.feedbackId
    
    const deletedFeedback = Feedback.deleteFeedback(id)

    if(deleteFeedback){
         res.status(200).json({message: "Successfully deleted"})
    }else{
         res.status(404).json({message: "Error deleting by id"})
    }

};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
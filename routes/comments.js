const express = require("express");
const router = express.Router();
const error = require("../utilities/error");

let comments = []; // Array to store comments

// GET /comments - Retrieves all comments
router.get("/", (req, res) => {
    res.json(comments);
});

// POST /comments - Creates a new comment
router.post("/", (req, res, next) => {
    if (req.body.userId && req.body.postId && req.body.body) {
        const newComment = {
            id: comments.length + 1, // Simple ID generation
            userId: req.body.userId,
            postId: req.body.postId,
            body: req.body.body
        };

        comments.push(newComment);
        res.status(201).json(newComment);
    } else {
        next(error(400, "Missing required comment fields"));
    }
});

// GET /comments/:id - Retrieves a comment by id
router.get("/:id", (req, res, next) => {
    const comment = comments.find(c => c.id == req.params.id);
    if (comment) {
        res.json(comment);
    } else {
        next(error(404, "Comment not found"));
    }
});
/*
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const newBody = req.body.newBody;
    // Add logic to find the comment by ID and update its body
    // Respond with success or error message
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    // Add logic to find the comment by ID and delete it
    // Respond with success or error message
});
*/

module.exports = router;
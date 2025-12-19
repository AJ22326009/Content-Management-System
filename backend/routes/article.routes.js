const express = require('express');
const router = express.Router();
const {
    getAllArticles, 
    deleteArticle, 
    viewArticle, 
    createArticle, 
    editArticle, 
    publishArticle
} = require('../controllers/article.controller');

const authorize = require('../middleware/authorize');

// Create a new article
router.post('/',
    authorize('create_article'),
    createArticle
)

//get all with viewer rules inside controller
router.get('/',
    authorize('view_articles'),
    getAllArticles
);

//get one article
router.get('/:id',
    authorize('view_articles'),
    viewArticle
);

//edit an article
router.put('/:id',
    authorize('edit_article'),
    editArticle
);

//delete an article
router.delete('/:id',
    authorize('delete_article'),
    deleteArticle
);

//publish an article
router.put('/:id/publish',
    authorize('publish_article'),
    publishArticle
);


module.exports = router;
//article.controller.js
const Article= require('../models/Article');

// Create a new article
const createArticle= async (req, res) => {
    try {
        const {title, body, imageUrl}=req.body;
        const article= new Article({
            title, 
            body, 
            imageUrl,
            author: req.user.userId
        });

        await article.save();
        res.status(201).json({message:'article created successfully', article});
    } catch (error) {
        res.status(400).json({message:'error creating article', error:error.message});
    }
}

//edit an article
const editArticle= async (req, res) => {
    try {
        const articleId=req.params.id;
        const updatedData=req.body;
        const article= await Article.findByIdAndUpdate(articleId, updatedData, {new:true});
        if(!article){
            return res.status(404).json({message:'article not found'});
        }
        res.status(200).json({message:'article updated successfully', article});
    } catch (error) {
        res.status(400).json({message:'error editing article', error:error.message});
    }
}

//delete an article
const deleteArticle= async (req, res) => {
    try{
        const articleId=req.params.id;
        const article= await Article.findByIdAndDelete(articleId);
        if(!article){
            return res.status(404).json({message:'article not found'});
        }
        res.status(200).json({message:'article deleted successfully'});
    }catch(error){
        res.status(400).json({message:'error deleting article', error:error.message});
    }
};

//get all articles
const getAllArticles= async (req, res) => {
    try {
        const filter=req.user.role.name==='Viewer'
        ? {isPublished:true}
        : {};

        const articles= await Article.find(filter).populate('author', 'fullname email');

        res.status(200).json({articles});
    }catch (error) {
        res.status(400).json({message:'error fetching articles', error:error.message});
    }
};

//publish an article
const publishArticle= async (req, res) => {
    try {
        const articleId=req.params.id;
        const article= await Article.findByIdAndUpdate(articleId, {isPublished:true}, {new:true});
        if(!article){
            return res.status(404).json({message:'article not found'});
        }
        res.status(200).json({message:'article published successfully', article});
    } catch (error) {
        res.status(400).json({message:'error publishing article', error:error.message});
    }
};

//view an article
const viewArticle= async (req, res) => {
    try {
        const articleId=req.params.id;
        const article= await Article.findById(articleId);

        if(!article){
            return res.status(404).json({message:'article not found'});
        }

        if(req.user.role.name==='Viewer' && !article.isPublished){
            return res.status(403).json({message:'not authorized to view this article'});
        }
        
        res.status(200).json({article});
    } catch (error) {
        res.status(400).json({message:'error fetching article', error:error.message});
    }
};

module.exports={
    createArticle,
    editArticle,
    deleteArticle,
    getAllArticles,
    publishArticle,
    viewArticle
};
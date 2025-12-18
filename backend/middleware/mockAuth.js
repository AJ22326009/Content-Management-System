const mongoose = require('mongoose');

const mockAuth = (req, res, next) => {
    req.user={
        id: '12345',
        fullname: 'Algasim Jallow',
        email: 'algasim@utg.gm',
        role: {
            _id: new mongoose.Types.ObjectId(),
            name: 'Manager',
            permissions:[
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'create_article'
            },
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'edit_article'
            },
             {
                _id: new mongoose.Types.ObjectId(),
                name: 'view_article'
            },
             {
                _id: new mongoose.Types.ObjectId(),
                name: 'delete_article'
            },
             {
                _id: new mongoose.Types.ObjectId(),
                name: 'publish_article'
            },
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'view_roles'
            },
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'edit_role_permissions'
            },
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'view_permissions'
            }
        ]
        }
        
}
next();
}

module.exports=mockAuth;
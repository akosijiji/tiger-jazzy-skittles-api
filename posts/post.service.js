const db = require('_helpers/db');
const Post = db.Post;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Post.find();
    // return await Post.aggregate([ 
        // {$unwind: "$users"},
    //     { 
    //         "$lookup" : {
    //         "from" : "users",
    //         "localField" : "users._id", 
    //         "foreignField" : "authorId",
    //         "as" : "author"
    //       }
    //     },
    //   ]);
    // return await Post.aggregate([ 
    //     {
    //         $lookup: {
    //            from: "users",
    //            localField: "authorId",    // field in the posts collection
    //            foreignField: "_id",  // field in the users collection
    //            as: "fromItems"
    //         }
    //     },
    //     {
    //         $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
    //     },
    //     { $project: { fromItems: 0 } }
    // ]);
}

async function getById(id) {
    return await Post.findById(id);
}

async function create(postParam) {
    const post = new Post(postParam);
    // save Post
    await post.save();
}

async function update(id, postParam) {
    const post = await Post.findById(id);

    // validate
    if (!post) throw 'Post not found';

    // copy postParam properties to Post
    Object.assign(post, postParam);

    await post.save();
}

async function _delete(id) {
    await Post.findByIdAndRemove(id);
}
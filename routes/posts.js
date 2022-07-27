const express = require("express");
const Posts = require("../schemas/post");

const router = express.Router();


//전체목록조회
router.get("/posts", async (req, res) => {
    const posts = await Posts.find();
    res.json({
        data: posts.map((inquire) => ({
            postId: inquire._id,
            user: inquire.user,
            title: inquire.title,
            createdAt: inquire.createdAt
        })).reverse(),//내림차순
    });
});
//상세조회
router.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params;//뒤의 주소를담는다

    const [detail] = await Posts.find({ _id: postId })


    res.json({
        data: {
            postId: detail._id,
            user: detail.user,
            title: detail.title,
            content: detail.content,
            createdAt: detail.createdAt
        }
    });
});
//작성
router.post("/posts", async (req, res) => {

    const { postId, user, password, title, content } = req.body;

    // const posts = await Posts.find({ postId })
    // if(posts.length){
    //     return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다."});
    // } 
    const createdPosts = await Posts.create({ postId, user, password, title, content, createdAt: new Date()});

    res.json({ message: "게시글을 생성했습니다." });
});
//수정
router.put("/posts/:postId", async(req, res)=>{
    const { postId } = req.params;
    const { password, title, content } = req.body;
  
  
    const fixPost = await Posts.find({ _id : postId });
    
    if(fixPost.length){
      
      await Posts.updateOne({_id : postId} , {$set:{ password,title,content }});
    }
    res.json({ message : "게시글을 수정했습니다." });
  });

//삭제
router.delete("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const deletePost = await Posts.find({ _id : postId });
    
    if(deletePost.length){
      
        await Posts.deleteOne({_id : postId});
      }
    res.json({ message: "게시글을 삭제했습니다." });
    });

module.exports = router;
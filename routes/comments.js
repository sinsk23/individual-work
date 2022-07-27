const express = require("express");
const Comments = require("../schemas/comment");

const router = express.Router();

//댓글목록조회
router.get("/comments", async(req,res)=>{
    const comments = await Comments.find();
    res.json({
        data: comments.map((inquire) => ({
            commentId: inquire._id,
            user: inquire.user,
            content: inquire.content,
            createdAt: inquire.createdAt
        })).reverse(),
    });
});


//작성
router.post("/comments", async (req, res) => {

    const { commentId, user, password, content } = req.body;

    const createdcomments = await Comments.create({ commentId, user, password, content, createdAt: new Date()});

    res.json({ message: "댓글을 생성했습니다." });
});
//수정
router.put("/comments/:commentId", async(req, res)=>{
    const { commentId } = req.params;
    const { password, user, content } = req.body;
  
  
    const fixComment = await Comments.find({ _id : commentId });
    
    if(fixComment.length){
      
      await Comments.updateOne({_id : commentId} , {$set:{ password,user,content }});
    }
    res.json({ message : "수정된 댓글입니다." });
  });

//삭제
router.delete("/comments/:commentId", async (req, res) => {
    const { commentId } = req.params;
    const deleteComment = await Comments.find({ _id : commentId });
    
    if(deleteComment.length){
      
        await Comments.deleteOne({_id : commentId});
      }
    res.json({ message: "댓글을 삭제했습니다." });
    });
module.exports = router;
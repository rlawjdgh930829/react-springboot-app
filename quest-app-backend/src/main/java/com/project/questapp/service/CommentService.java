package com.project.questapp.service;

import com.project.questapp.entities.Comment;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repositorys.CommentRepository;
import com.project.questapp.requests.CommentCreateRequest;
import com.project.questapp.requests.CommentUpdateRequest;

import java.util.List;
import java.util.Optional;

public class CommentService {

    private CommentRepository commentRepository;
    private UserService userService;
    private PostService postService;

    public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<Comment> getAllCommentWithParam(Optional<Long> userId, Optional<Long> postId) {
        if(userId.isPresent() && postId.isPresent()) {
            return commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else if(userId.isPresent()) {
            return commentRepository.findByUserId(userId.get());
        } else if(postId.isPresent()) {
            return commentRepository.findByPostId(postId.get());
        } else {
            return commentRepository.findAll();
        }
    }

    public Comment getOneComment(Long commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }

    public Comment createComment(CommentCreateRequest commentRequest) {
        User user = userService.getOneUser(commentRequest.getUserId());
        Post post = postService.getOnePost(commentRequest.getPostId());
        if(user != null && post != null) {
            Comment toSave = new Comment();
            toSave.setId(commentRequest.getId());
            toSave.setPost(post);
            toSave.setUser(user);
            toSave.setText(commentRequest.getText());
            return commentRepository.save(toSave);
        }
        return null;
    }

    public Comment updateOenComment(Long commentId, CommentUpdateRequest commentRequest) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isPresent()) {
            Comment toUpdate = comment.get();
            toUpdate.setText(commentRequest.getText());
            return commentRepository.save(toUpdate);
        } else {
            return null;
        }
    }

    public void deleteOneComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}

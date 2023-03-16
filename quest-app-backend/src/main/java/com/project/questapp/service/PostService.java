package com.project.questapp.service;

import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repositorys.PostRepository;
import com.project.questapp.requests.PostCreateRequest;
import com.project.questapp.requests.PostUpdateRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private PostRepository postRepository;
    private UserService userService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public List<Post> getAllPost(Optional<Long> userId) {
        if(userId.isPresent()) {
            return postRepository.findByUserId(userId.get());
        }
        return postRepository.findAll();
    }

    public Post getOnePost(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public Post createPost(PostCreateRequest postRequest) {
        User user = userService.getOneUser(postRequest.getUserId());
        if(user == null) return null;
        Post toSave = new Post();
        toSave.setId(postRequest.getId());
        toSave.setText(postRequest.getText());
        toSave.setTitle(postRequest.getTitle());
        toSave.setUser(user);
        return postRepository.save(toSave);
    }

    public Post updateOnePost(Long postId, PostUpdateRequest postRequest) {
        Optional<Post> post = postRepository.findById(postId);
        if(post.isPresent()) {
            Post toUpdate = post.get();
            toUpdate.setTitle(postRequest.getTitle());
            toUpdate.setText(postRequest.getText());
            postRepository.save(toUpdate);
            return toUpdate;
        }
        return null;
    }

    public void deleteOnePost(Long postId) {
        postRepository.deleteById(postId);
    }
}

package com.project.questapp.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "p_like")
@Data
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Long postId;

    Long userId;
}

package com.project.questapp.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "comment")
@Data
public class Comment {
    @Id
    Long id;
    Long userId;
    @Lob
    @Column(columnDefinition = "text")
    String text;
}

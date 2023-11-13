package com.poly.models;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = " Categories")
@Data

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryid")
    private int categoryId;

    @Column(name = "categoryname")
    private String categoryName;

    @Column(name = "imageurl")
    private String imageUrl;

    @Column(name = "description")
    private String description;
    @Override
public String toString() {
    return "Category Name: " + categoryName; // Thay thế tên biến nếu cần
}
}

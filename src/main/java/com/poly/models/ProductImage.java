package com.poly.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "productimages")
@Data

public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imageid")
    private int imageId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productid")
    private Product product;

    @Column(name = "imageurl")
    private String imageUrl;
    @Override
    public String toString() {
        return "imageId imageId: " + imageId; // Thay thế tên biến nếu cần
    }
}

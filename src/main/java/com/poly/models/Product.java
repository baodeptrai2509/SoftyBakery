package com.poly.models;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "Products")
@Data
public class Product implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productid")
    private int productId;

    @Column(name = "productname")
    private String productName;

    @Column(name = "price")
    private double price;

    @Column(name = "quantityinstorage")
    private int quantityInStorage;

    @Column(name = "subdescription")
    private String subDescription;

    @Column(name = "description")
    private String description;

    @Column(name = "storageinstruction")
    private String storageInstruction;

    @Column(name = "ingredient")
    private String ingredient;

    @ManyToOne
    @JoinColumn(name = "categoryid")
    private Category category;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    private List<SpecialOption> specialOptions;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    private List<ProductImage> productImages;
    
    @Column(name = "isavailable")
    private boolean isAvailable;

}

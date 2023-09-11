package com.poly.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.poly.model.Category;
import com.poly.model.Product;

public interface CategoryDAO extends JpaRepository<Category, Integer> {
    @Query("SELECT p FROM Category p where p.categoryId = ?1")
    Category findById2(int productId);
}


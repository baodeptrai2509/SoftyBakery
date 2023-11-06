package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.models.OrderItem;

@Repository
public interface OrderItemDAO extends JpaRepository<OrderItem, Integer> {
    
}

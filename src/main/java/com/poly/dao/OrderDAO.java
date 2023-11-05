package com.poly.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.poly.entities.Order;

public interface OrderDAO extends JpaRepository<Order, Integer> {
	@Query("SELECT o.orderId FROM Order o ORDER BY o.orderId DESC LIMIT 1")
    Integer findTopOrderId();
	
	@Query("SELECT o.orderId FROM Order o ORDER BY o.orderId DESC LIMIT 1")
    Integer getAccountIdByOrderId();
	
	@Override
	@Query("SELECT o FROM Order o ORDER BY o.orderDate DESC")
	List<Order> findAll();

	@Query("SELECT o FROM Order o WHERE account.accountId = ?1")
	List<Order> findOrderByAccountId(int accountId);
}
  
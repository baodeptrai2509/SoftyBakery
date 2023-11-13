package com.poly.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderid")
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;

    @Column(name = "message")
    private String message;

    @Column(name = "orderdate")
    private Date orderDate;

    @ManyToOne
    @JoinColumn(name = "discount")
    private Discount discount;

    @Column(name = "address")
    private String address;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
    private List<OrderItem> orderItems;
}

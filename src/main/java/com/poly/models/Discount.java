package com.poly.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "discounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discountid")
    private int discountId;

    @Column(name = "percentage")
    private int percentage;

    @Column(name = "amount")
    private double amount;

    @Column(name = "startdate")
    private Date startDate;

    @Column(name = "enddate")
    private Date endDate;
}

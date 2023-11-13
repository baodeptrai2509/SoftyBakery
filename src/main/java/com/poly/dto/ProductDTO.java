package com.poly.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.poly.models.Product;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductDTO implements Serializable{
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Product product;
	private int quantity = 1;

	
}

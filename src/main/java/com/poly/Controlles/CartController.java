package com.poly.Controlles;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.poly.dao.ProductDAO;
import com.poly.entities.ProductDTO;
import com.poly.services.CartService;

@Controller
public class CartController {

	@Autowired
	CartService cart;
	@Autowired
	ProductDAO pDAO;
	
	@GetMapping("/cart")
	public String cart(Model model) {
		System.out.println("----------------------------------------------------------------");
		cart.toString1();
		System.out.println("----------------------------------------------------------------");
		
		return "cart";
	}
}

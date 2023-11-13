package com.poly.controllers;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.dao.AccountDAO;
import com.poly.dao.OrderDAO;
import com.poly.dao.OrderItemDAO;
import com.poly.dto.*;
import com.poly.models.Account;
import com.poly.models.Order;
import com.poly.models.OrderItem;
import com.poly.services.*;


@Controller
public class OrderController {
	@Autowired
    CartService cart;
    @Autowired
    AccountDAO aDAO;
    @Autowired
    OrderDAO oDAO;
    @Autowired
    OrderItemDAO oiDAO;
	@Autowired
	AccountService accountService;

	ObjectMapper objectMapper = new ObjectMapper();
	@GetMapping("/order")
    public String index(Model model) throws IOException {
		Account acc = accountService.getAccountAuth();
		for(ProductDTO p : cart.getItems().values()) {
			System.out.println(p.toString());
		}
		model.addAttribute("user", acc);
		System.out.println(objectMapper.writeValueAsString(acc));
		model.addAttribute("cart", cart.getItems().values());
		
		model.addAttribute("amount", cart.getAmount());
        return "order";
    }
	@PostMapping("/order")
	public String payment1(Model model, @ModelAttribute("user") Account user) {
		LocalDateTime localDateTime = LocalDateTime.now();
		ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
		ZonedDateTime date = localDateTime.atZone(zoneId);
	     Order o = new Order();
	    //  o.setOrderDate(date.to);
	     o.setAccount(user);
	     o.setAddress(user.getAddressDetail()+" ,"+user.getAddress());
	    //  o.setTotalAmount(cart.getAmount());
	     o.setStatus("Đang chờ");
	     oDAO.save(o);

	     for (ProductDTO d : cart.getItems().values()) {
	         OrderItem oi = new OrderItem();
	         oi.setOrder(o);
	         oi.setProduct(d.getProduct());
	         oi.setPrice(d.getProduct().getPrice());
	         oi.setQuantity(d.getQuantity());
	         oi.toString();
	         oiDAO.save(oi);
	     } 
	    
	    model.addAttribute("o", o);
	    model.addAttribute("user", user);
	    
		
	    return "order-success";
	}
    @GetMapping("/user/purchase")
    public String user_purchase(Model model) {
        model.addAttribute("user", accountService.getAccountAuth());
        model.addAttribute("orderList", oDAO.findOrderByUsername(accountService.getAccountAuth().getUsername()));
        return "order-history";
    }
}

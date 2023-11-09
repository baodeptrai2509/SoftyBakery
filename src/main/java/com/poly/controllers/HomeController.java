


package com.poly.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.AccountDAO;
import com.poly.dao.CategoryDAO;
import com.poly.dao.ProductDAO;
import com.poly.services.AccountService;


@Controller
public class HomeController {
	@Autowired ProductDAO pDAO;
	@Autowired AccountDAO aDAO;
	@Autowired CategoryDAO cDAO;
    @Autowired AccountService accountService;
    @RequestMapping("/")
    public String index2() {
        return "redirect:/home";
    }
    @RequestMapping("/home")
    public String index(Model model) {
    	
    	model.addAttribute("c", cDAO.findAll());
    	model.addAttribute("count", pDAO.count());
    	model.addAttribute("p", pDAO.findAll());
    	printUserInfo();
        return "home";
    } 
    public void printUserInfo() {
        System.out.println(accountService.getAccountAuth()!=null?"Login successfully!":"No authentication!");
    }
    
    @GetMapping("/about")
	public String about() {
		return "about";
	}

	@GetMapping("/service")
	public String service() {
		return "service";
	}
	@GetMapping("/contact")
	public String contact() {
		return "contact";
	}
	@GetMapping("/error")
    public String error() {
        return "404";
    }
}


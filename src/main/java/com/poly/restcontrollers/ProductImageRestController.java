package com.poly.restcontrollers;







import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poly.dao.*;
import com.poly.models.Product;
import com.poly.models.ProductImage;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/rest/pi")
public class ProductImageRestController {
	@Autowired ProductDAO pDAO;
	@Autowired CategoryDAO cDAO;
	@Autowired OrderItemDAO oiDAO;
	@Autowired ProductImageDAO piDAO;
	
	@GetMapping("/{id}")
	public ResponseEntity<List <ProductImage>> oe(@PathVariable("id") int id) {
		List<ProductImage> piList = piDAO.findByProductId(id);
		return ResponseEntity.ok(piList);
	}	
}

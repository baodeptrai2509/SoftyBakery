(function ($) {
	"use strict";

	// Spinner
	var spinner = function () {
		setTimeout(function () {
			if ($('#spinner').length > 0) {
				$('#spinner').removeClass('show');
			}
		}, 1);
	};
	spinner();


	// Initiate the wowjs
	new WOW().init();


	// Fixed Navbar
	$('.fixed-top').css('top', $('.top-bar').height());
	$(window).scroll(function () {
		if ($(this).scrollTop()) {
			$('.fixed-top').addClass('bg-dark').css('top', 0);
		} else {
			$('.fixed-top').removeClass('bg-dark').css('top', $('.top-bar').height());
		}
	});


	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});


	// Header carousel
	$(".header-carousel").owlCarousel({
		autoplay: false,
		smartSpeed: 1500,
		loop: true,
		nav: true,
		dots: false,
		items: 1,
		navText: [
			'<i class="bi bi-chevron-left"></i>',
			'<i class="bi bi-chevron-right"></i>'
		]
	});


	// Facts counter
	$('[data-toggle="counter-up"]').counterUp({
		delay: 10,
		time: 2000
	});


	// Testimonials carousel
	$(".testimonial-carousel").owlCarousel({
		autoplay: false,
		smartSpeed: 1000,
		margin: 25,
		loop: true,
		center: true,
		dots: false,
		nav: true,
		navText: [
			'<i class="bi bi-chevron-left"></i>',
			'<i class="bi bi-chevron-right"></i>'
		],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			}
		}
	});


})(jQuery);
var app = angular.module('app', ['ngRoute']);

let host = "http://localhost:8080/rest";

app.filter('vndCurrency', function () {
	return function (input) {
		if (!input) return '';
		return input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
	};
});
app.filter('dateFilter', function ($filter) {
	return function (input) {
		if (input) {
			var date = new Date(input);
			var formattedDate = $filter('date')(date, 'dd-MM-yyyy');
			var formattedTime = $filter('date')(date, 'HH:mm');
			return formattedTime + ' ' + formattedDate;
		}
		return '';
	};
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
app.controller('ProductController', function ($scope, $http, $filter, $location, $routeParams) {
	// product
	$scope.listAllProducts = [];
	$scope.filteredProducts = [];
	$scope.filterByCategory = [];
	$scope.filteredAndPagingProduct = [];

	$scope.totalPage = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = 0;
	$scope.category = 0;

	$scope.selectedProductId = 0;
	// category
	$scope.searchCategory = 0;
	$scope.searchKey = "";
	$scope.searchSort = "asc";

	//cart
	$scope.cart = [];
	$scope.cartLength = 0;
	$scope.amountCart = 0;

	$scope.imageClick = "";
	$scope.productImages = [];

	$scope.reviewList = [];
	$scope.formReview = {};
	$scope.rating = 0;
	$scope.stars = new Array(5);
	$scope.isHovered = new Array(5).fill(false);

	$scope.userInfo = {};


	$scope.categoryList = [];
	function loadAllProducts() {
		var url = `${host}/product`;
		return $http.get(url).then(response => {
			$scope.listAllProducts = response.data;
			$scope.itemsPerPage = 4;
			$scope.totalPage = Math.ceil(response.data.length / $scope.itemsPerPage);
		});
	}
	function loadCategory() {
		return $http.get(`${host}/category`).then(function (resp) {
			$scope.category = resp.data;
		});
	}
	$scope.loadPage = function (currentPage) {
		$scope.filteredProducts = $scope.listAllProducts;
		if ($scope.searchCategory != 0) {
			$scope.filterByCategory($scope.searchCategory);
		}
		if ($scope.searchKey != "") {
			$scope.filterByKey($scope.searchKey);
		}
		$scope.currentPage = currentPage;
		var begin = (currentPage - 1) * $scope.itemsPerPage;
		$scope.filteredAndPagingProduct = $scope.filteredProducts.slice(begin, begin + $scope.itemsPerPage);
		$scope.totalPage = Math.ceil($scope.filteredProducts.length / $scope.itemsPerPage);
	};

	$scope.filterByKey = function (key) {
		var filteredProducts = $scope.listAllProducts.filter(function (product) {
			return product.product.productName.toLowerCase().includes(key.toLowerCase());
		});

		$scope.totalPage = Math.ceil(filteredProducts.length / $scope.itemsPerPage);

		if (filteredProducts.length > 0) {
			$scope.filteredProducts = filteredProducts;
		}
	};



	$scope.filterByCategory = function (categoryId) {
		$scope.currentPage = 1;
		$scope.filteredProducts = $filter('filter')($scope.listAllProducts, function (product) {
			return product.product.category.categoryId === categoryId;
		});
		$scope.totalPage = Math.ceil($scope.filteredProducts.length / $scope.itemsPerPage);
	};
	$scope.setSearchCategory = function (categoryId) {
		$scope.searchCategory = categoryId;
		$scope.loadPage(1);
	}
	$scope.setSearchKey = function (key) {
		$scope.searchKey = key;
		$scope.loadPage(1);
	}
	$scope.reset = function () {
		$scope.searchCategory = 0;
		$scope.searchKey = "";
		$scope.loadPage(1);
	}



	// pagination and filters - pagination and filters - pagination and filters - pagination and filters - pagination and filters
	$scope.disablePrev = function () {
		return $scope.currentPage === 1;
	};

	$scope.disableNext = function () {
		return $scope.currentPage === $scope.totalPage;
	};
	// product images - product images - product images - product images - product images - product images - product images
	$scope.loadAllProductImages = function () {
		$scope.getprdId().then(function (productId) {
			$scope.selectedProductId = productId;
			var url = `${host}/pi/`;
			url += productId;
			$http.get(url).then(resp => {
				$scope.productImages = resp.data;
				console.log(resp.data)
			})
			$scope.loadReviews();
		})
	}
	$scope.setImgData = function (data) {
		var src = data.target.src;
		$scope.imageClick = src;
	}
	// product images - product images - product images - product images - product images - product images - product images 

	// review - review - review - review - review - review - review - review - review - review - review - review - review

	$scope.loadReviews = function () {
		var pathUrl = $location.absUrl().substring(21);
		if (pathUrl.startsWith('/product/detail/')) {
			var productId = pathUrl.split('/').pop();
			$http.get(`${host}/review/${productId}`).then(resp => {
				$scope.reviewList = resp.data;
			});
		}
	};


	function getUser() {
		var url = `${host}/user`;
		$http.get(url).then(resp => {
			$scope.userInfo.accountId = resp.data.accountId;
			$scope.userInfo.username = resp.data.username;
			$scope.userInfo.password = resp.data.password;
			$scope.userInfo.email = resp.data.email;
			$scope.userInfo.fullName = resp.data.fullName;
			$scope.userInfo.address = resp.data.address;
			$scope.userInfo.addressDetail = resp.data.addressDetail;
			$scope.userInfo.phoneNumber = resp.data.phoneNumber;
			$scope.userInfo.photo = resp.data.photo;
			$scope.userInfo.admin = resp.data.admin;
		})
	}
	$scope.postReview = function () {
		$scope.formReview.rating = $scope.rating;
		const url = `${host}/review/${$scope.selectedProductId}`;
		$http.post(url, $scope.formReview, {
			headers: { 'Content-Type': 'application/json' }
		}).then(function (response) {
			$scope.reviewList += response.data;
			$scope.loadReviews();
		});

	}

	$scope.setHovered = function (index, hovered) {
		for (var i = 0; i <= index; i++) {
			$scope.isHovered[i] = hovered;
		}
	};
	$scope.setRating = function (rating) {
		$scope.rating = rating;
	};

	$scope.setSelectedProductId = function () {
		var fullUrl = $location.absUrl();
		var lastSegment = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);
		$scope.selectedProductId = lastSegment
	}
	// review - review - review - review - review - review - review - review - review - review - review - review - review
	// cart - cart - cart - cart - cart - cart - cart - cart - cart - cart - cart - cart - cart - cart
	function updateCartLocalStorage() {
		localStorage.setItem('cart', JSON.stringify($scope.cart));
	}

	$scope.loadAllCart = function () {
		$http.get(`${host}/cart`).then(function (resp) {
			$scope.cart = resp.data;
			$scope.cartLength = resp.data.length;
			updateCartLocalStorage();
		});
	} 

	$scope.modifyCart = function (id, method) {
		$http.get(`${host}/cart/${method}/${id}`).then(function () {
			
			$scope.loadAllCart();
		});
	};
	// tính thành tiền các giỏ hàng
	

	$scope.deleteCart = function (id) {
		$http.get(`${host}/cart/delete/${id}`).then(function () {
			$scope.loadAllCart();
		});
	};

	$scope.clearCart = function () {
		$http.get(`${host}/cart/clear`).then(function () {
			$scope.loadAllCart();
		});
	};

	$scope.getAmountCart = function () {
		console.log($scope.cart);
		var overallResult = 200;
		for (var i = 0; i < $scope.cart.length; i++) {
			overallResult += total + product.price * quantity
		}
		$scope.amountCart = overallResult;
	};


	function initCartFromLocalStorage() {
		$scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
	}
	// cart - cart - cart - cart - cart - cart - cart - cart - cart - cart - cart - cart - cart - cart


	// Khởi tạo dữ liệu ban đầu
	loadAllProducts().then(function () {
		$scope.loadPage(1);
	});
	loadCategory();

	$scope.loadAllCart();
	// initCartFromLocalStorage();

	getUser();
	$scope.setSelectedProductId();
	$scope.loadReviews();
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
app.controller('OrderController', function ($scope, $http) {
	$scope.products = [];
	$scope.category = [];
	$scope.form = {};
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
app.controller('UserController', function ($scope, $http) {
	$scope.userInfo = {};
	$scope.form = {};

	$scope.cities = [];
	$scope.districts = [];
	$scope.wards = [];

	$scope.city = null;
	$scope.district = null;
	$scope.ward = null;


	const url = `${host}/address/`;
	const urlUser = `${host}/user`;

	function getUser() {
		var url = `${host}/user`;
		$http.get(url).then(resp => {
			if (resp.data != null) {
				$scope.userInfo = resp.data;
				$scope.form.accountId = $scope.userInfo.accountId;
				$scope.form.username = $scope.userInfo.username;
				$scope.form.password = $scope.userInfo.password;
				$scope.form.email = $scope.userInfo.email;
				$scope.form.fullName = resp.data.fullName;
				$scope.form.address = $scope.userInfo.address;
				$scope.form.addressDetail = $scope.userInfo.addressDetail;
				$scope.form.phoneNumber = $scope.userInfo.phoneNumber;
				$scope.form.photo = $scope.userInfo.photo;
				$scope.form.admin = $scope.userInfo.admin;
			}

		})
	}
	$scope.putUser = function () {
		$http.put(urlUser, $scope.form)
			.then(function (resp) {
				// Xử lý phản hồi thành công từ máy chủ
				$scope.form = resp.data;
			})
			.catch(function (error) {
				// Xử lý lỗi
				console.error("Error:", error);
				// Hiển thị thông báo lỗi cho người dùng (tùy bạn)
			});
	}
	$scope.loadCities = function () {
		$http.get(url + "cities").then(function (response) {
			$scope.cities = response.data;
		});
	};

	$scope.loadDistricts = function () {
		if ($scope.city !== null && $scope.city === '') {
			$scope.address = $scope.city.name;
			$scope.districts = [];
			$scope.wards = [];
			return;
		}

		$http.get(url + $scope.city.code + "/districts").then(function (response) {
			$scope.districts = response.data;
			$scope.district = null;
			$scope.wards = [];
			$scope.setAddress();
		});

	};

	$scope.loadWards = function () {
		if (!$scope.district) {
			$scope.wards = [];
			return;
		}
		$http.get(url + $scope.district.code + "/wards").then(function (response) {
			$scope.wards = response.data;
			$scope.setAddress();
		});
	};

	$scope.setAddress = function () {
		// $scope.form.address = '';
		// if($scope.city != null) {
		// 	$scope.form.address = $scope.city.name_with_type;
		// 	if($scope.district != null) {
		// 		$scope.form.address = $scope.district.path_with_type;
		// 		if($scope.ward != null) {
		// 			$scope.form.address = $scope.ward.path_with_type;
		// 		}
		// 	}
		// }

		if ($scope.ward != null) {
			$scope.form.address = '';
			$scope.form.address = $scope.ward.path_with_type;
		}
	}





	getUser();
	$scope.loadCities();
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
app.controller('AdminProductController', function ($scope, $http) {
	$scope.products = [];
	$scope.category = [];
	$scope.form = {};

	$scope.loadAll = function () {
		const url = `${host}/product`;
		$http.get(url).then(resp => {
			$scope.products = resp.data;
		});
	}

	$scope.loadCategory = function () {
		const url = `${host}/category`;
		$http.get(url).then(resp => {
			$scope.category = resp.data;
		});
	}

	$scope.reset = function () {
		var product = {};
		topProductId();
		product.price = 0;
		$scope.form.product = product;
		$scope.form.imageUrl = "";
	}

	$scope.add = function () {
		var formProduct = $scope.form.product;
		const url = `${host}/product`;
		if (formProduct != null) {
			$http.post(url, formProduct).then(() => {
				console.log("Save sản phẩm thành công!");
				$scope.loadAll();
			}).catch(function (error) {
				console.error("Lỗi khi save sản phẩm:", error);
			});
		}
	}
	$scope.update = function () {
		var formProduct = $scope.form.product;
		const url = `${host}/product/${formProduct.productId}`;
		if (formProduct != null) {
			$http.put(url, formProduct).then(() => {
				console.log("Save sản phẩm thành công!");
				$scope.loadAll();
			}).catch(function (error) {
				console.error("Lỗi khi save sản phẩm:", error);
			});
		}
	}


	$scope.delete = function (productId) {
		const url = `${host}/product/${productId}`;
		$http.delete(url).then(function () {
			console.log("Xóa sản phẩm thành công!");
			$scope.loadAll();
			$scope.reset();
		}).catch(function (error) {
			console.error("Lỗi khi xóa sản phẩm:", error);
		});
	}

	function find(productId) {
		var products = [];
		products = $scope.products;
		for (var i = 0; i < products.length; i++) {
			if (products[i].product.productId == productId) return products[i];
		}
	};

	$scope.loadForm = function (productId) {
		const product = find(productId);
		if (product) {
			$scope.form = angular.copy(product);
			$scope.form.price = parseFloat($scope.form.price) || 0;

			$scope.scrollToForm();
		} else {
			$scope.form = {};
		}
	};



	function topProductId() {
		var url = `${host}/product/top`;
		var temp = 0;
		$http.get(url).then(resp => {
			$scope.form.product.productId = resp.data;
		});
	};
	$scope.scrollToForm = function () {
		var formElement = document.getElementById('formProduct');
		if (formElement) {
			formElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest'
			});
		}
	};
	$scope.loadAll();

	$scope.loadCategory();
	$scope.reset();
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
app.controller('AdminOrderController', function ($scope, $http) {
	$scope.orders = [];
	$scope.oiList = [];

	$scope.loadAll = function () {
		const url = `${host}/order`;
		$http.get(url).then(resp => {
			$scope.orders = resp.data;
			console.log(resp.data);
		});
	}

	$scope.updateStatus = function (id) {
		const url = `${host}/order/${id}/updateStatus`;
		$http.put(url)
			.then(function (response) {
				console.log('Trạng thái của đơn hàng đã được cập nhật.');
				$scope.loadAll();
			})
			.catch(function (error) {
				console.error('Lỗi khi cập nhật trạng thái của đơn hàng:', error);
			});
	};

	$scope.getStatusClass = function (status) {
		switch (status) {
			case 'Đang chờ':
				return 'btn btn-primary';
			case 'Đã giao':
				return 'btn btn-success';
			case 'Đã hủy':
				return 'btn btn-secondary';
			default:
				return 'btn';
		}
	};

	$scope.getOrderItemByOrderId = function (orderId) {
		const url = `${host}/order/detail/${orderId}`;
		$http.get(url).then(resp => {
			$scope.oiList = resp.data;
			console.log(resp.data);
		});
	}
	$scope.loadAll();
});


app.controller('TopBarController', function ($interval, $scope) {
	$scope.date = new Date();

	$interval(function () {
		$scope.date = new Date();
	}, 1000);
})


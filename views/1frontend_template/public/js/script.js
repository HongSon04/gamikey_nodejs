// !! HELP FUNCTION
$(document).ready(function () {

  // !!! Function turn on of overlay
  function turnOnOverlay() {
    $(".overlay").addClass("active");
  }
  function turnOffOverlay() {
    $(".overlay").removeClass("active");
  }

  // !!! Search product
  $("#searchproduct").on("keydown", function () {
    $(".nav_header_search").addClass("active");
  });
  // ? search product
  $("#searchproduct").on("blur", function () {
    if ($("#searchproduct").val() == "") {
      $(".nav_header_search").removeClass("active");
    }
  });
  // ? dropdown menu and turn on / off overlay
  $(".header_vertical_menu_button").on("click", function () {
    turnOnOverlay();
    $(".overlay").on("click", function () {
      turnOffOverlay();
    });
    $(".dropdown-menu").on("click", function () {
      turnOffOverlay();
    });
  });
  // ? MINI CART
  $("#view_mini_cart").on("click", function () {
    $(".mini_cart").addClass("active");
    turnOnOverlay();
    // ? turn off overlay and minicart when click on overlay
    $(".overlay").on("click", function () {
      $(".mini_cart").removeClass("active");
      turnOffOverlay();
    });
    // ? turn off overlay and minicart when click on close button
    $(".close_mini_cart").on("click", function () {
      $(".mini_cart").removeClass("active");
      turnOffOverlay();
    });
  });
  // ? SHOW HIDE PASSWORD
  $(".show_hide_password").on("click", function () {
    if ($(".passwordType").attr("type") == "password") {
      $(".passwordType").attr("type", "text");
    } else {
      $(".passwordType").attr("type", "password");
    }
  });
});

// ? show or hide items in product list if have more than 8 items
$(document).ready(function () {
  $(".section-product").each(function () {
    let items = $(this).find(".section-product-item");
    let numItems = items.length;
    // ? Width < 992x show 6 items, width > 992x show 8 items
    let perPage = 0;
    if ($(window).width() <= 992) {
      perPage = 6;
    } else {
      perPage = 8;
    }

    // Only show the first 8 items initially
    items.slice(perPage).hide();

    // Now setup the pagination
    if (numItems > perPage) {
      $(this).find("#loadMore").show();
      $(this).find("#showLess").hide();
    }

    $(this)
      .find("#loadMore")
      .on("click", function (e) {
        e.preventDefault();
        // Show more items
        items.slice(perPage).show();
        // Hide the load more button
        $(this).hide();
        // Show the show less button
        $(this).siblings("#showLess").show();
      });

    $(this)
      .find("#showLess")
      .on("click", function (e) {
        e.preventDefault();
        // Hide the items beyond the first 8
        items.slice(perPage).hide();
        // Show the load more button
        $(this).siblings("#loadMore").show();
        // Hide the show less button
        $(this).hide();
      });
  });
});

// ? Help scroll under will add class fixed to header
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(window).width() > 768) {
      if ($(this).scrollTop() > 300) {
        let heightHeader = $(".header-wrapper").height();
        $("#header").css("height", heightHeader);
        $(".header-wrapper").addClass("fixed");
      } else if ($(this).scrollTop() <= 10) {
        $(".header-wrapper").removeClass("fixed");
        $("#header").css("height", "auto");
      }
    }
  });
});

// ? Help scroll under will add class fixed to headermobile if width <  768px
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(window).width() <= 768) {
      if ($(this).scrollTop() >= 100) {
        let heightHeaderMobile = $("#header-mobile .header-wrapper").height();
        $("#header-mobile").css("height", heightHeaderMobile);
        $("#header-mobile .header-wrapper").addClass("fixed");
      } else if ($(this).scrollTop() <= 10) {
        $("#header-mobile .header-wrapper").removeClass("fixed");
        $("#header-mobile").css("height", "auto");
      }
    }
  });
});

// ? Mobile Menu

$(document).ready(function () {
  $(".sidebar_action").on("click", function () {
    $(".hamburger-menu").addClass("active");
  });
  $("#BtnClose").on("click", function () {
    $(".hamburger-menu").removeClass("active");
  });
});

// ? Get data id of variable product
$(document).ready(function () {
  $(".variable_product").on("click", function () {
    alert($(this).data("id"));
  });
});

$(document).ready(function () {
  $("#ratingComment").starRating({
    starIconEmpty: "far fa-star",
    starIconFull: "fas fa-star",
    starColorEmpty: "lightgray",
    starColorFull: "#FFC107",
    starsSize: 4, // em
    stars: 5,
  });
});

$(document).ready(function () {
  (function (document, window, index) {
    var inputs = document.querySelectorAll(".inputfile");
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener("change", function (e) {
        var fileName = "";
        if (this.files && this.files.length > 1)
          fileName = (this.getAttribute("data-multiple-caption") || "").replace(
            "{count}",
            this.files.length
          );
        else fileName = e.target.value.split("\\").pop();

        if (fileName) label.querySelector("span").innerHTML = fileName;
        else label.innerHTML = labelVal;
      });

      // Firefox bug fix
      input.addEventListener("focus", function () {
        input.classList.add("has-focus");
      });
      input.addEventListener("blur", function () {
        input.classList.remove("has-focus");
      });
    });
  })(document, window, 0);
});

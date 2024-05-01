// !! HELP FUNCTION
$(document).ready(function () {
  // !!! Function turn on of overlay
  function turnOnOverlay() {
    $('.overlay').addClass('active');
  }
  function turnOffOverlay() {
    $('.overlay').removeClass('active');
  }

  // ? search product
  // $("#searchproduct").on("blur", function () {
  //     $(".header_search_items").css("display", "none");
  // });

  // ? dropdown menu and turn on / off overlay
  function handleMiniCart() {
    $('.mini_cart').addClass('active');
    turnOnOverlay();
    // ? turn off overlay and minicart when click on overlay
    $('.overlay').on('click', function () {
      $('.mini_cart').removeClass('active');
      turnOffOverlay();
    });
    // ? turn off overlay and minicart when click on close button
    $('.close_mini_cart').on('click', function () {
      $('.mini_cart').removeClass('active');
      turnOffOverlay();
    });
  }
  // ? MINI CART
  $('#view_mini_cart').on('click', handleMiniCart);

  $('.header_vertical_menu_button').on('click', function () {
    turnOnOverlay();
    $('.overlay').on('click', function () {
      turnOffOverlay();
    });
    $('.dropdown-menu').on('click', function () {
      turnOffOverlay();
    });
  });

  // ? SHOW HIDE PASSWORD
  $('.show_hide_password').on('click', function () {
    if ($('.passwordType').attr('type') == 'password') {
      $('.passwordType').attr('type', 'text');
      // ? Đổi icon của id eyeChangeIcon
      $('#eyeChangedIcon').removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
      $('.passwordType').attr('type', 'password');
      // ? Đổi icon của id eyeChangeIcon
      $('#eyeChangedIcon').removeClass('fa-eye').addClass('fa-eye-slash');
    }
  });
});

// ? show or hide items in product list if have more than 8 items
$(document).ready(function () {
  $('.section-product').each(function () {
    let items = $(this).find('.section-product-item');
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
      $(this).find('#loadMore').show();
      $(this).find('#showLess').hide();
    }

    $(this)
      .find('#loadMore')
      .on('click', function (e) {
        e.preventDefault();
        // Show more items
        items.slice(perPage).show();
        // Hide the load more button
        $(this).hide();
        // Show the show less button
        $(this).siblings('#showLess').show();
      });

    $(this)
      .find('#showLess')
      .on('click', function (e) {
        e.preventDefault();
        // Hide the items beyond the first 8
        items.slice(perPage).hide();
        // Show the load more button
        $(this).siblings('#loadMore').show();
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
        let heightHeader = $('.header-wrapper').height();
        $('#header').css('height', heightHeader);
        $('.header-wrapper').addClass('fixed');
      } else if ($(this).scrollTop() <= 10) {
        $('.header-wrapper').removeClass('fixed');
        $('#header').css('height', 'auto');
      }
    }
  });
});

// ? Help scroll under will add class fixed to headermobile if width <  768px
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(window).width() <= 768) {
      if ($(this).scrollTop() >= 100) {
        let heightHeaderMobile = $('#header-mobile .header-wrapper').height();
        $('#header-mobile').css('height', heightHeaderMobile);
        $('#header-mobile .header-wrapper').addClass('fixed');
      } else if ($(this).scrollTop() <= 10) {
        $('#header-mobile .header-wrapper').removeClass('fixed');
        $('#header-mobile').css('height', 'auto');
      }
    }
  });
});

// ? Mobile Menu

$(document).ready(function () {
  $('.sidebar_action').on('click', function () {
    $('.hamburger-menu').addClass('active');
  });
  $('#BtnClose').on('click', function () {
    $('.hamburger-menu').removeClass('active');
  });
});

/* // ? Get data id of variable product
$(document).ready(function () {
  $(".variable_product").on("click", function () {
    alert($(this).data("id"));
  });
}); */

$(document).ready(function () {
  $('#ratingComment').starRating({
    starIconEmpty: 'far fa-star',
    starIconFull: 'fas fa-star',
    starColorEmpty: 'lightgray',
    starColorFull: '#FFC107',
    starsSize: 4, // em
    stars: 5,
  });
});

$(document).ready(function () {
  (function (document, window, index) {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener('change', function (e) {
        var fileName = '';
        if (this.files && this.files.length > 1)
          fileName = (this.getAttribute('data-multiple-caption') || '').replace(
            '{count}',
            this.files.length,
          );
        else fileName = e.target.value.split('\\').pop();

        if (fileName) label.querySelector('span').innerHTML = fileName;
        else label.innerHTML = labelVal;
      });

      // Firefox bug fix
      input.addEventListener('focus', function () {
        input.classList.add('has-focus');
      });
      input.addEventListener('blur', function () {
        input.classList.remove('has-focus');
      });
    });
  })(document, window, 0);
});

$(document).ready(function () {
  $('.header_search_form').on('keyup', '#searchproduct', function () {
    let keyword = $(this).val();
      let slugKeyword = keyword.replace(/ /g, '-');
      
    if (keyword.length > 3) {
      $.ajax({
        url: '/search',
        type: 'POST',
        data: { keyword: keyword, slugKeyword: slugKeyword },
        beforeSend: function () {
          $('.header_search_form button i')
            .removeClass('fa-search')
            .addClass('fa-spinner fa-spin');
        },
        success: function (data) {
          if (data.status == 'success') {
            let html = ' ';
            // ? Clear all items in header_search_items
            $('.header_search_items').empty();
            data.products.forEach((product) => {
              html += `
                <div class="header_search_item">
                    <a href='/product/${product.slug}'>
                        <div class="col-2">
                            <img class="header_search_item_img"
                                src="${product.image}" alt="">
                        </div>
                        <div class="col-8">
                            <h4 class="header_search_item_name">${product.name}</h4>
                        </div>
                        <div class="col-2">
                            <h5 class="header_search_item_price product_price">${product.price}</h5>
                        </div>
                    </a>
                </div>
              `;
            });
            $('.header_search_items').append(html);
            $('.header_search_items').css('display', 'block');
          }
        },
        complete: function () {
          $('.header_search_form button i')
            .removeClass('fa-spinner fa-spin')
            .addClass('fa-search');
        },
      });
    } else {
      $('.header_search_items').css('display', 'none');
    }
  });
  // ? Out focus search product display none
  $('.header_search_form').on('focusout', '#searchproduct', function () {
    $('.header_search_items').css('display', 'none');
  });
});

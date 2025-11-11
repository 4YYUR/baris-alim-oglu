$(document).ready(function () {
  // typing animation
  (function ($) {
    $.fn.writeText = function (content) {
      var contentArray = content.split(""),
        current = 0,
        elem = this;
      setInterval(function () {
        if (current < contentArray.length) {
          elem.text(elem.text() + contentArray[current++]);
        }
      }, 80);
    };
  })(jQuery);

  // input text for typing animation
  $("#holder").writeText("AUF EINER BERATUNG DER SIE VERTRAUEN KÖNNEN!");

  // initialize wow.js
  new WOW().init();

  // navigation toggle (hamburger menu)
  var main = function () {
    $(".fa-bars").click(function () {
      $(".nav-screen").animate({ right: "0px" }, 200);
      $("body").animate({ right: "285px" }, 200);
    });

    $(".fa-times, .nav-links a").click(function () {
      $(".nav-screen").animate({ right: "-285px" }, 200);
      $("body").animate({ right: "0px" }, 200);
    });
  };

  $(document).ready(main);

  // fullpage.js initialization
  $("#fullpage").fullpage({
    scrollBar: true,
    responsiveWidth: 400,
    navigation: true,
    navigationTooltips: [
      "LANDING",
      "DIENSTLEISTUNGEN",
      "KONTAKT",
      "SOZIALE MEDIEN"
    ],
    anchors: [
      "LANDING",
      "DIENSTLEISTUNGEN",
      "KONTAKT",
      "SOZIALE MEDIEN"
    ],
    menu: "#myMenu",
    fitToSection: false,

    afterLoad: function (anchorLink, index) {
      // Header color change depending on section
      if (index == 1) {
        $(".fa-chevron-down").css("opacity", "1");
        $(".header-links a").css("color", "#FFFFFF");
        $(".header-links").css("background-color", "transparent");
      } else {
        $(".header-links a").css("color", "white");
        $(".header-links").css("background-color", "#060030");
      }
      // (Skillbar animation removed)
    }
  });

  // scroll down arrow
  $(document).on("click", "#moveDown", function () {
    $.fn.fullpage.moveSectionDown();
  });

  // smooth scrolling for anchor links
  $(function () {
    $("a[href*=#]:not([href=#])").click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            { scrollTop: target.offset().top },
            700
          );
          return false;
        }
      }
    });
  });

  // AJAX contact form
  $(function () {
    var form = $("#ajax-contact");
    var formMessages = $("#form-messages");

    $(form).submit(function (e) {
      e.preventDefault();
      var formData = $(form).serialize();

      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: formData
      })
        .done(function (response) {
          $(formMessages)
            .removeClass("error")
            .addClass("success")
            .text(response);
          $("#name, #email, #message").val("");
        })
        .fail(function (data) {
          $(formMessages)
            .removeClass("success")
            .addClass("error");
          if (data.responseText !== "") {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              "Oops! An error occurred and your message could not be sent."
            );
          }
        });
    });
  });
});

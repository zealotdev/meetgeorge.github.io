jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    var form = $(this).find('.form-group'),
    formerror = false,
    emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    form.children('input').each(function() {

      var input = $(this);
      var rule = input.attr('data-rule');

      if (rule !== undefined) {
        var inputerror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              formerror = inputerror = true;
            }
            break;

          case 'minlen':
            if (input.val().length < parseInt(exp)) {
              formerror = inputerror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              formerror = inputerror = true;
            }
            break;

          case 'checked':
            if (! input.is(':checked')) {
              formerror = inputerror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(input.val())) {
              formerror = inputerror = true;
            }
            break;
        }
        input.next('.validation').html((inputerror ? (input.attr('data-msg') !== undefined ? input.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    form.children('textarea').each(function() {

      var input = $(this);
      var rule = input.attr('data-rule');

      if (rule !== undefined) {
        var inputerror = false;
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (input.val() === '') {
              formerror = inputerror = true;
            }
            break;

          case 'minlen':
            if (input.val().length < parseInt(exp)) {
              formerror = inputerror = true;
            }
            break;
        }
        input.next('.validation').html((inputerror ? (input.attr('data-msg') != undefined ? input.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (formerror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = '';
    }
    console.log('All good')
    $.ajax({
      type: "POST",
      url: 'form.php',
      data: str,
      success: function(msg) {
        // alert(msg);
        if (msg == 'OK') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
    });
    return false;
  });

});

$(function () {

    var inputs = $('#new_picture :input[type=text]');
    
    clearFields(inputs);
    
    function clearFields (inputs) {
      $('.ui-state-error-text').remove();
      $.each(inputs, function(index, field){
        $(field).focus(function(){
          $(field).removeClass("ui-state-error");
          $(field).next().remove();
        });
      });
    };
  
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
      maxNumberOfFiles: 3,
      acceptFileTypes: /\.(jpg|jpeg|gif|png|JPG|JPEG|GIF|PNG)$/
    });
    
    // 
    // Load existing files:
    $.getJSON($('#fileupload form').prop('action'), function (files) {
        var fu = $('#fileupload').data('fileupload');
        //fu._adjustMaxNumberOfFiles(-files.length);
        fu._renderDownload(files)
            .appendTo($('#fileupload .files'))
            .fadeIn(function () {
                // Fix for IE7 and lower:
                $(this).show();
            });
    });

    // Open download dialogs via iframes,
    // to prevent aborting current uploads:
    $('#fileupload .files a:not([target^=_blank])').live('click', function (e) {
        e.preventDefault();
        $('<iframe style="display:none;"></iframe>')
            .prop('src', this.href)
            .appendTo('body');
    });
    
    
    $('#fileupload').bind('fileuploadsend', function (e, data) {
      
      var values = {};
      
      $.each($('#new_picture').serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });

      var title = values["picture[title]"]
      var description = values["picture[description]"]
      
      $.each( values, function(k, v){
        if (v == 0) {
          $('input[name="' + k + '"]').addClass("ui-state-error");
          $('input[name="' + k + '"]').after("<span class=\"ui-state-error-text\"> can't be blank!</span>");
        }
       });

    });

});

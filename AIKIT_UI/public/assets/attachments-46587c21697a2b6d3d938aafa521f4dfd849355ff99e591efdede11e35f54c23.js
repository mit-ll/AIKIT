(function() {
  jQuery(function() {
    $('#attachment_uploaded_file').attr('name', 'attachment[uploaded_file]');
    return $('#new_attachment').fileupload({
      dataType: 'script',
      add: function(e, data) {
        var file;
        file = data.files[0];
        data.context = $(tmpl("template-attachment", file));
        $('#new_attachment').append(data.context);
        return data.submit();
      },
      progress: function(e, data) {
        var progress;
        if (data.context) {
          progress = parseInt(data.loaded / data.total * 100, 10);
          return data.context.find('.bar').css('width', progress + '%');
        }
      }
    });
  });

}).call(this);

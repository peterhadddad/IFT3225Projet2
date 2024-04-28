var app = Sammy('#main', function() {
    this.get('#/', function() {
        console.log('Home route triggered');
        this.$element().html('<h1>Bienvenue A Notre Jeu</h1>');
    });

    this.get('#/help', function() {
        var context = this;
        $.get('pages/help.hbs', function(data) {
            var html = Handlebars.compile(data);
            context.$element().html(html);
        });
    });

    this.get('#/login', function() {
        var context = this;
        $.get('pages/login.hbs', function(data) {
            var html = Handlebars.compile(data);
            context.$element().html(html);
        });
    });

    this.get('#/stats', function() {
        var context = this;
        $.get('pages/stats.hbs', function(data) {
            var html = Handlebars.compile(data);
            context.$element().html(html);
        });
      
    });
});

$(function() {
    app.run('#/');
});


$('#form-box').on('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting normally
    $.ajax({
        type: "POST",
        url: 'api/login.php', // Update to your actual login PHP URL
        data: $(this).serialize(),
        success: function(response) {
            var data = JSON.parse(response);
            if (data.success) {
                // If the PHP script provided a redirect URL, navigate there
                window.location.href = data.redirect;
            } else {
                // Display the error message
                $('#error-message').text(data.error).show();
            }
        }
    });
});


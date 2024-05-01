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
        $.ajax({
            url: 'api/stats.php',  // Ensure this URL correctly points to your stats.php file
            dataType: 'json',      // Make sure dataType is 'json' for automatic JSON parsing
            success: function(jsonData) {
                $.get('pages/stats.hbs', function(templateData) {
                    var template = Handlebars.compile(templateData);
                    context.$element().html(template(jsonData));
                });
            }
        });
    });

    this.get('#/concept', function() {
        var langue = this.params.langue;
        var concept = this.params.concept;
        var context = this;
        var page = this.params.page || 1; // Default to first page if no page is specified
    
        // Call your API or ConceptNet to get facts
        $.ajax({
            url: `api/concepts.php?langue=${langue}&concept=${concept}&page=${page}`,
            dataType: 'json',
            success: function(data) {
                $.get('pages/concepts.hbs', function(templateData) {
                    var template = Handlebars.compile(templateData);
                    context.$element().html(template(data));
                });
            }
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
});


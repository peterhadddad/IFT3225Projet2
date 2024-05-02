// Register Handlebars helpers
Handlebars.registerHelper('increment', function(value) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('decrement', function(value) {
    return parseInt(value) - 1;
});

Handlebars.registerHelper('gt', function(value1, value2, options) {
    return value1 > value2 ? options.fn(this) : (typeof options.inverse === 'function' ? options.inverse(this) : '');
});
Handlebars.registerHelper('lt', function(value1, value2, options) {
    return value1 < value2 ? options.fn(this) : (typeof options.inverse === 'function' ? options.inverse(this) : '');
});

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
            url: 'api/stats.php',
            dataType: 'json',
            success: function(jsonData) {
                $.get('pages/stats.hbs', function(templateData) {
                    var template = Handlebars.compile(templateData);
                    context.$element().html(template(jsonData));
                });
            },
            error: function(xhr, status, error) {
                console.log("Erreur lors de la récupération des statistiques : ", error);
                context.$element().html(`<p>Erreur lors du chargement des données : ${error}</p>`);
            }
        });
    });

    this.get('#/concept', function() {
        var langue = this.params.langue;
        var concept = this.params.concept;
        var context = this;
        var page = this.params.page || 1;
    
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

    this.get('#/jeu1', function(){
         var context = this;
         $.get('pages/jeu1.hbs', function(data) {
              var html = Handlebars.compile(data);
              context.$element().html(html);
         });
    });

    $(function() {
        app.run('#/');
    });

    $('#form-box').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: 'api/login.php',
            data: $(this).serialize(),
            success: function(response) {
                var data = JSON.parse(response);
                if (data.success) {
                    window.location.href = data.redirect;
                } else {
                    $('#error-message').text(data.error).show();
                }
            },
            error: function(xhr, status, error) {
                $('#error-message').text("Erreur lors de la connexion : " + error).show();
            }
        });
    });

    this.get('#/dumpfaits', function(context) {
        $.ajax({
            url: 'api/dumpfaits.php',
            dataType: 'json',
            success: function(data) {
                $.get('pages/dumpfaits.hbs', function(templateData) {
                    var template = Handlebars.compile(templateData);
                    context.$element().html(template({faits:data}));
                });
            },
            error: function(xhr, status, error) {
                console.log("Erreur lors de la récupération des faits : ", error);
                context.$element().html(`<p>Erreur lors du chargement des faits : ${error}</p>`);
            }
        });
    });
});

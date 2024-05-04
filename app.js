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

$(function() {
    var app = Sammy('#main', function() {
        this.get('#/', function() {
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
                    context.$element().html(`<p>Erreur lors du chargement des données : ${error}</p>`);
                }
            });
        });

        this.get('#/jeu1', function() {
            var context = this;
            $.get('pages/jeu1.hbs', function(data) {
                var html = Handlebars.compile(data);
                context.$element().html(html);
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
                    context.$element().html(`<p>Erreur lors du chargement des faits : ${error}</p>`);
                }
            });
        });
        this.get('#/jeux/related/:temps', function(context) {
            var temps = context.params.temps;
            $.get('pages/jeu2.hbs', function(data) {
                var html = Handlebars.compile(data);
                context.$element().html(html);
            }).fail(function(err) {
                console.log('Failed to load page', err);
            });
        });

        this.get('#/jeux/quisuisje/:temps', function(context) {
            var temps = context.params.temps;
            $.get('pages/jeu1.hbs', function(data) {
                var html = Handlebars.compile(data);
                context.$element().html(html);
            }).fail(function(err) {
                console.log('Failed to load page', err);
            });
        });
    });

    app.run('#/');
});

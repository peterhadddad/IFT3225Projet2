var app = Sammy('#main', function() {
    this.get('#/', function() {
        this.$element().html('<h1>Bienvenue A Notre Jeu');
    });

    this.get('#/help', function() {
        this.$element().html('<h1>Page Aide</h1>');
    });

    this.get('#/login', function() {
        this.$element().html('<h1>Se Connecter</h1><form>Nom utilisateur: <input type="text"><br>Mot De Passe: <input type="password"><br><input type="submit" value="Login"></form>');
    });

    this.get('#/stats', function() {
        this.$element().html('<h1>Statistics</h1><p>Displaying statistics...</p>');
    });
});

$(function() {
    app.run('#/');
});

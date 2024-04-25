var app = Sammy('#main', function() {
    this.get('#/', function() {
        this.$element().html('<h1>Bienvenue A Notre Jeu');
    });

    this.get('#/help', function() {
        this.$element().html('<h1>Page Aide</h1>');
    });

    this.get('#/login', function() {
        this.$element().html('<div class="container"><div class="box form-box"><header>Connexion</header><img src="logo.png" alt="logo" width="200px" height="200px"><form action="login" method="post"><div class="field input"><label for="username">Nom d\'utilisateur</label><input type="text" class="form-control" id="username" name="username" placeholder="Nom d\'utilisateur"></div><div class="field input"><label for="password">Mot de passe</label><input type="password" class="form-control" id="password" name="password" placeholder="Mot de passe"></div><div class="field"><input type="submit" class="btn btn-primary" value="Connexion"></div></form></div></div>');
        
    });

    this.get('#/stats', function() {
        this.$element().html('<h1>Statistics</h1><p>Displaying statistics...</p>');
    });
});

$(function() {
    app.run('#/');
});

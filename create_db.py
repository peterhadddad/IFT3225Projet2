import mysql.connector


host = "localhost"
user = "root"
password = ""


name = "conceptnet_db"
table = "facts"


fact = [
    ("/c/fr/cité universitaire", "RelatedTo", "/c/fr/étudiant"),
    ("/c/fr/Un boulanger", "UsedFor", "/c/fr/faire le pain"),
    # Ajoutez plus de faits selon les données collectées
]

# Connexion à MySQL
conn = mysql.connector.connect(
    host=host,
    user=user,
    password=password
)
cursor = conn.cursor()

# Création de la base de données si elle n'existe pas
cursor.execute(f"CREATE DATABASE IF NOT EXISTS {name}")
cursor.execute(f"USE {name}")

# Création de la table si elle n'existe pas
cursor.execute(f"""
CREATE TABLE IF NOT EXISTS {table} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start VARCHAR(255),
    relation VARCHAR(255),
    end VARCHAR(255)
)
""")

# Insertion des faits dans la table
insert_query = f"INSERT INTO {table} (start, relation, end) VALUES (%s, %s, %s)"
cursor.executemany(insert_query, fact)

# Validation des modifications
conn.commit()

# Fermeture des connexions
cursor.close()
conn.close()

print("Base de données et table initialisées, et faits insérés avec succès.")

if __name__ == "__main__":
        main()



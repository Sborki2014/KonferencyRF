import psycopg2
from psycopg2.extras import RealDictCursor
 
connection = psycopg2.connect(
    host="localhost",
    port=5432,
    dbname="conferences",
    user="conf_user",
    password="conf_pass")
with connection:
    with connection.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute("SELECT * FROM rooms WHERE room_type = %s", ("Кинозал",))
        for row in cursor.fetchall():
            print(row["name"])
connection.close()

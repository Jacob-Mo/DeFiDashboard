import sqlite3
from sqlite3 import Error
import os

os.environ['DB_PATH'] = 'transaction_db.sqlite'

def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        print(f"Connected to database. SQLite version: {sqlite3.version}")
        return conn
    except Error as e:
        print(e)
    return None

def create_table(conn, create_table_sql):
    try:
        with conn:
            conn.execute(create_table_sql)
    except Error as e:
        print(e)

def insert_transaction(conn, transaction):
    sql = ''' INSERT INTO transactions(amount,date,description)
              VALUES(?,?,?) '''
    try:
        with conn:
            cur = conn.execute(sql, transaction)
            return cur.lastrowid
    except Error as e:
        print(e)
        return None

def select_all_transactions(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM transactions")
    rows = cur.fetchall()
    return rows

def main():
    database = os.environ['DB_PATH']
    
    sql_create_transactions_table = """ CREATE TABLE IF NOT EXISTS transactions (
                                        id integer PRIMARY KEY,
                                        amount real NOT NULL,
                                        date text NOT NULL,
                                        description text NOT NULL
                                    ); """
    
    # Open the connection to database
    conn = create_connection(database)
    if conn is not None:
        create_table(conn, sql_create_transactions_table)
        
        transaction = (100.5, '2023-01-01', 'Grocery shopping')
        transaction_id = insert_transaction(conn, transaction)
        print(f"Transaction added with id {transaction_id}")
        
        transactions = select_all_transactions(conn)
        for row in transactions:
            print(row)
        
        # Close the connection
        conn.close()
    else:
        print("Error! cannot create the database connection.')

if __name__ == '__main__':
    main()
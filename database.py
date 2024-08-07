import sqlite3
import os

os.environ['DB_PATH'] = 'transaction_db.sqlite'


def establish_connection(database_file):
    try:
        connection = sqlite3.connect(database_file)
        print(f"Connected to database. SQLite version: {sqlite3.version}")
        return connection
    except sqlite3.Error as error:
        print(error)
    return None


def setup_table(connection, sql_create_table_command):
    try:
        with connection:
            connection.execute(sql_create_table_command)
    except sqlite3.Error as error:
        print(error)


def add_transaction(connection, transaction_details):
    insert_sql_command = ''' INSERT INTO transactions(amount,transaction_date,description)
              VALUES(?,?,?) '''
    try:
        with connection:
            cursor = connection.execute(insert_sql_command, transaction_details)
            return cursor.lastrowid
    except sqlite3.Error as error:
        print(error)
        return None


def fetch_all_transactions(connection):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM transactions")
    all_transactions = cursor.fetchall()
    return all_transactions


def run():
    database_path = os.environ['DB_PATH']

    sql_create_transactions_table = """ CREATE TABLE IF NOT EXISTS transactions (
                                        transaction_id integer PRIMARY KEY,
                                        amount real NOT NULL,
                                        transaction_date text NOT NULL,
                                        description text NOT NULL
                                    ); """

    # Establish the connection to the database
    db_connection = establish_connection(database_path)
    if db_connection is not None:
        setup_table(db_connection, sql_create_transactions_table)

        sample_transaction = (100.5, '2023-01-01', 'Grocery shopping')
        transaction_id = add_transaction(db_connection, sample_transaction)
        print(f"Transaction added with ID {transaction_id}")

        all_transactions = fetch_all_transactions(db_connection)
        for transaction in all_transactions:
            print(transaction)

        # Close the connection
        db_connection.close()
    else:
        print("Error! Cannot create the database connection.")


if __name__ == '__main__':
    run()
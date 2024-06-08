import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DB_connection_Singleton{
    private static DB_connection_Singleton instance;
    private Connection connection;
    private String url = "jdbc:mysql://localhost:PORT/DBNAME";
    private String username = "USERNAME";
    private String password = "PASSWORD";

    private DB_connection_Singleton() throws SQLException {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            this.connection = DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException ex) {
            System.out.println("Database Connection Creation Failed : " + ex.getMessage());
        }
    }

    public Connection getConnection() {
        return connection;
    }

    public static DB_connection_Singleton getInstance() throws SQLException {
        if (instance == null) {
            instance = new DB_connection_Singleton();
        } else if (instance.getConnection().isClosed()) {
            instance = new DB_connection_Singleton();
        }

        return instance;
    }
}

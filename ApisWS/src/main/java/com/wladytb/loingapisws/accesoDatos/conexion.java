/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wladytb.loingapisws.accesoDatos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author wladi
 */
public class conexion {

    private String username = "postgres";
    private String pass = "040599";
    private String classname = "org.postgresql.Driver";
    private String url = "jdbc:postgresql://localhost:5432/4mosqueteros";

   private Connection conn;

    public conexion() {
        try {
            Class.forName(classname);
            conn = DriverManager.getConnection(url, username, pass);
            System.out.println("conectadp");
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public Connection getConexion() {
        return this.conn;
    }

    public void closeconexion() throws SQLException {
        conn.close();
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wladytb.loingapisws.accesoDatos;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author wladi
 */
public class sentencias {

    ResultSet rs = null;
    Statement st = null;
    conexion c = new conexion();

    public ResultSet consultas(String sql) {

        try {
            st = c.getConexion().createStatement();
            rs = st.executeQuery(sql);
            return rs;
        } catch (SQLException e) {
            System.err.print("ERROR" + e.getMessage());
            cerrarconexion();
        }
        return rs;
    }

    public void cerrarconexion() {
        try {
            c.closeconexion();
            st.close();
        } catch (SQLException ex) {
            Logger.getLogger(sentencias.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
   
}

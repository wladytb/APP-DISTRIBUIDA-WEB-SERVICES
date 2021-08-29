/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wladytb.loingapisws.accesoDatos;

import com.wladytb.loingapisws.modelo.user;
import com.wladytb.loingapisws.recursos.encriptacion;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author wladi
 */
public class userDAO {

    private List<user> listaUser;
    private ResultSet resultado = null;
    private sentencias sentencia;
    private encriptacion cifrado;

    public List<String> verificar_user(String userName, String password,
            String firstName, String lastName, String email, String photo,
            String idApis, String api, int tp) {
        cifrado = new encriptacion();
        List<String> respuesta = new ArrayList<>();
        try {
            String pas = "null";
            if (tp == 0) {
                pas = cifrado.cifrar("TyroneT", password);
            }
            String sql = "select public.verificar_user('" + userName
                    + "','" + pas + "','" + firstName + "','" + lastName
                    + "','" + email + "','" + photo + "','" + idApis + "','" + api + "'," + tp + ")";
            sentencia = new sentencias();
            resultado = sentencia.consultas(sql);
            int bd = 0;
            while (resultado.next()) {
                bd = resultado.getInt(1);
            }
            if (bd != 0) {
                respuesta.add( String.valueOf(bd));
            }
            sentencia.cerrarconexion();
            resultado.close();
            return respuesta;
        } catch (SQLException ex) {
            try {
                sentencia.cerrarconexion();
                resultado.close();
            } catch (SQLException ex1) {
                System.out.println(ex.getMessage());
            }
            System.out.println(ex.getMessage());
        }
        return respuesta;
    }

    public int insert(String userName, String password,
            String firstName, String lastName, String email, String photo,
            String idApis, String api) {
        cifrado = new encriptacion();
        try {
            String sql = "select public.insert_user('" + userName
                    + "','" + cifrado.cifrar("TyroneT", password) + "','" + firstName + "','" + lastName
                    + "','" + email + "','" + photo + "','" + idApis + "','" + api + "')";
            sentencia = new sentencias();
            resultado = sentencia.consultas(sql);
            int bd = 0;
            while (resultado.next()) {
                bd = resultado.getInt(1);
            }
            sentencia.cerrarconexion();
            resultado.close();
            return bd;
        } catch (SQLException ex) {
            try {
                sentencia.cerrarconexion();
                resultado.close();
            } catch (SQLException ex1) {
                System.out.println(ex.getMessage());
            }
            System.out.println(ex.getMessage());
        }
        return 0;
    }

    private static boolean isNumeric(String cadena) {
        try {
            Integer.parseInt(cadena);
            return true;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }

    public List<user> obtenerDatos(String idU) {
        cifrado = new encriptacion();
        listaUser = new ArrayList<>();
        try {
            if (!isNumeric(cifrado.descifrar("TyroneT", idU))) {
                return listaUser;
            }

            String sql = "select public.get_info_user(" + Integer.parseInt(cifrado.descifrar("TyroneT", idU)) + ")";
            sentencia = new sentencias();
            resultado = sentencia.consultas(sql);
            String bd[];
            user userr;
            while (resultado.next()) {
                bd = resultado.getString(1).replaceAll("[()]", "").replace("\"", "").split(",");
                userr = new user("", bd[2], bd[3], bd[4], bd[5], bd[6], bd[7], bd[8], 0);
                listaUser.add(userr);
            }
            sentencia.cerrarconexion();
            resultado.close();
            return listaUser;
        } catch (SQLException ex) {
            try {
                sentencia.cerrarconexion();
                resultado.close();
            } catch (SQLException ex1) {
                System.out.println(ex.getMessage());
            }
            System.out.println(ex.getMessage());
        }
        return listaUser;
    }
}

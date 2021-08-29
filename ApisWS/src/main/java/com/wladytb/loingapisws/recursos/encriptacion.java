/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wladytb.loingapisws.recursos;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;

/**
 *
 * @author wladi
 */
public class encriptacion {

    public String cifrar(String secretKey, String cadena) {
        String encriptacion = "";
        try {
            MessageDigest md5
                    = MessageDigest.getInstance("MD5");
            byte[] llavePassword
                    = md5.digest(secretKey.getBytes("utf-8"));
            byte[] BytesKey
                    = Arrays.copyOf(llavePassword, 24);
            SecretKey key = new SecretKeySpec(BytesKey, "DESede");
            Cipher cifrado
                    = Cipher.getInstance("DESede");
            cifrado.init(Cipher.ENCRYPT_MODE, key);
            byte[] plainTextBytes
                    = cadena.getBytes("utf-8");
            byte[] buf
                    = cifrado.doFinal(plainTextBytes);
            byte[] base64Bytes
                    = Base64.encodeBase64(buf);
            encriptacion = new String(base64Bytes);
        } catch (UnsupportedEncodingException | InvalidKeyException | NoSuchAlgorithmException | BadPaddingException | IllegalBlockSizeException | NoSuchPaddingException ex) {
                       System.out.println(ex);

        }
        return encriptacion;
    }

    public String descifrar(String secretKey, String cadenaEncriptada) {
        String desencriptacion = "";
        try {
            byte[] message
                    = Base64.decodeBase64(cadenaEncriptada.getBytes("utf-8"));
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] digestOfPassword = md5.digest(secretKey.getBytes("utf-8"));
            byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
            SecretKey key = new SecretKeySpec(keyBytes, "DESede");
            Cipher decipher = Cipher.getInstance("DESede");
            decipher.init(Cipher.DECRYPT_MODE, key);
            byte[] plainText
                    = decipher.doFinal(message);
            desencriptacion = new String(plainText, "UTF-8");
        } catch (UnsupportedEncodingException | InvalidKeyException | NoSuchAlgorithmException | BadPaddingException | IllegalBlockSizeException | NoSuchPaddingException ex) {
            System.out.println(ex);
        }
        return desencriptacion;
    }

//    public static void main(String[] args) {
//        encrip n = new encrip();
//        String tet = n.ecnode("Bellchat","wladytb");
//        System.out.println("encriptado:  " + tet);
//        System.out.println("descencriptado:  " + n.deecnode("Bellchat", tet));
//
//    }

}

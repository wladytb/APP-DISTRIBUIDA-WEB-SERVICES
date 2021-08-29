/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wladytb.loingapisws.webServices;

import com.wladytb.loingapisws.accesoDatos.userDAO;
import java.net.URI;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

/**
 * REST Web Service
 *
 * @author wladi
 */
@Path("login")
public class LoginResource {

    @Context
    private UriInfo context;

    public LoginResource() {
    }

    /**
     * Retrieves representation of an instance of
     * com.wladytb.loingapisws.webServices.LoginResource
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    @Path("checkUser")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response verificarUser(String data, @Context UriInfo uriInfo) {
        URI uri = uriInfo.getAbsolutePath();
        System.out.println(data);
        userDAO verificacion = new userDAO();
        JSONObject dataObject = new JSONObject(data);
        return Response.created(uri).entity(verificacion.verificar_user(
                dataObject.getString("userName"),
                dataObject.getString("password"),
                dataObject.getString("firstName"),
                dataObject.getString("lastName"),
                dataObject.getString("email"),
                dataObject.getString("photo"),
                dataObject.getString("idApis"),
                dataObject.getString("api"),
                dataObject.getInt("tp")))
                .header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers").build();
    }

    @Path("save")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertar(String data, @Context UriInfo uriInfo) {
        URI uri = uriInfo.getAbsolutePath();
        System.out.println(data);
        userDAO verificacion = new userDAO();
        JSONObject dataObject = new JSONObject(data);
        return Response.created(uri).entity(verificacion.insert(
                dataObject.getString("userName"),
                dataObject.getString("password"),
                dataObject.getString("firstName"),
                dataObject.getString("lastName"),
                dataObject.getString("email"),
                dataObject.getString("photo"),
                dataObject.getString("idApis"),
                dataObject.getString("api")))
                .header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers").build();
    }

    @Path("getData")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getData(String data, @Context UriInfo uriInfo) {
        URI uri = uriInfo.getAbsolutePath();
        System.out.println(data);
        userDAO verificacion = new userDAO();
        JSONObject dataObject = new JSONObject(data);
        return Response.created(uri).entity(verificacion.obtenerDatos(
                dataObject.getString("idU")))
                .header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers").build();
    }

    /**
     * PUT method for updating or creating an instance of LoginResource
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}

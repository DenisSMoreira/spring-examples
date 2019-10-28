package com.monitor.users.controller;

import com.monitor.core.entity.User;
import com.monitor.users.service.UserService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "User", description = "Orquestração do login")
@RestController
@RequestMapping("/user")
public class UserController {

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService service;

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    @HystrixCommand(groupKey = "UsuarioRest")
    @ApiOperation(value = "findAll", notes = "Retorna todas as rotas cadastradas anteriormente")
    public @ResponseBody
    List<User> findAll() {

        return service.findAll();
    }

    @ApiOperation(value = "find", notes = "Retorna o usuario")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.FOUND)
    public @ResponseBody
    User find(@RequestParam(required = true) String userId) {

        return service.findOne(userId);
    }

    @ApiOperation(value = "update", notes = "update User")
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public @ResponseBody
    User update(@RequestBody User user) {

        return service.update(user);
    }

    @ApiOperation(value = "create", notes = "Criar novo usuário para acesso da aplicação")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "OK", response = User.class)
        ,@ApiResponse(code = 400, message = "Bad Request", response = Exception.class)
        ,@ApiResponse(code = 500, message = "Internal Server Error", response = Exception.class)})
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody User user) {
        try {
            final User userSaved = service.save(user);

            if (userSaved != null) {
                LOG.info("Usuário salvo com sucesso", userSaved);
                return new ResponseEntity<>(user, HttpStatus.OK);

            } else {
                LOG.error("Erro ao salvar usuário", userSaved);
                return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception) {
            LOG.error("Erro ao salvar usuário", exception.getMessage());
            return new ResponseEntity<>(exception, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "passwordReset", notes = "password Reset")
    @RequestMapping(value = "/passwordReset", method = RequestMethod.GET)
    public void passwordReset(@RequestParam(required = true) String email) {

    }

    @ApiOperation(value = "update", notes = "update")
    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public void update(@RequestParam(required = true) String email) {

    }

    @ApiOperation(value = "authentication", notes = "login")
    @HystrixCommand(groupKey = "UsuarioRest")
    @RequestMapping(value = "/authentication", method = RequestMethod.POST)
    public @ResponseBody
    User authentication(@RequestBody User user) {

        return service.authentication(user);
    }

    @ApiOperation(value = "findAllUsersOfTeams", notes = "getAllUsersOfTeams")
    @HystrixCommand(groupKey = "UsuarioRest")
    @RequestMapping(value = "/findAllUsersOfTeams/{userId}", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAllUsersOfTeams(@PathVariable(name = "userId", required = true) String userId) {
        LOG.info("findAllUsersOfTeams userId: {}", userId);
        return service.getAllUsersOfTeams(userId);
    }

    @ApiOperation(value = "delete", notes = "Delete user")
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@RequestParam(required = true) String id) {

        service.delete(id);
    }

}

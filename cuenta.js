"use strict";
exports.__esModule = true;
var rs = require("readline-sync");
var fs = require("fs");
var bcr = require("bcryptjs");
var Admin = /** @class */ (function () {
    function Admin() {
        this.usuarios = [];
        this.cargarUsuarios();
        this.cuentas = [];
    }
    Admin.prototype.addUsuario = function (user) {
        this.usuarios.push(user);
    };
    Admin.prototype.quitarUsuario = function (user) {
        var userAux;
        var indexAux;
        for (var i = 0; i < this.usuarios.length; i++) {
            userAux = this.usuarios[i];
            if (userAux === user.get_nickName()) {
                for (indexAux = i; indexAux < this.usuarios.length - 1; indexAux++) {
                    this.usuarios[indexAux] = this.usuarios[indexAux + 1];
                }
                this.usuarios.pop();
            }
        }
    };
    Admin.prototype.addcuenta = function (newCuenta) {
        this.cuentas.push(newCuenta);
        this.addUsuario(newCuenta.getUsuario());
    };
    Admin.prototype.cargarUsuarios = function () {
        var texto = fs.readFileSync('usuarios.txt', 'utf-8');
        this.usuarios = texto.split('\r\n');
    };
    return Admin;
}());
var Usuario = /** @class */ (function () {
    function Usuario(nickname, contrasena) {
        this.nickName = nickname;
        this.contrasena = contrasena;
    }
    Usuario.prototype.get_nickName = function () {
        return this.nickName;
    };
    Usuario.prototype.getContraseña = function () {
        return this.contrasena;
    };
    Usuario.prototype.cambiarContraseña = function (password) {
        this.contrasena = password;
    };
    Usuario.prototype.login = function (cuenta) {
        var user;
        var pass;
        user = rs.question("ingresar usuario: ");
        pass = rs.question("ingresar la contrasena: ");
        if (user == cuenta.getUsuario() && bcr.compare(pass, bcr.hashSync(cuenta.getPassword()))) {
            console.log('ingreso a la cuenta...');
        }
        else {
            console.log('nombre de usuario y/o contraseña incorrectos');
        }
    };
    return Usuario;
}());
var Cuenta = /** @class */ (function () {
    function Cuenta(nick, password) {
        this.user = new Usuario(nick, bcr.hashSync(password));
        this.password = bcr.hashSync(password);
    }
    Cuenta.prototype.getUsuario = function () {
        return this.user.get_nickName();
    };
    Cuenta.prototype.setPassword = function () {
        var passAux, pass2;
        passAux = rs.question("ingresar la actual contrasenia: ");
        pass2 = rs.question("ingresar la nueva contrasenia: ");
        if (passAux == this.password) {
            this.password = pass2;
            bcr.hashSync(pass2);
        }
    };
    Cuenta.prototype.getPassword = function () {
        return this.password;
    };
    return Cuenta;
}());
var admin = new Admin();
var miUser = new Usuario("jorge", "pass01");
var miCta = new Cuenta(miUser.get_nickName(), miUser.getContraseña());
admin.addcuenta(miCta);
console.log(admin);
console.log(miUser);
console.log(miCta);
// miCta.setPassword();
// console.log(miCta);
// miUser.login(miCta);
admin.quitarUsuario(miUser);
console.log(admin);

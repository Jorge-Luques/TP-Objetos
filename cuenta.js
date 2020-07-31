"use strict";
exports.__esModule = true;
var rs = require("readline-sync");
var fs = require("fs");
var bcr = require("bcryptjs");
//------------------------ CLASE ADMIN -----------------------------------
var Admin = /** @class */ (function () {
    function Admin() {
        this.usuarios = [];
        this.cargarUsuarios();
        this.cuentas = [];
        this.cargarCuentas();
    }
    Admin.prototype.addUsuario = function (user) {
        this.usuarios.push(user);
    };
    /**
     * con este metodo se puede eliminar un usuario que tiene una cuenta creada
     * buscando su nickname para la eliminación, borrando también su cuenta.
     * Se elimina del arreglo usuarios[] y del arreglo cuentas[]
     * @param user
     */
    Admin.prototype.quitarUsuario = function (user) {
        var userAux;
        var indexAux;
        for (var i = 0; i < this.usuarios.length; i++) {
            userAux = this.usuarios[i];
            if (userAux === user) {
                for (indexAux = i; indexAux < this.usuarios.length - 1; indexAux++) {
                    this.usuarios[indexAux] = this.usuarios[indexAux + 1];
                    this.cuentas[indexAux] = this.cuentas[indexAux + 1];
                }
                this.usuarios.pop();
                this.cuentas.pop();
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
    /**
     * se utiliza para crear una cuenta por cada usuario que ya se cargó desde archivo
     * y guardarla en el arreglo de objetos Cuenta con una contraseña designada al azar
     * (se diferencia de el metodo addCuenta(newCuenta: Cuenta) porque no parte desde
     * una instancia de Cuenta, sino desde usuarios cargados sin su cuenta creada)
     */
    Admin.prototype.cargarCuentas = function () {
        var cta;
        var i;
        var pwd;
        for (i = 0; i < this.usuarios.length; i++) {
            pwd = Math.random().toString(36).substring(2); //a cada usuario se le carga una contraseña al azar
            // console.log("password: ",pwd);
            cta = new Cuenta(this.usuarios[i], pwd);
            this.cuentas.push(cta);
        }
    };
    /**
     * se utiliza para mostrar un listado de todas las cuentas administradas
     */
    Admin.prototype.verCtas = function () {
        var i;
        var cta;
        console.log(" HAY ", this.cuentas.length, " CUENTAS");
        for (i = 0; i < this.cuentas.length; i++) {
            cta = this.cuentas[i];
            console.log(i, ") Usuario: ", cta.getUsuario(), " pwd: ", cta.getPassword());
        }
    };
    return Admin;
}());
//------------------------ CLASE USUARIO -----------------------------------
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
    Usuario.prototype.login = function (cuenta) {
        var user;
        var pass;
        user = rs.question("ingresar usuario: ");
        pass = rs.question("ingresar la contrasena: ");
        if (user == cuenta.getUsuario() && bcr.compare(pass, bcr.hashSync(cuenta.getPassword()))) {
            console.log('ingreso a la cuenta...');
        }
        else {
            console.log('nombre de usuario y/o contrasena incorrectos');
        }
    };
    return Usuario;
}());
//------------------------ CLASE CUENTA -----------------------------------
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
        if (bcr.compare(passAux, bcr.hashSync(this.getPassword()))) {
            this.password = bcr.hashSync(pass2);
            console.log("contraseña cambiada con exito");
        }
        else {
            console.log("NO se ha podido cambiar la contraseña");
        }
    };
    Cuenta.prototype.getPassword = function () {
        return this.password;
    };
    return Cuenta;
}());
//------------------------ (MAIN) -----------------------------------
var admin = new Admin();
var miUser = new Usuario("jorge", "pass01");
var miCta = new Cuenta(miUser.get_nickName(), miUser.getContraseña());
admin.addcuenta(miCta);
console.log(admin);
console.log(miUser);
console.log(miCta);
console.log("PROBANDO INGRESAR A LA CUENTA");
miUser.login(miCta);
console.log("PROBANDO CAMBIAR CONTRASEÑA");
miCta.setPassword();
console.log(miCta);
// console.log("PROBANDO ELIMINAR USUARIO")
// admin.quitarUsuario('soyUser2020');
// console.log(admin);
admin.verCtas();

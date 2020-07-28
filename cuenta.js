var Admin = /** @class */ (function () {
    function Admin() {
        this.usuarios = [];
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
            if (userAux.get_nickName === user.get_nickName) {
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
    return Usuario;
}());
var Cuenta = /** @class */ (function () {
    function Cuenta(nick, password) {
        this.user = new Usuario(nick, password);
        this.password = password;
    }
    Cuenta.prototype.getUsuario = function () {
        return this.user;
    };
    Cuenta.prototype.setPassword = function (pass2) {
        this.password = pass2;
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

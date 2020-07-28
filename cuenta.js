"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var bcrypt = require('bcryptjs');
var Admin = /** @class */ (function () {
    function Admin() {
        this.usuarios = [];
        this.cargarUsuarios();
        this.cuentas = [];
    }
    Admin.prototype.addUsuario = function (user) {
        this.usuarios.push(user);
    };
    // public quitarUsuario(user: Usuario): void{
    //     let userAux: Usuario;
    //     let indexAux: number;
    //     for (let i=0; i < this.usuarios.length; i++){
    //         userAux = this.usuarios[i];
    //         if(userAux.get_nickName === user.get_nickName){
    //             for(indexAux = i; indexAux < this.usuarios.length-1;indexAux++){
    //                 this.usuarios[indexAux] = this.usuarios[indexAux+1];
    //             }
    //             this.usuarios.pop();
    //         }
    //     }
    // }
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
    return Usuario;
}());
var Cuenta = /** @class */ (function () {
    // private salt= 10;
    function Cuenta(nick, password) {
        this.user = new Usuario(nick, password);
        this.password = "******";
    }
    Cuenta.prototype.getUsuario = function () {
        return this.user.get_nickName();
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
///probando bcrypt
var myvalue = "JFDSNJDSNFJSDNFSJASASNDCAUDHANDKLAMDXIALWDMQAW";
// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(myvalue, salt, function(err, hash) {
//         console.log(myvalue);
//         console.log(hash);
//         console.log(bcrypt.compareSync(myvalue,hash));
//     });
// });
// let salt = bcrypt.genSaltSync(10);
// let hash = bcrypt.hashSync(myvalue,salt);
// console.log(myvalue);
// console.log(hash);
// console.log(bcrypt.compareSync(myvalue,hash));
bcrypt.hash(myvalue, 10, function (err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(hash);
    bcrypt.compare(myvalue, hash, function (err, res) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res);
    });
});
var hashPassword = function () { return __awaiter(void 0, void 0, void 0, function () {
    var hash, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, bcrypt.hash(myvalue, 10)];
            case 1:
                hash = _c.sent();
                console.log(hash);
                _b = (_a = console).log;
                return [4 /*yield*/, bcrypt.compare(myvalue, hash)];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
hashPassword();

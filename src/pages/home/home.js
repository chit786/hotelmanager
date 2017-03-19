var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Todos } from '../../providers/todos';
import { NavController, AlertController } from 'ionic-angular';
var HomePage = (function () {
    //this.mainmenus = ['Starters', 'Soups', 'Salads', 'Rotis', 'Drinks', 'Deserts', 'Rice and Pulavs', 'Subji'];
    function HomePage(navCtrl, todoService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.todoService = todoService;
        this.alertCtrl = alertCtrl;
        this.mainmenus = ['Starters', 'Soups', 'Salads', 'Rotis', 'Drinks', 'Deserts', 'Rice and Pulavs', 'Subji'];
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.todoService.getTodos().then(function (data) {
            _this.todos = data;
        });
    };
    HomePage.prototype.removeMenuItem = function (index) {
        this.mainmenus.splice(index, 1);
    };
    HomePage.prototype.createTodo = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Add',
            message: 'What do you need to do?',
            inputs: [
                {
                    name: 'title'
                }
            ],
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.todoService.createTodo({ title: data.title });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.updateTodo = function (todo) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Edit',
            message: 'Change your mind?',
            inputs: [
                {
                    name: 'title'
                }
            ],
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.todoService.updateTodo({
                            _id: todo._id,
                            _rev: todo._rev,
                            title: data.title
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.deleteTodo = function (todo) {
        this.todoService.deleteTodo(todo);
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [Object, Todos, Object])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map
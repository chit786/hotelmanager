import { Component } from '@angular/core';
import { Todos } from '../../providers/todos';
import { NavController,AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: any;
  mainmenus: any;

  //this.mainmenus = ['Starters', 'Soups', 'Salads', 'Rotis', 'Drinks', 'Deserts', 'Rice and Pulavs', 'Subji'];
 
  constructor(public navCtrl: NavController, public todoService: Todos, public alertCtrl: AlertController) {
  this.mainmenus = ['Starters', 'Soups', 'Salads', 'Rotis', 'Drinks', 'Deserts', 'Rice and Pulavs', 'Subji'];
  }
 
  ionViewDidLoad(){
 
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });
 
  }
 
 removeMenuItem(index) {
    this.mainmenus.splice(index, 1);
 }
 
  createTodo(){
 
    let prompt = this.alertCtrl.create({
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
          handler: data => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  updateTodo(todo){
 
    let prompt = this.alertCtrl.create({
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
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title
            });
          }
        }
      ]
    });
 
    prompt.present();
  }
 
  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }

}

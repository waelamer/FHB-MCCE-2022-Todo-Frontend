import { Component, OnInit } from '@angular/core';
import { TodoItemModel } from './model/todo-item-model';
import { TodoItemOwner } from './model/todo-item-owner';
import { TodoItemState } from './model/todo-item-state';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {
  
  owner : TodoItemOwner = {
    name: "Klaus",
    email: "klaus.karner@gmx.at"
  };
  
  item: TodoItemModel = {
    id: "1234-5678",
    name: "Todo 1",
    description: "This is the description of the todo",
    created: new Date("2022-03-17 21:12"),
    finished: new Date("2022-03-17 21:12"),
    owner: this.owner,
    state: TodoItemState.Doing
  };

  constructor() { 

  }

  ngOnInit(): void {
  }

  getStateText(): string {
    return TodoItemState[this.item.state];
  }

}

import { Component, OnInit } from '@angular/core';
import { TodoItemModel } from './model/todo-item-model';
import { TodoItemOwner } from './model/todo-item-owner';
import { TodoItemState } from './model/todo-item-state';
import * as AWS from 'aws-sdk';

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

  callLambda(): void {
    AWS.config.update({ 
      "accessKeyId": "ASIA4EDFXXSTBKWX2NKW", 
      "secretAccessKey": "iOUbsOFzqJKuzyEfBNok543pzmQOks54CCn+1qaU",
      "sessionToken": "FwoGZXIvYXdzEHMaDHVaoHBd0F+o2G9NWSK9AbHE63yQkl0n1W3i4nefXxKoTP+8FCp2XApAg981NGrNHNBjtVAT62hr3ytsbfK5oaz+nggatPyDZQf50i/Gqj6VzLwWgLQ5hjQdo2MNO3A1YA5peQHoXleiaa99jvN24cgW9OZ+t8vVUkYA2dVXBJ8HqtbRAKoKBXGq9MhI6na01EL7UupIHBhOkoePC1aGIF1N1IxPCjTPmFEDnVQgcDrAruiqYf/kkBSoAZiQGdL02auRx8euoQuysionpSipoNiRBjItTi9PS2iJHk32fdBNHyl1+635qouhPrvC3cGOl0C0Yr73nrC0R/qCr+aV3p9o",
      "region": "us-east-1" 
    });

    let lambda = new AWS.Lambda();
    let payload = {
      "key1": "value1",
      "key2": "value2",
      "key3": "value3"
    }
    
    let params = {
      FunctionName: 'arn:aws:lambda:us-east-1:833437023398:function:Hello_World', /* required */
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify(payload) /* Strings will be Base-64 encoded on your behalf */,
    };

    lambda.invoke(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }

}

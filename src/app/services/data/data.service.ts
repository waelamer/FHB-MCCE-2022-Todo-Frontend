import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { AwsConfig } from 'src/app/interfaces/aws-config/aws-config';
import { TodoItem } from 'src/app/interfaces/todo-item/todo-item';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  lambda!: AWS.Lambda;
  awsConfig: AwsConfig = {
    getTodosUrl: "",
    updateTodosUrl: "",
    deleteTodosUrl: ""
  };
  
  constructor(private http: HttpClient) {
    let awsConfig = localStorage.getItem("awsConfig");

    if (awsConfig) {
      let config: AwsConfig = JSON.parse(awsConfig);
      this.updateAwsConfig(config);
    }
  }

  updateAwsConfig (config: AwsConfig) {
    this.awsConfig = config;
    AWS.config.update(<AWS.ConfigurationOptions> config);
    this.lambda = new AWS.Lambda();
  }

  getTodoItems (): Promise<any> {
    let response: Promise<any> = this.callLambdaGet(this.awsConfig.getTodosUrl); 
    return response;
  }

  updateTodoItem (item: TodoItem): Promise<any> {
    let requestBody = JSON.stringify(item)
    let response: Promise<any> = this.callLambdaPost(this.awsConfig.updateTodosUrl, requestBody); 
    return response;
  }

  deleteTodoItem (item: TodoItem): Promise<any> {
    let requestBody = JSON.stringify(item)
    let response: Promise<any> = this.callLambdaPost(this.awsConfig.deleteTodosUrl, requestBody); 
    return response;
  }

  callLambdaGet(url: string): Promise<any> {
    const headers = { "Access-Control-Allow-Origin": "*" };

    return new Promise((resolve, reject) => {
      this.http
        .get(url, { headers })
        .subscribe(
          data => resolve(data),
          error => reject(error)
        )
    })
  }

  callLambdaPost(url: string, requestBody: any): Promise<any> {
    const headers = { "Access-Control-Allow-Origin": "*" };

    return new Promise((resolve, reject) => {
      this.http
        .post<any>(url, requestBody, { headers })
        .subscribe(
          data => resolve(data),
          error => reject(error)
        )
    })
  }
}

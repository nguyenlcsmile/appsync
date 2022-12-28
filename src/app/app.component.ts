import { Component } from '@angular/core';
// top of file
import { API, graphqlOperation } from '@aws-amplify/api';
import config from '../aws-exports';
import { APIService } from './API.service';
import { addSampleData } from 'src/graphql/mutations';
import * as subscriptions from 'src/graphql/subscriptions';
import { query } from '@angular/animations';

API.configure(config)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // after your imports
  title = 'newAppSync';

  constructor(private api: APIService) { }
  ngOnInit(): void { }

  ngAfterViewInit() {
    this.createUser();
    this.test();
  }

  async createUser() {
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.key = "10";
    gqlAPIServiceArguments.id = "10";

    const users = await API.graphql(
      graphqlOperation(addSampleData, gqlAPIServiceArguments)
    )
    console.log(users);
  }

  test() {
    // Subscribe to creation of Todo
    const subscription = API.graphql(
      graphqlOperation(subscriptions.subscribeToNewMessage)
    ).subscribe({
      next: ({ provider, value }) => console.log({ provider, value }),
      error: (error) => console.warn(error)
    })
    console.log(subscription, typeof subscription);
  }
}

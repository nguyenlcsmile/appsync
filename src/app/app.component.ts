import { Component } from '@angular/core';
// top of file
import { API, graphqlOperation } from '@aws-amplify/api';
import config from '../aws-exports';
import { APIService } from './API.service';
import { addSampleData } from 'src/graphql/mutations';
import * as subscriptions from 'src/graphql/subscriptions';
import { Amplify } from "@aws-amplify/core";

Amplify.configure(config)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // after your imports
  title = 'newAppSync';
  listData: any;

  constructor(private api: APIService) { }

  ngOnInit() {
    const result = this.api.SubscribeToNewMessageListener().subscribe({
      next: (data) => {
        let newData = data.value.data.subscribeToNewMessage;
        this.listData = `ID: ${newData.id}, Key: ${newData.key}` ;
      }
    })
    // result.unsubscribe();
  }

  ngAfterViewInit() {
    this.createUser();
    console.log(this.listData);
  }



  async createUser() {
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.key = "10";
    gqlAPIServiceArguments.id = "10";

    const users = await API.graphql(
      graphqlOperation(addSampleData, gqlAPIServiceArguments)
    )
  }
}

export const subscribeToNewMessage = /* GraphQL */ `
    subscription SubscribeToNewMessage($filter: ModelSubscriptionTodoFilterInput) {
        subscribeToNewMessage(filter: $filter) {
            id
            key
            datetime
        }
    }
`;
export const addSampleData = /* GraphQL */ `
  mutation AddSampleData($id: ID!, $key: String!) {
  addSampleData(id: $id, key: $key) {
    id
    key
    datetime
  }
}
`;
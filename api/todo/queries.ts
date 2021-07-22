import { TodoItemType } from './types';

export const GRAPHQL_API_SERVER_URL = 'http://localhost:4000/graphql';

export const TodoCreateQuery = (item: TodoItemType) => {
  return {
    query: `
        mutation ($params : TodoCreateInput!) {
          TodoCreate (
            params : $params
          ) {
            ok
            error{
              location
              severity
              code
              message
            }
            data{
              _id
              title
              content
            }
          }
        }
        `,
    variables: {
      params: {
        title: item.title,
        content: item.content,
      },
    },
  };
};

export const TodoUpdateQuery = (item: TodoItemType) => {
  return {
    query: `
        mutation ($id : String!, $params : TodoUpdateInput!) {
          TodoUpdate (
            id : $id,
            params : $params
          ) {
            ok
            error{
              location
              severity
              code
              message
            }
            data{
              _id
              title
              content
            }
          }
        }
        `,
    variables: {
      id: String(item._id),
      params: {
        title: item.title,
        content: item.content,
      },
    },
  };
};

export const TodoFindByIdQuery = (item: TodoItemType) => {
  return {
    query: `query ($id : String!){
      TodoFindById(
        id : $id,
      )
      {
        ok
        error{
          location
          severity
          code
          message
        }
        data{
          _id
          title
          content
        }
      }
  }
  `,
    variables: { id: String(item._id) },
  };
};

export const TodoListQuery = (page: number, cntPerPage: number) => {
  return {
    query: `query ($pageInput : pageInput!){
          TodoList(
            pageInput : $pageInput
          )
          {
              ok
              error{
                location
                severity
                code
                message
              }
              page{
                page
                totalPageSize
              }
              data{
                _id
                title
                content

              }
          }
      }
      `,
    variables: { pageInput: { page, cntPerPage } },
  };
};

export const TodoDeleteQuery = (item: TodoItemType) => {
  return {
    query: `
            mutation ($id : String!) {
              TodoDelete (
                id : $id,
              ) {
                ok
                error{
                  location
                  severity
                  code
                  message
                }
                data{
                  _id
                  title
                  content
                }
              }
            }
        `,
    variables: { id: String(item._id) },
  };
};

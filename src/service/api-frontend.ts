import Todo from '../models/todo';
import shortid from 'shortid';
import LocalStorage from '../localStorage';
import { TodoStatus } from '../constants/todo';

class ApiFrontend {
  async createTodo(content: string): Promise<Todo> {
    const todo = new Todo(
      shortid(),
      'firstUser',
      content,
      new Date().toISOString(),
      TodoStatus.ACTIVE
    );

    const todoList = await this.getTodoList();
    todoList.push(todo);
    LocalStorage.updateToDoToLocalStorage(todoList);
    return Promise.resolve(todo);
  }

  async getTodoList(): Promise<Todo[]> {
    console.log(LocalStorage.getTodoList());
    return Promise.resolve(
      LocalStorage.getTodoList().map(
        (todo) =>
          new Todo(
            todo.id,
            todo.user_id,
            todo.content,
            todo.created_date,
            todo.status
          )
      )
    );
  }
}

export default new ApiFrontend();

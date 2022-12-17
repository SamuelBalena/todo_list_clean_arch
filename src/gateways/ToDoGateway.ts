export default interface ToDoGateway {
  getTodos(): Promise<any>;
  addItem(data: any): Promise<any>;
  updateItem(id: number, status: boolean): Promise<any>;
  deleteItem(id: number): Promise<any>;
}

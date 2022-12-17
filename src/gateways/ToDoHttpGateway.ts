import ToDoGateway from "./ToDoGateway";
import HttpClient from "../infra/HttpClient";

export default class ToDoHttpGateway implements ToDoGateway {
  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

  async getTodos(): Promise<any> {
    return await this.httpClient.get(`${this.baseUrl}/tasks`);
  }

  async addItem(data: any): Promise<any> {
    await this.httpClient.post(`${this.baseUrl}/tasks`, data);
  }

  async updateItem(id: number, status: boolean): Promise<any> {
    await this.httpClient.put(`${this.baseUrl}/tasks`, {
      id: id,
      status: status,
    });
  }

  async deleteItem(id: number): Promise<any> {
    await this.httpClient.delete(`${this.baseUrl}/tasks`, {
      data: {
        id: id,
      },
    });
  }
}

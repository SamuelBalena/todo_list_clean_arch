import ToDoHttpGateway from "../gateways/ToDoHttpGateway";
import AxiosAdapter from "../infra/AxiosAdapter";

const httpClient = new AxiosAdapter();
const todoGateway = new ToDoHttpGateway(httpClient, "http://localhost:3001");

export default class ToDoList {
  constructor(
    readonly listDataView: Array<any>,
    readonly submitValue: string
  ) {}

  async addTaskItemToList() {
    const data = {
      id: this.listDataView.length + 1,
      description: this.submitValue,
      status: false,
    };

    if (this.submitValue.length === 0) return;

    if (
      this.listDataView.some(
        (item: any) => item.description === this.submitValue
      )
    )
      return;

    try {
      await todoGateway.addItem(data);
    } catch (error) {
      console.error(error);
    }
  }

  async updateTaskItemToList(id: number, status: boolean) {
    try {
      await todoGateway.updateItem(id, status);
    } catch (error) {
      console.error(error);
    }
  }

  async removeTaskItemToList(id: number) {
    try {
      await todoGateway.deleteItem(id);
    } catch (error) {
      console.error(error);
    }
  }

  async getDataRequest() {
    try {
      const data = await todoGateway.getTodos();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

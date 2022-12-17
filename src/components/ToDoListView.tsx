import { useEffect, useState } from "react";
import ToDoList from "../entities/ToDoList";

interface ResponseGetDataProps {
  id: number;
  description: string;
  status: boolean;
}

export const ToDoListView = (): JSX.Element => {
  const [submitValue, setSubmitValue] = useState<string>("");
  const [listDataView, setListDataView] = useState<ResponseGetDataProps[]>([]);

  const toDoList = new ToDoList(listDataView, submitValue);

  async function handleShowDataRequestOnScreen() {
    const data = await toDoList.getDataRequest();
    setListDataView(data);
  }

  useEffect(() => {
    handleShowDataRequestOnScreen();
  }, [listDataView]);

  return (
    <main className="main">
      <div className="main_title">
        <h1>ToDo list</h1>
      </div>

      <div className="main_input_field card">
        <input
          type="text"
          placeholder="Digite aqui..."
          onChange={(e) => setSubmitValue(e.target.value)}
        />
        <button type="submit" onClick={() => toDoList.addTaskItemToList()}>
          Enviar
        </button>
      </div>

      <ul className="main_content">
        {listDataView.map((item) => (
          <li key={item.id} className="card">
            <p>{item.id}</p>
            <label>{item.description}</label>
            {item.status ? (
              <input type="checkbox" value={item.description} checked />
            ) : (
              <input type="checkbox" value={item.description} />
            )}
            <button
              type="submit"
              onClick={() => toDoList.removeTaskItemToList(item.id)}
            >
              Remover
            </button>
            <button
              type="submit"
              onClick={() =>
                toDoList.updateTaskItemToList(item.id, !item.status)
              }
            >
              Concluir
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

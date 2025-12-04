import { useEffect, useState } from "react";
import Tarefa from "../../../models/Tarefa";
import axios from "axios";

function ListarConcluidas(){
    const[tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        ListarConcluidasAPI();

    });

    async function ListarConcluidasAPI() {
        try {
            const resposta = await axios.get("http://localhost:5000/api/tarefas/concluidas")
            setTarefas(resposta.data);

        } catch (error) {
            console.log("Erro ao listar concluídas!" + error);
        }
        
    }

    return(
        <div>
            <div id="componente_listar_tarefas_concluidas">
      <h1>Tarefas Concluídas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Status</th>
            <th>Criado em</th>
            {/* <th>Editar</th> */}
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.status}</td>
              <td>{tarefa.criadoEm}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>

    );

}
export default ListarConcluidas;
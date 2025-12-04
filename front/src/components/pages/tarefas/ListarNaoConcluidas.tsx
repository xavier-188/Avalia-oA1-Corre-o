import { useEffect, useState } from "react";
import Tarefa from "../../../models/Tarefa";
import axios from "axios";

function ListarNaoConcluidas(){
    const[tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        ListarNaoConcluidasAPI();

    });

    async function ListarNaoConcluidasAPI() {
        try {
            const resposta = await axios.get("http://localhost:5000/api/tarefas/naoconcluidas")
            setTarefas(resposta.data);

        } catch (error) {
            console.log("Erro ao listar não concluídas!" + error);
        }
        
    }

    return(
        <div>
            <div id="componente_listar_tarefas_naoconcluidas">
      <h1>Tarefas Não Concluídas</h1>
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
export default ListarNaoConcluidas;
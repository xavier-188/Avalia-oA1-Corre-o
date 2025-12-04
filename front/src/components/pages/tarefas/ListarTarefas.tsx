import axios from "axios";
import { useEffect, useState } from "react";
import Tarefa from "../../../models/Tarefa";

function ListarTarefas(){
    const[tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() =>{
        listarTarefasApi();

    }, []);

    async function listarTarefasApi() {
        try {
            const resposta = await axios.get("http://localhost:5000/api/tarefas/listar");
            setTarefas(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log("Erro na requisição!" + error);
        }

    }

    function AlterarTarefa(id:string){
      alterarTarefaAPI(id);
    }
  

    async function alterarTarefaAPI(id: string) {
        try {
            const resposta = await axios.put(`http://localhost:5000/api/tarefas/alterar/${id}`)
            listarTarefasApi();
            
        } catch (error) {
            console.log(error);
        }
        
    }


    return(
        <div>
            <div id="componente_listar_tarefas">
      <h1>Listar Tarefas</h1>
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
              <td><button onClick={()=>AlterarTarefa(tarefa.tarefaId!)}>Alterar Status</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>

    );
}
export default ListarTarefas;
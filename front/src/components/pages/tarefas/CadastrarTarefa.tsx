import { useState } from "react";
import Tarefa from "../../../models/Tarefa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CadastrarTarefa(){
    const[titulo, setTitulo] = useState("");
    const navigate = useNavigate();

    function submeterTarefa(e: any){
        e.preventDefault();
        enviarTarefaApi();
        
    }

    async function enviarTarefaApi(){

        try {
            const tarefa: Tarefa = {
                titulo: titulo
            };
            const resposta = await axios.post("http://localhost:5000/api/tarefas/cadastrar", tarefa);
            navigate("/");
            
        } catch (error) {
            console.log("Erro ao cadastrar tarefa!" + error)
            
        }
        
    }

    return(
        <div>
            <h1>Cadastrar Tarefa</h1>
            <form onSubmit={submeterTarefa}>
                <div>
                    <label >Título:</label>
                    <input type="text" onChange={(e:any) => setTitulo(e.target.value)}/>
                </div>
                <button type="submit">Cadastrar Tarefa</button>
            </form>
        </div>
    )
}
export default CadastrarTarefa;
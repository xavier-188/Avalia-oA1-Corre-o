import React from 'react';
import ListarTarefas from './components/pages/tarefas/ListarTarefas';
import CadastrarTarefa from './components/pages/tarefas/CadastrarTarefa';
import ListarNaoConcluidas from './components/pages/tarefas/ListarNaoConcluidas';
import ListarConcluidas from './components/pages/tarefas/ListarConcluidas';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Lista de Tarefas</Link>
            </li>
            <li>
              <Link to={"/concluidas"}>Tarefas Concluídas</Link>
            </li>
            <li>
              <Link to={"/naoconcluidas"}>Tarefas Não Concluídas</Link>
            </li>
            <li>
              <Link to={"/cadastrar"}>Cadastrar Tarefa</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListarTarefas/>}/>
          <Route path="/concluidas" element={<ListarConcluidas/>}/>
          <Route path="/naoconcluidas" element={<ListarNaoConcluidas/>}/>
          <Route path="/cadastrar" element={<CadastrarTarefa/>}/>
        </Routes>

      </div>
      </BrowserRouter>
  );
}

export default App;

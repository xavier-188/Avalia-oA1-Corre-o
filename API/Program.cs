using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();

app.MapGet("/", () => "COLOQUE O SEU NOME");

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);

    if(tarefa.Status == "Não iniciada")
    {
        tarefa.Status = "Em andamento";
    }
    else if(tarefa.Status == "Em andamento")
    {
        tarefa.Status = "Concluída";
    }

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
    
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Tarefas.Where(x => x.Status != "Concluída"));
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Tarefas.Where(x => x.Status == "Concluída"));
});

app.Run();

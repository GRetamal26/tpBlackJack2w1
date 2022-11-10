using api.Data;
using Microsoft.EntityFrameworkCore;

 var builder = WebApplication.CreateBuilder(args);
 string connectionString = "Server=localhost;Database=blackjack;Uid=root;Pwd=Contraseñamysql1";
var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));
// dotnet ef dbcontext scaffold -f "Server=localhost;Database=blackjack;Uid=root;Pwd=Contraseñamysql1" Pomelo.EntityFrameworkCore.MySql -o Data
// Add services to the container.
builder.Services.AddDbContext<blackjackContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                // The following three options help with debugging, but should
                // be changed or removed for production.
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

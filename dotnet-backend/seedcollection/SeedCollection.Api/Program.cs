using SeedCollection.Services;
using SeedCollection.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// DA: Adding this
builder.Services.AddControllers();
builder.Services.AddHealthChecks();
builder.Services.AddScoped<IProductService, ProductService>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// DA: Add this to the basic generated version
app.MapControllers();
app.MapHealthChecks("/health");

app.UseHttpsRedirection();



app.Run();

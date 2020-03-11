using Microsoft.EntityFrameworkCore.Migrations;

namespace CaseNoroff.Data.Migrations
{
    public partial class computedTotalPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalPrice",
                table: "OrderItems",
                type: "decimal(18, 2)",
                nullable: false,
                computedColumnSql: "(CONVERT([decimal](18,2),[dbo].[getTotalPrice]([OrderItemId])))",
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalPrice",
                table: "OrderItems",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 2)",
                oldComputedColumnSql: "(CONVERT([decimal](18,2),[dbo].[getTotalPrice]([OrderItemId])))");
        }
    }
}

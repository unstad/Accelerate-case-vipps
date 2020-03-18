using CaseNoroff.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaseNoroff.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Size> Sizes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.Property(e => e.TotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasComputedColumnSql("(CONVERT([decimal](18,2),[dbo].[getTotalPrice]([OrderItemId])))");
            });

            modelBuilder.Entity<Customer>(entity => {
                entity.HasIndex(e => e.Email).IsUnique();
            });
        }
        
    }
}

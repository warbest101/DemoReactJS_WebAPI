using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DemoReactJS.Models
{
    public partial class EmployeeContext : DbContext
    {
        public EmployeeContext()
        {
        }

        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Nhanvien> Nhanvien { get; set; }
        public virtual DbSet<Thanhpho> Thanhpho { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-MD8NPQ2\\SQLEXPRESS; Database=Employee; Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Nhanvien>(entity =>
            {
                entity.HasKey(e => e.MaNv);

                entity.ToTable("NHANVIEN");

                entity.Property(e => e.MaNv).HasColumnName("MaNV");

                entity.Property(e => e.CanHo)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.GioiTinh)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.HoTen)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.ThanhPho)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Thanhpho>(entity =>
            {
                entity.HasKey(e => e.MaTp);

                entity.ToTable("THANHPHO");

                entity.Property(e => e.MaTp).HasColumnName("MaTP");

                entity.Property(e => e.TenTp)
                    .IsRequired()
                    .HasColumnName("TenTP")
                    .HasMaxLength(20);
            });
        }
    }
}

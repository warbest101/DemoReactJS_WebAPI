using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoReactJS.Models
{
    public class EmployeeDb
    {
        EmployeeContext db = new EmployeeContext();
        public IEnumerable<Nhanvien> GetAll()
        {
            List<Nhanvien> nv = new List<Nhanvien>();

            try
            {
                nv = db.Nhanvien.ToList();
                //return nv;
                return db.Nhanvien.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int Add(Nhanvien nv)
        {
            try
            {
                db.Nhanvien.Add(nv);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }


        public int Edit(Nhanvien nv)
        {
            try
            {
                db.Entry(nv).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }


        public int Delete(int id)
        {
            try
            {
                Nhanvien nv = db.Nhanvien.Find(id);
                db.Nhanvien.Remove(nv);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Nhanvien Details(int id)
        {
            try
            {
                Nhanvien nv = db.Nhanvien.Find(id);
                return nv;
            }
            catch
            {
                throw;
            }
        }

        public List<Thanhpho> GetThanhpho()
        {
            List<Thanhpho> lstThanhpho = new List<Thanhpho>();
            lstThanhpho = (from ThanhphoList in db.Thanhpho select ThanhphoList).ToList();
            return lstThanhpho;
        }
    }
}

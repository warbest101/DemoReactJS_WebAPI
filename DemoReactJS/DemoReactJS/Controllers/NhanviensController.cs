using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoReactJS.Models;

namespace DemoReactJS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanviensController : ControllerBase
    {
        private readonly EmployeeContext _context;
        EmployeeDb db = new EmployeeDb();

        public NhanviensController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/Nhanviens
        [HttpGet("[action]")]
        public IEnumerable<Nhanvien> GetAll()
        {
            return db.GetAll();
        }

        // GET: api/Nhanviens/5
        [HttpGet("[action]/{id}")]
        public Nhanvien Details(int id)
        {
            return db.Details(id);
        }

        // PUT: api/Nhanviens/5
        [HttpPut("[action]")]
        public int Edit(Nhanvien nv)
        {
            return db.Edit(nv);
        }

        // POST: api/Nhanviens
        [HttpPost("[action]")]
        public int Create(Nhanvien nv)
        {
            return db.Add(nv);
        }

        // DELETE: api/Nhanviens/5
        [HttpDelete("[action]/{id}")]
        public int Delete(int id)
        {
            return db.Delete(id);
        }

        private bool NhanvienExists(int id)
        {
            return _context.Nhanvien.Any(e => e.MaNv == id);
        }

        [HttpGet("[action]")]
        public IEnumerable<Thanhpho> GetThanhpho()
        {
            return db.GetThanhpho();
        }
    }
}

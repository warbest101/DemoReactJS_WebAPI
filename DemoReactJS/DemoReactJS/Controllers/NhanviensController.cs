using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DemoReactJS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanviensController : ControllerBase
    {
        static List<Employee> employees = new List<Employee>();
        static List<City> cities = new List<City>()
        {
            new City{Id = 1, Name = "Hồ Chí Minh" },
            new City{Id = 2, Name = "Đà Nẵng" },
            new City{Id = 3, Name = "Vũng Tàu" },
            new City{Id = 4, Name = "Hải Phòng" },
            new City{Id = 5, Name = "Hà Nội" }
        };
        // GET: api/Nhanviens
        [HttpGet("[action]")]
        public IEnumerable<Employee> GetAll()
        {
            return employees;
        }

        // GET: api/Nhanviens/5
        [HttpGet("[action]/{id}")]
        public Employee Details(int id)
        {
            return employees.SingleOrDefault(p => p.Id == id);
        }

        // PUT: api/Nhanviens
        [HttpPut("[action]/{id}")]
        public int Update([FromForm]Employee emp, int id)
        {
            var e = employees.SingleOrDefault(p => p.Id == id);
            if (e != null)
            {
                e.Name = emp.Name;
                e.Gender = emp.Gender;
                e.Apartment = emp.Apartment;
                e.City = emp.City;
            }
            return 1;
        }

        // POST: api/Nhanviens
        [HttpPost("[action]")]
        public int Create([FromForm]Employee emp)
        {
            if (!employees.Any())
            {
                emp.Id = 1;
            }
            else
            {
                var e = employees[employees.Count - 1];
                emp.Id = e.Id + 1;
            }         
            employees.Add(emp);
            return 1;
        }

        // DELETE: api/Nhanviens/5
        [HttpDelete("[action]/{id}")]
        public int Delete(int id)
        {
            var e = employees.SingleOrDefault(p => p.Id == id);
            employees.Remove(e);
            return 1;
        }

        [HttpGet("[action]")]
        public IEnumerable<City> GetCities()
        {
            return cities;
        }

        public partial class Employee
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Gender { get; set; }
            public string Apartment { get; set; }
            public string City { get; set; }
        }
        public partial class City
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }
    }
}

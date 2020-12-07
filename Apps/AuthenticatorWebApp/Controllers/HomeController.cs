using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticatorWebApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Index() => View("Index");
    }
}

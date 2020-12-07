// Generated Code
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using XTI_WebApp.Api;
using AuthenticatorWebApp.Api;
using XTI_App;
using XTI_App.Api;

namespace AuthenticatorWebApp.ApiControllers
{
    [Authorize]
    public class UserController : Controller
    {
        public UserController(AuthenticatorAppApi api, XtiPath xtiPath)
        {
            this.api = api;
            this.xtiPath = xtiPath;
        }

        private readonly AuthenticatorAppApi api;
        private readonly XtiPath xtiPath;
        public async Task<IActionResult> Index(UserStartRequest model)
        {
            var result = await api.Group("User").Action<UserStartRequest, AppActionViewResult>("Index").Execute(xtiPath.Modifier, model);
            return View(result.Data.ViewName);
        }
    }
}
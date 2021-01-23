using System;
using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
using XTI_App.Fakes;
using XTI_Core;
using XTI_WebApp.Api;

namespace AuthenticatorWebApp.Tests
{
    public static class FakeAppKey
    {
        public static readonly AppKey AppKey = new AppKey(new AppName("Fake"), AppType.Values.WebApp);
    }
    public sealed class FakeAppRoles
    {
        public static readonly FakeAppRoles Instance = new FakeAppRoles();

        public AppRoleName Admin { get; } = new AppRoleName(nameof(Admin));
        public AppRoleName Viewer { get; } = new AppRoleName(nameof(Viewer));
    }
    public sealed class FakeAppSetup
    {
        private readonly AppFactory appFactory;
        private readonly Clock clock;

        public FakeAppSetup(AppFactory appFactory, Clock clock)
        {
            this.appFactory = appFactory;
            this.clock = clock;
        }

        public App App { get; private set; }
        public AppVersion CurrentVersion { get; private set; }
        public AppUser User { get; private set; }

        public async Task Run()
        {
            var fakeTemplateFactory = new FakeAppApiFactory();
            var template = fakeTemplateFactory.CreateTemplate();
            var setup = new DefaultAppSetup
            (
                appFactory,
                clock,
                template,
                ""
            );
            await setup.Run();
            App = await appFactory.Apps().App(template.AppKey);
            CurrentVersion = await App.CurrentVersion();
            var modCategory = await App.ModCategory(new ModifierCategoryName("Department"));
            await modCategory.AddOrUpdateModifier(1, "IT");
            await modCategory.AddOrUpdateModifier(2, "HR");
            User = await appFactory.Users().Add
            (
                new AppUserName("xartogg"), new FakeHashedPassword("password"), clock.Now()
            );
        }
    }
    public sealed class FakeAppApiFactory : AppApiFactory
    {
        protected override IAppApi _Create(IAppApiUser user) => new FakeAppApi(FakeAppKey.AppKey, user);
    }
    public sealed class FakeAppApi : WebAppApiWrapper
    {

        public FakeAppApi(AppKey appKey, IAppApiUser user)
            : base
            (
                new AppApi
                (
                    appKey,
                    user,
                    ResourceAccess.AllowAuthenticated()
                        .WithAllowed(FakeAppRoles.Instance.Admin)
                )
            )
        {
            Home = new HomeGroup(source.AddGroup(nameof(Home), ResourceAccess.AllowAuthenticated()));
            Login = new LoginGroup(source.AddGroup(nameof(Login), ResourceAccess.AllowAnonymous()));
            Employee = new EmployeeGroup
            (
                source.AddGroup(nameof(Employee), new ModifierCategoryName("Department"))
            );
            Product = new ProductGroup
            (
                source.AddGroup(nameof(Product), Access.WithDenied(FakeAppRoles.Instance.Viewer))
            );
        }
        public HomeGroup Home { get; }
        public LoginGroup Login { get; }
        public EmployeeGroup Employee { get; }
        public ProductGroup Product { get; }
    }

    public sealed class LoginGroup : AppApiGroupWrapper
    {
        public LoginGroup(AppApiGroup source)
            : base(source)
        {
            var actions = new AppApiActionFactory(source);
            Authenticate = source.AddAction
            (
                actions.Action
                (
                    nameof(Authenticate),
                    () => new EmptyAppAction<EmptyRequest, EmptyActionResult>()
                )
            );
        }
        public AppApiAction<EmptyRequest, EmptyActionResult> Authenticate { get; }
    }

    public sealed class HomeGroup : AppApiGroupWrapper
    {
        public HomeGroup(AppApiGroup source)
            : base(source)
        {
            var actions = new AppApiActionFactory(source);
            DoSomething = source.AddAction
            (
                actions.Action
                (
                    nameof(DoSomething),
                    () => new EmptyAppAction<EmptyRequest, EmptyActionResult>()
                )
            );
        }
        public AppApiAction<EmptyRequest, EmptyActionResult> DoSomething { get; }
    }

    public sealed class EmployeeGroup : AppApiGroupWrapper
    {
        public EmployeeGroup(AppApiGroup source)
            : base(source)
        {
            var actions = new AppApiActionFactory(source);
            AddEmployee = source.AddAction
            (
                actions.Action
                (
                    nameof(AddEmployee),
                    () => new AddEmployeeValidation(),
                    () => new AddEmployeeAction()
                )
            );
            Employee = source.AddAction
            (
                actions.Action
                (
                    nameof(Employee),
                    () => new EmployeeAction(),
                    "Get Employee Information"
                )
            );
        }
        public AppApiAction<AddEmployeeModel, int> AddEmployee { get; }
        public AppApiAction<int, Employee> Employee { get; }
    }

    public sealed class AddEmployeeModel
    {
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
    }

    public sealed class AddEmployeeAction : AppAction<AddEmployeeModel, int>
    {
        public Task<int> Execute(AddEmployeeModel model)
        {
            return Task.FromResult(1);
        }
    }

    public sealed class AddEmployeeValidation : AppActionValidation<AddEmployeeModel>
    {
        public Task Validate(ErrorList errors, AddEmployeeModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                errors.Add("Name is required");
            }
            return Task.CompletedTask;
        }
    }

    public sealed class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
    }

    public sealed class EmployeeAction : AppAction<int, Employee>
    {
        public Task<Employee> Execute(int id)
        {
            return Task.FromResult(new Employee { ID = id, Name = "Someone", BirthDate = DateTime.Today });
        }
    }

    public sealed class ProductGroup : AppApiGroupWrapper
    {
        public ProductGroup(AppApiGroup source)
            : base(source)
        {
            var actions = new AppApiActionFactory(source);
            GetInfo = source.AddAction
            (
                actions.Action
                (
                    nameof(GetInfo),
                    () => new GetInfoAction()
                )
            );
            AddProduct = source.AddAction
            (
                actions.Action
                (
                    nameof(AddProduct),
                    () => new AddProductValidation(),
                    () => new AddProductAction()
                )
            );
            Product = source.AddAction
            (
                actions.Action
                (
                    nameof(Product),
                    () => new ProductAction(),
                    "Get Product Information"
                )
            );
        }
        public AppApiAction<EmptyRequest, string> GetInfo { get; }
        public AppApiAction<AddProductModel, int> AddProduct { get; }
        public AppApiAction<int, Product> Product { get; }
    }

    public sealed class GetInfoAction : AppAction<EmptyRequest, string>
    {
        public Task<string> Execute(EmptyRequest model)
        {
            return Task.FromResult("");
        }
    }

    public sealed class AddProductModel
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public sealed class AddProductAction : AppAction<AddProductModel, int>
    {
        public Task<int> Execute(AddProductModel model)
        {
            return Task.FromResult(1);
        }
    }

    public sealed class AddProductValidation : AppActionValidation<AddProductModel>
    {
        public Task Validate(ErrorList errors, AddProductModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                errors.Add("Name is required");
            }
            return Task.CompletedTask;
        }
    }

    public sealed class Product
    {
        public int ID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public sealed class ProductAction : AppAction<int, Product>
    {
        public Task<Product> Execute(int id)
        {
            return Task.FromResult(new Product { ID = id, Quantity = 2, Price = 23.42M });
        }
    }

}

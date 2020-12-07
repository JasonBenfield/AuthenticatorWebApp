using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using XTI_Configuration.Extensions;

namespace AuthenticatorWebApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration
                (
                    (hostingContext, config) => config.UseXtiConfiguration(hostingContext.HostingEnvironment, args)
                )
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

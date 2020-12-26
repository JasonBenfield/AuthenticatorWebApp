using AuthenticatorWebApp.Api;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using XTI_App;
using XTI_Core;

namespace AuthSetupConsoleApp
{
    sealed class AuthSetupService : IHostedService
    {
        private readonly IServiceScope scope;
        private readonly IHostApplicationLifetime lifetime;
        private readonly AppFactory appFactory;
        private readonly Clock clock;

        public AuthSetupService(IServiceProvider sp)
        {
            scope = sp.CreateScope();
            lifetime = scope.ServiceProvider.GetService<IHostApplicationLifetime>();
            appFactory = scope.ServiceProvider.GetService<AppFactory>();
            clock = scope.ServiceProvider.GetService<Clock>();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                await new AuthSetup(appFactory, clock).Run();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                Environment.ExitCode = 999;
            }
            lifetime.StopApplication();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}

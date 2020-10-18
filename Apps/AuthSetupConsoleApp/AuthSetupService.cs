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
        private readonly IHostApplicationLifetime lifetime;
        private readonly AppFactory appFactory;
        private readonly Clock clock;

        public AuthSetupService(IServiceProvider sp)
        {
            lifetime = sp.GetService<IHostApplicationLifetime>();
            appFactory = sp.GetService<AppFactory>();
            clock = sp.GetService<Clock>();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                await new AppSetup(appFactory).Run();
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

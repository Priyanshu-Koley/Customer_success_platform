namespace Promact.CustomerSuccess.Platform.Services.EmailService
{
    public interface IDataRepository
    {
        string GetEmailKey();
    }
    public class DataRepository : IDataRepository
    {
        public IConfiguration _config;
        public DataRepository(IConfiguration configuration)
        {
            _config = configuration;
        }

        public string GetEmailKey()
        {
            return _config.GetSection("Email:ServiceApiKey").Value;
        }
    }
}

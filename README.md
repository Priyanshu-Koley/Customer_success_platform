# Customer Success Platform

    ## Project Overview

        The Customer Success Platform automates the process of notifying stakeholders about updates or changes within the system. It enhances communication and transparency by promptly informing stakeholders whenever relevant updates occur.

    ## Technologies Used

        Backend: ASP.NET Core with ABP.IO framework
        Frontend: Angular
        Database: PostgreSQL
        ORM: Entity Framework Core
        Authentication: Auth0 with Microsoft login

    ## Setup Instructions
    
        ### 1. Clone Repository:

            ```
            git clone https://github.com/Priyanshu-Koley/Customer_success_platform.git
            ```

        ### 2. Backend Setup:

        i. Navigate to the backend directory[dotnet].
        ii. Update the connection string in appsettings.json to the PostgreSQL database[username and password].
        iii. Run migrations to create the database and schema:    
            ```
            dotnet ef database update
            ```
        iv. Start the backend server:
            ```
            dotnet run
            ```
        
        ### 3. Frontend Setup:

        i. Navigate to the frontend directory[angular].
        ii. Install dependencies:
            ```
            npm install
            ```
        iii. My backend was running on https://localhost:44347/ i.e. PORT = 44347. 
            If your backend is running on another port then change the PORT variable in 
            a. angular\src\app\services\projects.service.ts 
            b. angular\src\app\components\project-details\project-details.component.ts
        iv. Start the Angular development server:
            ```
            ng serve -o
            ```
        
        ### 4. Database Setup:

        i. Ensure PostgreSQL is installed and running.
        ii. Create a new database for the project.[Can also skip this step, then database will of the name given in the connection string will be created]

        
    ## Admin Credentials

       * Email Id: 
        ```
        admin@example.com
        ```
        * Password: 
        ```
        Admin@123
        ```

    ## Testing Steps

        1. Register a new user account or log in using Microsoft credentials.
        2. Explore the various sections of the Customer Success Platform.
        3. Create a user with desired role.
        4. Create a project with valid client email ID to test the email notification.
        4. Perform CRUD operations in the 15 sections.
        4. Test email notification system by updating Audit History table.
        5. Export project details as a document and verify the generated PDF.

    Third-Party Integrations
        
        Auth0: Used for user authentication and Microsoft login integration.
    

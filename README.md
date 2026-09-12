# Reactivities

Reactivities is a full-stack web application built with ASP.NET Core and React, with a strong focus on clean application architecture, Azure integration, and automated CI/CD.

The application combines a .NET backend, a TypeScript-based React frontend, real-time communication, and an Azure DevOps pipeline covering build, testing, code quality, security scanning, and deployment.

## Architecture

```text
                React / TypeScript
                        │
                        ▼
                ASP.NET Core API
                        │
               Application Layer
                        │
                Persistence / EF
                        │
                     Database
```

The backend follows a layered architecture separating API, application logic, domain entities, and persistence.

## Technology Stack

### Backend

* C# / .NET
* ASP.NET Core Web API
* Entity Framework Core
* MediatR
* AutoMapper
* ASP.NET Core Identity
* SignalR

### Frontend

* React
* TypeScript
* Vite
* Material UI
* React Router
* Axios

### Azure

* Azure App Service
* Azure SQL
* Azure Key Vault
* Managed Identity
* Application Insights

## DevOps & CI/CD

The project includes an automated **Azure DevOps CI/CD pipeline** covering the complete build and deployment lifecycle for both the .NET backend and React frontend.

```text
Push to main
      │
      ▼
Azure DevOps
      │
      ├── Frontend build
      ├── .NET restore & build
      ├── Unit tests
      ├── Coverlet code coverage
      ├── SonarCloud static analysis
      ├── WhiteSource dependency scanning
      ├── Artifact publishing
      │
      ▼
Azure App Service Deployment
```

The pipeline integrates:

* **Azure DevOps** – CI/CD orchestration
* **SonarCloud** – static code analysis and quality checks
* **Coverlet** – automated test coverage
* **WhiteSource** – open-source dependency and vulnerability scanning
* **Azure App Service** – application deployment

This provides automated validation from source-code changes through testing, quality and security checks to Azure deployment.

## Azure Integration

The application is deployed to Azure App Service with Azure SQL as its managed relational database.

Sensitive configuration is stored in **Azure Key Vault**, with **Managed Identity** used for secure access to Azure resources without application-managed credentials.

**Application Insights** provides application monitoring and availability visibility.

## Key Features

* Full-stack ASP.NET Core and React architecture
* REST API-based client/server communication
* Authentication and authorization with ASP.NET Core Identity
* Real-time communication with SignalR
* Entity Framework Core persistence
* Azure Key Vault and Managed Identity integration
* Application monitoring with Application Insights
* Automated Azure DevOps CI/CD
* Unit testing and code coverage
* Static code analysis
* Dependency and vulnerability scanning
* Automated Azure deployment

## Running Locally

### Prerequisites

* .NET SDK
* Node.js
* npm
* Git

Clone the repository:

```bash
git clone https://github.com/andormihaly/Reactivities.git
cd Reactivities
```

Restore and run the backend:

```bash
dotnet restore
dotnet run --project API
```

Install and run the frontend:

```bash
cd client
npm install
npm run dev
```

## Repository

GitHub: https://github.com/andormihaly/Reactivities

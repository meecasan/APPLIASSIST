# APPLIASSIST - Modular Monorepo Architecture

## 📦 Project Structure

The APPLIASSIST project has been reorganized into 3 independent, isolated modules plus a shared core:

```
APPLIASSIST/
│
├── 📦 store-management/          (Team 1)
│   ├── src/                      Frontend code
│   ├── server/                   Backend: Products, Stores, Orders
│   ├── package.json
│   └── MODULE_README.md
│
├── 📦 service-management/        (Team 2)
│   ├── src/                      Frontend code
│   ├── server/                   Backend: Services, Technicians, Requests
│   ├── package.json
│   └── MODULE_README.md
│
├── 📦 registration/              (Team 3)
│   ├── src/                      Frontend code
│   ├── server/                   Backend: Auth, Users, Account Setup
│   ├── package.json
│   └── MODULE_README.md
│
├── 📦 shared/                    (Infrastructure/All Teams)
│   ├── src/                      Shared UI components, layouts
│   ├── server/
│   │   ├── config/              Database configuration
│   │   ├── middleware/          Auth, validation middleware
│   │   ├── controllers/         Admin, notifications
│   │   ├── routes/              Admin, contact routes
│   │   ├── sql/                 Schema & seeds
│   │   └── scripts/             Database setup scripts
│   ├── package.json
│   └── MODULE_README.md
│
├── Main System Files (Root Level)
│   ├── pnpm-workspace.yaml       Workspace configuration
│   ├── index.html                Root entry point
│   ├── package.json              Root workspace config
│   ├── vite.config.ts            Shared Vite configuration (legacy)
│   ├── postcss.config.mjs        PostCSS configuration (legacy)
│   ├── PROJECT_STRUCTURE_INFO.md
│   └── README.md (this file)
│
└── 📁 guidelines/                Project guidelines
    └── Guidelines.md
```

## 🎯 Team Organization

### Store Management Team
**Module**: `store-management/`
- **Responsibilities**: Product management, inventory, orders, shop operations
- **Frontend**: All product/stock/order components
- **Backend**: Products, Stores, Orders controllers
- **Branch Strategy**: Feature branches from `store-management`

### Service Management Team
**Module**: `service-management/`
- **Responsibilities**: Services, bookings, technician management
- **Frontend**: Service, technician, booking components
- **Backend**: Services, Service Requests, Technician controllers
- **Branch Strategy**: Feature branches from `service-management`

### Registration & Auth Team
**Module**: `registration/`
- **Responsibilities**: User registration, authentication, business setup
- **Frontend**: Login, signup, profile components
- **Backend**: Auth, Users controllers
- **Branch Strategy**: Feature branches from `registration`

### Infrastructure Team
**Module**: `shared/`
- **Responsibilities**: Database, middleware, shared components
- **Scope**: Config, middleware, shared UI, database schema
- **Coordination**: Must coordinate with all teams for schema changes
- **Branch Strategy**: Feature branches from `shared`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (package manager)
- MySQL database

### Setup Root Workspace
```bash
# Navigate to project root
cd APPLIASSIST

# Install all dependencies
pnpm install

# This installs dependencies for all modules at once
```

### Setup Individual Module
```bash
# Navigate to your assigned module
cd store-management    # or service-management, registration, shared

# Install module dependencies
pnpm install

# Start development
pnpm run dev

# Build for production
pnpm run build
```

### Setup Backend (Shared Module)
```bash
cd shared

# Install dependencies
pnpm install

# Setup database
mysql -u root -p databasename < server/sql/schema.sql

# Start development server
pnpm run server:dev

# Seed sample data
pnpm run seed
```

## 📋 Development Workflow

### 1. Feature Development
```bash
# 1. Pull latest from main module
git checkout store-management
git pull origin store-management

# 2. Create feature branch
git checkout -b feature/add-product-filter

# 3. Make changes in your module only
# 4. Commit changes
git add .
git commit -m "feat: add product filter to products page"

# 5. Push to your branch
git push origin feature/add-product-filter

# 6. Create Pull Request targeting your module's main branch
```

### 2. Module Isolation Rules
✅ **DO**:
- Make all changes within your module directory
- Import from `shared/` for common functionality
- Use module-specific API endpoints

❌ **DON'T**:
- Import from other modules (use shared instead)
- Modify files in other modules
- Make direct database changes without coordination

### 3. Shared Module Changes
When modifying `shared/`:
1. Notify all teams
2. Create comprehensive pull request
3. Request review from representatives of each module
4. Test thoroughly across all modules
5. Document changes

## 🔄 Monorepo Commands

### Install All Dependencies
```bash
pnpm install
```

### Development

**Start all modules (if supported)**:
```bash
pnpm run dev
```

**Start specific module**:
```bash
cd store-management
pnpm run dev
```

### Building

**Build specific module**:
```bash
cd store-management
pnpm run build
```

### Database Operations (Shared Module)
```bash
cd shared

# Run seeds
pnpm run seed

# Seed demo users
pnpm run seed:demo

# Seed admin user
pnpm run seed:admin

# Start server
pnpm run server:dev
```

## 📊 File Organization Details

### Frontend (src/)
```
src/
├── app/
│   ├── components/          (Module-specific components)
│   ├── config/             (Module configuration)
│   ├── hooks/              (Custom React hooks)
│   ├── services/           (API client services)
│   ├── App.tsx             (Main app component)
│   └── main.tsx            (Entry point)
├── styles/
│   ├── globals.css
│   ├── index.css
│   └── default_theme.css
└── vite-env.d.ts           (TypeScript declarations)
```

### Backend (server/)
```
server/
├── config/
│   └── db.js               (Database connection - SHARED)
├── middleware/
│   ├── authMiddleware.js   (JWT verification - SHARED)
│   ├── roleMiddleware.js   (Role checking - SHARED)
│   ├── upload.js           (File uploads - SHARED)
│   └── validate.js         (Request validation - SHARED)
├── controllers/            (Module-specific business logic)
│   ├── productsController.js
│   └── ...
├── routes/                 (Module-specific endpoints)
│   ├── productsRoutes.js
│   └── ...
├── validation/             (Input validation schemas)
│   ├── productSchemas.js
│   └── ...
├── sql/                    (Database schema - SHARED)
│   ├── schema.sql
│   └── seed.sql
├── scripts/                (Setup scripts - SHARED)
├── server.js              (Express server - SHARED)
├── realtime.js            (WebSocket setup - SHARED)
└── seed.js                (Database seeding - SHARED)
```

## 🔐 Git Strategy

### Branch Naming
- `store-management` - Main branch for Store team
- `service-management` - Main branch for Service team
- `registration` - Main branch for Registration team
- `shared` - Main branch for Infrastructure team
- `feature/*` - Feature branches (from module branch)
- `bugfix/*` - Bug fixes (from module branch)

### Commit Message Format
```
<type>(<scope>): <subject>

feat(products): add product filter functionality
fix(cart): resolve cart total calculation
docs(module): update README
style(components): format product card
refactor(services): simplify API calls
test(auth): add login tests
```

### Pull Request Process
1. Create PR from your feature branch
2. Target the corresponding module branch
3. Add description of changes
4. Request review from team members
5. Address review comments
6. Merge when approved

## 🧪 Testing

Each module has its own testing scope:
```bash
# Test specific module (when test setup is ready)
cd store-management
pnpm test
```

## 📝 Module-Specific Documentation

For detailed information about each module, see:
- [Store Management](store-management/MODULE_README.md)
- [Service Management](service-management/MODULE_README.md)
- [Registration & Auth](registration/MODULE_README.md)
- [Shared Core](shared/MODULE_README.md)

## 🤝 Contributing Guidelines

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd APPLIASSIST
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Navigate to your module**
   ```bash
   cd store-management  # or your assigned module
   ```

4. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

5. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: describe your change"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature
   ```

## 📞 Communication

- **Shared Module Changes**: Create issue and notify all teams
- **Cross-Module Dependencies**: Discuss in team meetings
- **Database Schema Changes**: Coordinate with infrastructure team
- **API Changes**: Document and communicate to affected teams

## ⚠️ Important Notes

1. **Module Isolation**: Each module should be independently deployable
2. **Shared Code**: Use `shared/` for cross-module functionality
3. **Database**: Single shared database with module-specific tables/views
4. **Dependencies**: Keep dependencies minimal and consistent across modules
5. **Naming**: Use clear, consistent naming conventions within your module

## 🐛 Troubleshooting

### Module installation fails
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Database connection error
- Check `.env` file in shared module
- Verify MySQL is running
- Confirm database exists

### Build errors
```bash
# Clear build cache
rm -rf dist
pnpm run build
```

## 📚 Additional Resources

- [APPLIASSIST Guidelines](guidelines/Guidelines.md)
- [Database Schema](shared/server/sql/schema.sql)
- [API Documentation](shared/server/postman_collection.json)

## 📄 License

See root-level LICENSE file

---

**Last Updated**: May 2026
**Structure Version**: 2.0 (Modular Monorepo)

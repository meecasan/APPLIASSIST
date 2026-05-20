# Quick Start Guide for APPLIASSIST Modular Structure

## What Changed?

The APPLIASSIST project has been reorganized into **3 independent modules** + **1 shared core**:

1. **store-management/** - Product & inventory management
2. **service-management/** - Services & technician management  
3. **registration/** - User registration & authentication
4. **shared/** - Database, middleware, and shared components

## 🚀 First Time Setup

### 1. Clone & Install
```bash
git clone <repo-url>
cd APPLIASSIST
pnpm install
```

### 2. Find Your Module
Ask your team lead which module you're assigned to:
- Store Management
- Service Management
- Registration & Auth
- Infrastructure (Shared)

### 3. Navigate to Your Module
```bash
cd store-management    # Replace with your module
```

### 4. Setup Backend (Shared Module Only)
If working with backend, set up the shared module:
```bash
cd shared

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# Then setup database
mysql -u root -p appliassist < server/sql/schema.sql

# Seed initial data
pnpm run seed
```

### 5. Start Development
```bash
# Start your module's frontend
pnpm run dev

# OR start backend (from shared/)
pnpm run server:dev
```

## 📦 Module Responsibilities

### Store Management Team
- File upload from: `store-management/`
- Components: Products, Stocks, Orders
- Controllers: Products, Stores, Orders
- **Don't touch**: Other modules

### Service Management Team
- File upload from: `service-management/`
- Components: Services, Technicians, Bookings
- Controllers: Services, Technicians, Requests
- **Don't touch**: Other modules

### Registration Team
- File upload from: `registration/`
- Components: Login, Signup, Profiles
- Controllers: Auth, Users
- **Don't touch**: Other modules

### Infrastructure Team
- File upload from: `shared/`
- Database setup and migrations
- Authentication middleware
- Coordinate with all teams
- **Notify all teams** before schema changes

## 📝 Daily Workflow

### 1. Start Your Day
```bash
cd APPLIASSIST
cd <your-module>
pnpm install  # Update dependencies if needed
git pull origin <your-module>  # Get latest changes
```

### 2. Create Feature Branch
```bash
git checkout -b feature/add-product-search
# OR
git checkout -b bugfix/fix-cart-total
```

### 3. Make Changes
- Only edit files within your module folder
- Don't import from other modules (use shared instead)

### 4. Commit & Push
```bash
git add .
git commit -m "feat: add product search functionality"
git push origin feature/add-product-search
```

### 5. Create Pull Request
- Push to your feature branch
- Create PR targeting **your module's main branch**
- Example: PR from `feature/add-product-search` → `store-management`
- Request review from your team

## ⚠️ Important Rules

### ✅ DO
- Work only in your assigned module
- Import from `shared/` for common functionality
- Coordinate shared changes with all teams
- Update module documentation
- Test your changes

### ❌ DON'T
- Import from other modules (breaking isolation)
- Modify other teams' files
- Change database schema without coordination
- Share secrets in .env files
- Commit node_modules or dist/

## 🔗 File Structure Reference

```
Your Module/
├── src/
│   ├── app/
│   │   ├── components/     ← Your React components
│   │   ├── services/       ← Your API calls
│   │   ├── config/         ← Your settings
│   │   └── hooks/          ← Your custom hooks
│   ├── styles/             ← Module styles
│   └── main.tsx
├── server/
│   ├── controllers/        ← Your business logic
│   ├── routes/             ← Your API endpoints
│   ├── validation/         ← Input validation
│   └── (other shared files in shared/)
├── package.json
├── vite.config.ts
└── MODULE_README.md        ← Detailed module docs
```

## 🆘 Common Questions

### Q: I need to use something from another module?
**A**: Check if it's in `shared/`. If not, discuss with the infrastructure team about moving it to shared.

### Q: How do I work with the database?
**A**: All database setup is in `shared/server/sql/`. Contact infrastructure team for schema changes.

### Q: What if I need to change authentication?
**A**: That's in `shared/server/middleware/`. Notify all teams before making changes.

### Q: Can I use components from another module?
**A**: Move them to `shared/src/app/components/` first, then import from there.

### Q: My branch is out of date
```bash
git fetch origin
git rebase origin/<your-module>
# OR
git merge origin/<your-module>
```

## 📚 Detailed Documentation

For more details, see:
- `MODULAR_STRUCTURE_README.md` - Full architecture guide
- `<your-module>/MODULE_README.md` - Your module's specific guide
- `guidelines/Guidelines.md` - Project guidelines

## 🎓 Learning Resources

### Understanding the Structure
1. Read `MODULAR_STRUCTURE_README.md`
2. Review your module's `MODULE_README.md`
3. Check the guidelines in `guidelines/Guidelines.md`

### Understanding Your Module
1. Check the `src/app/components/` directory
2. Review `server/controllers/` and `server/routes/`
3. Look at API calls in `src/app/services/`

### Understanding Shared Components
1. Review `shared/server/middleware/authMiddleware.js`
2. Check `shared/server/config/db.js`
3. Read `shared/MODULE_README.md`

## 💡 Tips for Success

1. **Keep modules focused**: All your code should be in your module
2. **Use shared wisely**: Only move to shared when needed by multiple modules
3. **Communicate**: Tell other teams about changes that might affect them
4. **Test thoroughly**: Test your changes before pushing
5. **Document**: Update README when adding features
6. **Atomic commits**: Keep commits small and focused

## 🔗 Useful Commands

```bash
# Navigate to module
cd store-management

# Install dependencies
pnpm install

# Start development
pnpm run dev

# Build for production
pnpm run build

# Start backend server (shared only)
pnpm run server:dev

# View git status
git status

# See your commits
git log --oneline

# Create and switch to branch
git checkout -b feature/my-feature

# Switch between branches
git checkout main
git checkout store-management
```

## 📞 Getting Help

1. **Technical Questions**: Ask your team lead
2. **Module Questions**: Check the MODULE_README.md
3. **Architecture Questions**: See MODULAR_STRUCTURE_README.md
4. **Setup Issues**: Check the root README.md

---

**Good luck! Welcome to APPLIASSIST development!** 🚀

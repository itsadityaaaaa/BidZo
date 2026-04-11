# Shared Folder

The `shared` folder contains utilities, types, and constants that are used by both the client and server applications.

## 📁 Structure

```
/shared
  ├── /types        → TypeScript interfaces and types
  ├── /utils        → Reusable utility functions
  ├── /constants    → Shared constants and configuration
  └── README.md
```

## 🚀 Usage

### In Client
```javascript
import { validateEmail } from '../../shared/utils/validators.js';
```

### In Server
```javascript
const { API_ENDPOINTS } = require('../../shared/constants/index.js');
```

## ⚙️ Future Enhancements

- [ ] Set up a shared package.json for dependencies
- [ ] Add authentication utilities
- [ ] Create middleware helpers
- [ ] Add testing utilities
- [ ] Create API client library
- [ ] Add data validation schemas

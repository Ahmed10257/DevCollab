# Assets Management System - Complete Documentation

## 📋 Overview

The Assets Management System is a comprehensive solution for tracking and managing organizational assets with support for multiple asset categories and detailed specifications.

## 🗄️ Database Structure

### Core Tables

#### 1. **categories**
Stores asset categories (e.g., Networking, Computers, Printers)
```sql
- id (serial, PK)
- name (varchar, unique)
- description (varchar)
- created_at, updated_at (timestamps)
```

#### 2. **types**
Stores asset types within categories
```sql
- id (serial, PK)
- name (varchar)
- category_id (FK → categories.id, CASCADE)
- description (varchar)
- created_at, updated_at (timestamps)
```

#### 3. **assets**
Main assets table with common attributes
```sql
- id (serial, PK)
- name (varchar, NOT NULL)
- category_id (FK → categories.id, RESTRICT)
- type_id (FK → types.id, RESTRICT)
- serial_number (varchar, UNIQUE, NOT NULL)
- model (varchar)
- brand (varchar)
- location_id (FK → rooms.id, SET NULL)
- status (varchar, default: 'Available')
- purchase_date (date)
- warranty_expiry (date)
- responsible_user_id (FK → users.id, SET NULL)
- assigned_user_id (FK → users.id, SET NULL)
- notes (varchar 1000)
- created_at, updated_at (timestamps)
```

**Status Options:**
- `Available` - Asset is ready to use
- `In Use` - Asset is currently assigned
- `Under Maintenance` - Asset is being serviced
- `Retired` - Asset is no longer in use

#### 4. **networking_devices**
Category-specific table for networking equipment
```sql
- id (serial, PK)
- asset_id (FK → assets.id, CASCADE, UNIQUE)
- ip_address (varchar)
- mac_address (varchar)
- ports (integer)
- management_interface (varchar)
- firmware_version (varchar)
- created_at, updated_at (timestamps)
```

#### 5. **computers**
Category-specific table for computers (desktops & laptops)
```sql
- id (serial, PK)
- asset_id (FK → assets.id, CASCADE, UNIQUE)
- device_type (varchar: 'Desktop' or 'Laptop')
- cpu (varchar)
- ram (varchar)
- storage (varchar)
- storage_type (varchar: 'SSD', 'HDD', 'NVMe')
- gpu (varchar)
- has_monitor (boolean)
- monitor_details (varchar)
- operating_system (varchar)
- created_at, updated_at (timestamps)
```

## 🔌 API Endpoints

### Categories
- `GET    /categories` - Get all categories
- `GET    /categories/:id` - Get category by ID
- `POST   /categories` - Create new category
- `PATCH  /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Types
- `GET    /types` - Get all types
- `GET    /types?categoryId=1` - Get types by category
- `GET    /types/:id` - Get type by ID
- `POST   /types` - Create new type
- `PATCH  /types/:id` - Update type
- `DELETE /types/:id` - Delete type

### Assets
- `GET    /assets` - Get all assets (with optional filters)
- `GET    /assets?categoryId=1` - Filter by category
- `GET    /assets?typeId=1` - Filter by type
- `GET    /assets?locationId=1` - Filter by location (room)
- `GET    /assets?status=Available` - Filter by status
- `GET    /assets?assignedUserId=1` - Filter by assigned user
- `GET    /assets?responsibleUserId=1` - Filter by responsible user
- `GET    /assets?searchTerm=cisco` - Search by name, serial, brand, model
- `GET    /assets/:id` - Get asset by ID
- `POST   /assets` - Create new asset
- `PATCH  /assets/:id` - Update asset
- `DELETE /assets/:id` - Delete asset

**Multiple Filters Example:**
```
GET /assets?categoryId=1&status=In Use&searchTerm=laptop
```

## 📦 Initial Seed Data

### Categories & Types
Run: `npm run seed:categories`

**Categories (5):**
1. **Networking** → Switches, Access Points, Routers, NVRs
2. **Printers** → Printer, Scanner, Copier
3. **Computers** → Desktops, Laptops
4. **Projectors** → Interactive, Long Throw
5. **Cameras** → Internal, External

**Total Types: 13**

### Sample Assets
Run: `npm run seed:assets`

**Networking Assets (4):**
- 2x Switches (Cisco, HP Aruba)
- 1x Router (Cisco ISR 4331)
- 1x Access Point (Ubiquiti UniFi)

**Computer Assets (6):**
- 2x Desktops (Dell OptiPlex, HP EliteDesk)
- 4x Laptops (Dell Latitude, Lenovo ThinkPad, HP ProBook)

**Total Assets: 10**

## 🚀 Setup Instructions

### 1. Database Migration
The tables have already been created via migration. If you need to recreate:
```bash
cd back-end
npx drizzle-kit generate
npx drizzle-kit push
```

### 2. Seed Categories & Types
**⚠️ Run this FIRST (only once):**
```bash
npm run seed:categories
```

Expected output:
```
🌱 Starting categories and types seeding...
📁 Inserting categories...
✅ Inserted 5 categories
🏷️  Inserting types...
✅ Inserted 13 types
```

### 3. Seed Sample Assets
**Run this AFTER seeding categories:**
```bash
npm run seed:assets
```

Expected output:
```
🌱 Starting assets seeding...
Found: 5 categories, 13 types, 10 users, 84 rooms
🔌 Inserting networking assets...
✅ Inserted 4 networking assets
💻 Inserting computer assets...
✅ Inserted 6 computer assets
```

### 4. Start Backend
```bash
npm run start:dev
```

## 📝 Usage Examples

### Create a New Asset (via API)
```json
POST /assets
{
  "name": "Cisco Catalyst Switch",
  "categoryId": 1,
  "typeId": 1,
  "serialNumber": "SW-CISCO-001",
  "brand": "Cisco",
  "model": "Catalyst 2960",
  "locationId": 10,
  "status": "Available",
  "purchaseDate": "2024-01-15",
  "warrantyExpiry": "2027-01-15",
  "responsibleUserId": 1,
  "notes": "48-port gigabit switch"
}
```

### Get All Available Laptops
```
GET /assets?categoryId=3&typeId=9&status=Available
```

### Search for Dell Equipment
```
GET /assets?searchTerm=dell
```

### Update Asset Status
```json
PATCH /assets/5
{
  "status": "In Use",
  "assignedUserId": 3
}
```

## 🏗️ Architecture

### Design Decisions

**1. Manufacturer & Model in Main Assets Table**
✅ Placed in `assets` table because:
- Common to ALL asset types
- Frequently used for filtering/searching
- Avoids duplication across category tables

**2. Category-Specific Tables**
✅ Separate tables (networking_devices, computers) for:
- Type-specific attributes (e.g., CPU, RAM for computers)
- Clean data structure
- Easy to extend with new categories
- Uses CASCADE delete (removing asset removes specific data)

**3. Location as Room ID**
✅ `location_id` references `rooms` table:
- Hierarchical location (Branch → Building → Floor → Room)
- Consistent with existing location system
- SET NULL on delete (preserve asset if room deleted)

**4. Dual User References**
✅ Two user fields:
- `responsible_user_id` - Who manages the asset
- `assigned_user_id` - Who uses the asset
- Both SET NULL (preserve asset if user deleted)

## 🔐 Constraints & Validations

- **Serial Number**: UNIQUE constraint (prevents duplicates)
- **Category/Type**: RESTRICT on delete (can't delete if assets exist)
- **Location/Users**: SET NULL on delete (asset preserved)
- **Asset ↔ Specific Tables**: CASCADE delete (both deleted together)
- **Status**: Validated at application level (Available, In Use, Under Maintenance, Retired)

## 📂 File Structure

```
back-end/src/
├── drizzle/schema/
│   ├── category.schema.ts
│   ├── type.schema.ts
│   ├── asset.schema.ts
│   ├── networking-device.schema.ts
│   ├── computer.schema.ts
│   └── schema.ts (exports all)
├── repositories/
│   ├── category.repository.ts
│   ├── type.repository.ts
│   └── asset.repository.ts
├── category/
│   ├── category.controller.ts
│   ├── category.service.ts
│   ├── category.module.ts
│   └── dto/
│       ├── create-category.dto.ts
│       └── update-category.dto.ts
├── type/
│   ├── type.controller.ts
│   ├── type.service.ts
│   ├── type.module.ts
│   └── dto/
│       ├── create-type.dto.ts
│       └── update-type.dto.ts
├── asset/
│   ├── asset.controller.ts
│   ├── asset.service.ts
│   ├── asset.module.ts
│   └── dto/
│       ├── create-asset.dto.ts
│       └── update-asset.dto.ts
├── seed-categories-types.ts
└── seed-assets.ts
```

## ➕ Adding New Categories

### Option 1: Via Seed File (Initial Setup)
1. Edit `src/seed-categories-types.ts`
2. Add new category and types
3. Clear database and re-run seed

### Option 2: Via API (Recommended)
```json
POST /categories
{
  "name": "Servers",
  "description": "Server equipment"
}

POST /types
{
  "name": "Rack Server",
  "categoryId": 6,
  "description": "Rackmount servers"
}
```

### Option 3: Create New Category-Specific Table
1. Create schema file (e.g., `server.schema.ts`)
2. Add specific attributes for servers
3. Reference `asset_id` as FK
4. Generate and push migration
5. Export from `schema.ts`

## ⚠️ Important Notes

1. **Seeding Order**: Always run `seed:categories` before `seed:assets`
2. **Serial Numbers**: Must be unique across all assets
3. **Don't Re-run Seeds**: Running seeds multiple times will cause errors
4. **Category Deletion**: Can't delete categories with existing assets (RESTRICT)
5. **Asset Deletion**: Auto-deletes from category tables (CASCADE)

## 🧪 Testing API Endpoints

### Using cURL
```bash
# Get all categories
curl http://localhost:3000/categories

# Get networking types
curl http://localhost:3000/types?categoryId=1

# Get available computers
curl "http://localhost:3000/assets?categoryId=3&status=Available"

# Create asset
curl -X POST http://localhost:3000/assets \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Laptop","categoryId":3,"typeId":9,"serialNumber":"TEST-001"}'
```

### Using Postman
Import the provided Postman collection (if available) or manually create requests for each endpoint.

## 📊 Migration Files
- `0005_adorable_wild_pack.sql` - Categories & Types tables
- `0006_known_scream.sql` - Assets & category-specific tables

## 🎯 Next Steps

1. ✅ **Database & Endpoints**: Complete
2. 🔄 **Frontend Integration**: Connect Angular components to use these APIs
3. 📋 **Asset Forms**: Create forms for adding/editing assets with category-specific fields
4. 🔍 **Advanced Search**: Implement full-text search across assets
5. 📈 **Reports**: Add asset reports (by category, status, location)
6. 📱 **QR Codes**: Generate QR codes for asset tracking
7. 📧 **Notifications**: Warranty expiry alerts
8. 📜 **Audit Log**: Track asset history and changes

## 🆘 Troubleshooting

**Error: "Category not found"**
- Run `npm run seed:categories` first

**Error: "Duplicate serial number"**
- Serial numbers must be unique across all assets

**Error: "Cannot delete category"**
- Delete all assets in that category first, or change their category

**Seed script fails**
- Check if categories/types already exist
- Verify database connection in `.env`
- Check if users and rooms exist in database

---

Created with ❤️ for DevCollab Asset Management

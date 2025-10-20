"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_postgres_1 = require("drizzle-orm/node-postgres");
var pg_1 = require("pg");
var dotenv = require("dotenv");
var schema = require("../src/drizzle/schema/schema");
// Load environment variables
dotenv.config();
var pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
var db = (0, node_postgres_1.drizzle)(pool, { schema: schema });
function seedIpPhones() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, types, manufacturers, branches, buildings, users, ipPhonesCategory, deskPhoneType, conferencePhoneType, ciscoManufacturer, mainBranch, mainBuilding, i, phoneAsset, conferenceAsset, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 14, , 15]);
                    console.log('🌱 Starting IP phones seeding...\n');
                    return [4 /*yield*/, db.query.categories.findMany()];
                case 1:
                    categories = _c.sent();
                    return [4 /*yield*/, db.query.types.findMany()];
                case 2:
                    types = _c.sent();
                    return [4 /*yield*/, db.query.manufacturers.findMany()];
                case 3:
                    manufacturers = _c.sent();
                    return [4 /*yield*/, db.query.branches.findMany()];
                case 4:
                    branches = _c.sent();
                    return [4 /*yield*/, db.query.buildings.findMany()];
                case 5:
                    buildings = _c.sent();
                    return [4 /*yield*/, db.query.users.findMany()];
                case 6:
                    users = _c.sent();
                    ipPhonesCategory = categories.find(function (c) { return c.name === 'IP Phones'; });
                    if (!ipPhonesCategory) {
                        console.log('❌ IP Phones category not found');
                        process.exit(1);
                    }
                    deskPhoneType = types.find(function (t) { return t.name === 'Desk Phone'; });
                    conferencePhoneType = types.find(function (t) { return t.name === 'Conference Phone'; });
                    ciscoManufacturer = manufacturers.find(function (m) { return m.name === 'Cisco'; });
                    mainBranch = branches[0];
                    mainBuilding = buildings[0];
                    // Create sample IP phone assets
                    console.log('📦 Creating IP phone assets...');
                    i = 1;
                    _c.label = 7;
                case 7:
                    if (!(i <= 5)) return [3 /*break*/, 11];
                    return [4 /*yield*/, db
                            .insert(schema.assets)
                            .values({
                            name: "Cisco IP Desk Phone 0".concat(i),
                            categoryId: ipPhonesCategory.id,
                            typeId: deskPhoneType.id,
                            serialNumber: "PHONE-DESK-00".concat(i),
                            manufacturerId: ciscoManufacturer === null || ciscoManufacturer === void 0 ? void 0 : ciscoManufacturer.id,
                            branchId: mainBranch === null || mainBranch === void 0 ? void 0 : mainBranch.id,
                            buildingId: mainBuilding === null || mainBuilding === void 0 ? void 0 : mainBuilding.id,
                            status: 'In Use',
                            purchaseDate: '2022-11-10',
                            warrantyExpiry: '2025-11-10',
                            responsibleUserId: (_a = users[0]) === null || _a === void 0 ? void 0 : _a.id,
                        })
                            .returning()];
                case 8:
                    phoneAsset = _c.sent();
                    return [4 /*yield*/, db.insert(schema.ipPhones).values({
                            assetId: phoneAsset[0].id,
                            phoneType: 'Desk Phone',
                            phoneSystem: 'Cisco Unified Communications',
                            lines: 3,
                            displayType: 'Color LCD',
                            screenSize: '3.5 inch',
                            speakers: 1,
                            microphones: 1,
                            hasVideoSupport: false,
                            codec: 'G.711, G.729, G.722',
                            powerSupply: 'PoE',
                            ipAddress: "192.168.1.15".concat(i),
                            extensionNumber: "200".concat(i),
                            registrationStatus: 'Registered',
                        })];
                case 9:
                    _c.sent();
                    _c.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 7];
                case 11: return [4 /*yield*/, db
                        .insert(schema.assets)
                        .values({
                        name: 'Cisco IP Conference Phone',
                        categoryId: ipPhonesCategory.id,
                        typeId: conferencePhoneType.id,
                        serialNumber: 'PHONE-CONF-001',
                        manufacturerId: ciscoManufacturer === null || ciscoManufacturer === void 0 ? void 0 : ciscoManufacturer.id,
                        branchId: mainBranch === null || mainBranch === void 0 ? void 0 : mainBranch.id,
                        buildingId: mainBuilding === null || mainBuilding === void 0 ? void 0 : mainBuilding.id,
                        status: 'In Use',
                        purchaseDate: '2022-12-01',
                        warrantyExpiry: '2025-12-01',
                        responsibleUserId: (_b = users[0]) === null || _b === void 0 ? void 0 : _b.id,
                    })
                        .returning()];
                case 12:
                    conferenceAsset = _c.sent();
                    return [4 /*yield*/, db.insert(schema.ipPhones).values({
                            assetId: conferenceAsset[0].id,
                            phoneType: 'Conference Phone',
                            phoneSystem: 'Cisco Unified Communications',
                            lines: 6,
                            displayType: 'LED',
                            screenSize: '7 inch',
                            speakers: 4,
                            microphones: 6,
                            hasVideoSupport: true,
                            codec: 'G.711, G.729, G.722, Opus',
                            powerSupply: 'PoE',
                            ipAddress: '192.168.1.160',
                            extensionNumber: '3000',
                            registrationStatus: 'Registered',
                        })];
                case 13:
                    _c.sent();
                    console.log("\u2705 Created 6 IP phone assets and details\n");
                    console.log('✨ IP phones seeding completed successfully!\n');
                    return [3 /*break*/, 15];
                case 14:
                    error_1 = _c.sent();
                    console.error('❌ Error seeding IP phones:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
seedIpPhones().finally(function () { return pool.end(); });

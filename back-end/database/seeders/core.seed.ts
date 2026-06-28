import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import type { SeedContext } from '../connection';
import { insertReturning } from '../helpers';

export async function seedCore({ db, schema }: SeedContext) {
    console.log('🌱 Starting database seeding...\n');

    try {
        // 1. Seed Priority
        console.log('📌 Seeding priorities...');
        const priorities = await insertReturning(db, schema.priority, [
            { name: 'Low' },
            { name: 'Medium' },
            { name: 'High' },
            { name: 'Critical' },
        ]);
        console.log(`✅ Created ${priorities.length} priorities\n`);

        // 2. Seed Status
        console.log('📊 Seeding statuses...');
        const statuses = await insertReturning(db, schema.status, [
            { name: 'Backlog' },
            { name: 'In Progress' },
            { name: 'In Review' },
            { name: 'Completed' },
            { name: 'Cancelled' },
        ]);
        console.log(`✅ Created ${statuses.length} statuses\n`);

        // 3. Seed Branches
        console.log('🏢 Seeding branches...');
        const branches = await insertReturning(db, schema.branches, [
            { name: 'Main Branch' },
            { name: 'North Branch' },
            { name: 'South Branch' },
            { name: 'East Branch' },
        ]);
        console.log(`✅ Created ${branches.length} branches\n`);

        // 4. Seed Buildings
        console.log('🏗️ Seeding buildings...');
        const buildings = await insertReturning(db, schema.buildings, [
            // Main Branch Buildings
            { name: 'Building A', branchId: branches[0].id },
            { name: 'Building B', branchId: branches[0].id },
            { name: 'Building C', branchId: branches[0].id },
            // North Branch Buildings
            { name: 'North Tower 1', branchId: branches[1].id },
            { name: 'North Tower 2', branchId: branches[1].id },
            // South Branch Buildings
            { name: 'South Complex', branchId: branches[2].id },
            // East Branch Buildings
            { name: 'East Wing', branchId: branches[3].id },
        ]);
        console.log(`✅ Created ${buildings.length} buildings\n`);

        // 5. Seed Floors
        console.log('🔢 Seeding floors...');
        const floors = await insertReturning(db, schema.floors, [
            // Building A Floors
            { name: 'Ground Floor', buildingId: buildings[0].id },
            { name: '1st Floor', buildingId: buildings[0].id },
            { name: '2nd Floor', buildingId: buildings[0].id },
            { name: '3rd Floor', buildingId: buildings[0].id },
            // Building B Floors
            { name: 'Ground Floor', buildingId: buildings[1].id },
            { name: '1st Floor', buildingId: buildings[1].id },
            { name: '2nd Floor', buildingId: buildings[1].id },
            // Building C Floors
            { name: 'Ground Floor', buildingId: buildings[2].id },
            { name: '1st Floor', buildingId: buildings[2].id },
            // North Tower 1 Floors
            { name: 'Ground Floor', buildingId: buildings[3].id },
            { name: '1st Floor', buildingId: buildings[3].id },
            { name: '2nd Floor', buildingId: buildings[3].id },
            { name: '3rd Floor', buildingId: buildings[3].id },
            { name: '4th Floor', buildingId: buildings[3].id },
            // North Tower 2 Floors
            { name: 'Ground Floor', buildingId: buildings[4].id },
            { name: '1st Floor', buildingId: buildings[4].id },
            // South Complex Floors
            { name: 'Ground Floor', buildingId: buildings[5].id },
            { name: '1st Floor', buildingId: buildings[5].id },
            { name: '2nd Floor', buildingId: buildings[5].id },
            // East Wing Floors
            { name: 'Ground Floor', buildingId: buildings[6].id },
            { name: '1st Floor', buildingId: buildings[6].id },
        ]);
        console.log(`✅ Created ${floors.length} floors\n`);

        // 6. Seed Rooms
        console.log('🚪 Seeding rooms...');
        const rooms: any[] = [];
        
        // Create rooms for each floor (4 rooms per floor)
        for (const floor of floors) {
            const floorNumber = floor.name.includes('Ground') ? 0 : parseInt(floor.name.match(/\d+/)?.[0] || '0');
            const baseRoomNumber = floorNumber * 100 + 100;
            
            rooms.push(
                { name: `Room ${baseRoomNumber + 1}`, floorId: floor.id },
                { name: `Room ${baseRoomNumber + 2}`, floorId: floor.id },
                { name: `Room ${baseRoomNumber + 3}`, floorId: floor.id },
                { name: `Room ${baseRoomNumber + 4}`, floorId: floor.id },
            );
        }
        
        const createdRooms = await insertReturning(db, schema.rooms, rooms);
        console.log(`✅ Created ${createdRooms.length} rooms\n`);

        // 7. Seed Teams
        console.log('👥 Seeding teams...');
        const teams = await insertReturning(db, schema.teams, [
            { name: 'Development Team', leaderId: null },
            { name: 'Design Team', leaderId: null },
            { name: 'QA Team', leaderId: null },
            { name: 'DevOps Team', leaderId: null },
            { name: 'Management Team', leaderId: null },
        ]);
        console.log(`✅ Created ${teams.length} teams\n`);

        // 8. Seed Users
        console.log('👤 Seeding users...');
        const hashedPassword = await argon2.hash('password123');
        
        const users = await insertReturning(db, schema.users, [
            // Development Team
            {
                name: 'John Doe',
                email: 'john.doe@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: true,
                teamId: teams[0].id,
            },
            {
                name: 'Jane Smith',
                email: 'jane.smith@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: false,
                teamId: teams[0].id,
            },
            {
                name: 'Mike Johnson',
                email: 'mike.johnson@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: false,
                teamId: teams[0].id,
            },
            // Design Team
            {
                name: 'Sarah Williams',
                email: 'sarah.williams@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: true,
                teamId: teams[1].id,
            },
            {
                name: 'Tom Brown',
                email: 'tom.brown@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: false,
                teamId: teams[1].id,
            },
            // QA Team
            {
                name: 'Emily Davis',
                email: 'emily.davis@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: true,
                teamId: teams[2].id,
            },
            {
                name: 'Robert Wilson',
                email: 'robert.wilson@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: false,
                teamId: teams[2].id,
            },
            // DevOps Team
            {
                name: 'Lisa Anderson',
                email: 'lisa.anderson@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: true,
                teamId: teams[3].id,
            },
            // Management Team
            {
                name: 'David Martinez',
                email: 'david.martinez@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: true,
                teamId: teams[4].id,
            },
            {
                name: 'Emma Garcia',
                email: 'emma.garcia@company.com',
                password: hashedPassword,
                isVerified: true,
                isLeader: false,
                teamId: teams[4].id,
            },
        ]);
        console.log(`✅ Created ${users.length} users\n`);

        // Update team leaders
        console.log('👑 Updating team leaders...');
        await db.update(schema.teams).set({ leaderId: users[0].id }).where(eq(schema.teams.id, teams[0].id));
        await db.update(schema.teams).set({ leaderId: users[3].id }).where(eq(schema.teams.id, teams[1].id));
        await db.update(schema.teams).set({ leaderId: users[5].id }).where(eq(schema.teams.id, teams[2].id));
        await db.update(schema.teams).set({ leaderId: users[7].id }).where(eq(schema.teams.id, teams[3].id));
        await db.update(schema.teams).set({ leaderId: users[8].id }).where(eq(schema.teams.id, teams[4].id));
        console.log(`✅ Team leaders updated\n`);

        // 9. Seed Tasks
        console.log('📋 Seeding tasks...');
        const tasks = await insertReturning(db, schema.tasks, [
            {
                name: 'Implement user authentication',
                description: 'Add JWT-based authentication with refresh tokens',
                createdBy: users[0].id,
                assignedTo: users[1].id,
                taskPriority: priorities[2].id, // High
                taskStatus: statuses[1].id, // In Progress
                deadline: new Date('2025-11-01'),
            },
            {
                name: 'Design landing page',
                description: 'Create modern landing page with responsive design',
                createdBy: users[3].id,
                assignedTo: users[4].id,
                taskPriority: priorities[1].id, // Medium
                taskStatus: statuses[1].id, // In Progress
                deadline: new Date('2025-10-28'),
            },
            {
                name: 'Write unit tests for API',
                description: 'Achieve 80% code coverage with Jest tests',
                createdBy: users[5].id,
                assignedTo: users[6].id,
                taskPriority: priorities[1].id, // Medium
                taskStatus: statuses[0].id, // Backlog
                deadline: new Date('2025-11-15'),
            },
            {
                name: 'Setup CI/CD pipeline',
                description: 'Configure GitHub Actions for automated deployment',
                createdBy: users[7].id,
                assignedTo: users[7].id,
                taskPriority: priorities[2].id, // High
                taskStatus: statuses[3].id, // Completed
                deadline: new Date('2025-10-20'),
            },
            {
                name: 'Database optimization',
                description: 'Add indexes and optimize slow queries',
                createdBy: users[0].id,
                assignedTo: users[2].id,
                taskPriority: priorities[3].id, // Critical
                taskStatus: statuses[2].id, // In Review
                deadline: new Date('2025-10-25'),
            },
            {
                name: 'Update documentation',
                description: 'Update API documentation with latest endpoints',
                createdBy: users[8].id,
                assignedTo: users[9].id,
                taskPriority: priorities[0].id, // Low
                taskStatus: statuses[0].id, // Backlog
                deadline: new Date('2025-11-30'),
            },
            {
                name: 'Mobile app design mockups',
                description: 'Create design mockups for iOS and Android apps',
                createdBy: users[3].id,
                assignedTo: users[4].id,
                taskPriority: priorities[1].id, // Medium
                taskStatus: statuses[0].id, // Backlog
                deadline: new Date('2025-11-10'),
            },
            {
                name: 'Security audit',
                description: 'Perform comprehensive security audit and fix vulnerabilities',
                createdBy: users[5].id,
                assignedTo: users[6].id,
                taskPriority: priorities[3].id, // Critical
                taskStatus: statuses[1].id, // In Progress
                deadline: new Date('2025-10-22'),
            },
        ]);
        console.log(`✅ Created ${tasks.length} tasks\n`);

        console.log('✨ Database seeding completed successfully!\n');
        console.log('📊 Summary:');
        console.log(`   - Priorities: ${priorities.length}`);
        console.log(`   - Statuses: ${statuses.length}`);
        console.log(`   - Branches: ${branches.length}`);
        console.log(`   - Buildings: ${buildings.length}`);
        console.log(`   - Floors: ${floors.length}`);
        console.log(`   - Rooms: ${createdRooms.length}`);
        console.log(`   - Teams: ${teams.length}`);
        console.log(`   - Users: ${users.length}`);
        console.log(`   - Tasks: ${tasks.length}`);
        console.log('\n🔐 Default password for all users: password123\n');

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
}

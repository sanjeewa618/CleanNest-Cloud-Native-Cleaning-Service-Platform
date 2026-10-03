const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
  // Check all users with their passwords (hashed)
  const users = await p.user.findMany({
    select: { id: true, name: true, email: true, role: true, password: true }
  });
  console.log('=== ALL USERS ===');
  users.forEach(u => {
    console.log(`${u.role} | ${u.name} | ${u.email} | password_hash_start: ${u.password.substring(0, 20)}...`);
  });
  await p.$disconnect();
}
main();

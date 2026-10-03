const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function backfillCleanerDetails() {
  // Get all bookings that have a cleanerId but no cleanerName/cleanerEmail
  const bookings = await p.booking.findMany({
    where: {
      cleanerId: { not: null }
    },
    select: { id: true, cleanerId: true, cleanerName: true, cleanerEmail: true }
  });

  console.log(`Found ${bookings.length} bookings with a cleaner assigned`);

  for (const booking of bookings) {
    if (!booking.cleanerName || !booking.cleanerEmail) {
      const cleanerUser = await p.user.findUnique({
        where: { id: booking.cleanerId },
        select: { name: true, email: true }
      });
      if (cleanerUser) {
        await p.booking.update({
          where: { id: booking.id },
          data: {
            cleanerName: booking.cleanerName || cleanerUser.name,
            cleanerEmail: booking.cleanerEmail || cleanerUser.email
          }
        });
        console.log(`Updated booking ${booking.id} -> cleaner: ${cleanerUser.name} (${cleanerUser.email})`);
      }
    } else {
      console.log(`Booking ${booking.id} already has cleaner details, skipping.`);
    }
  }

  console.log('Backfill complete!');
  await p.$disconnect();
}

backfillCleanerDetails();

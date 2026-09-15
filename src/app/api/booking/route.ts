import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      serviceId,
      serviceName,
      price,
      barberId,
      barberName,
      date,
      timeSlot,
      clientName,
      clientPhone,
      clientEmail,
      specialRequests,
    } = body;

    if (!serviceId || !date || !timeSlot || !clientName || !clientPhone) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details" },
        { status: 400 }
      );
    }

    const appointmentId = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;

    // Generate ICS calendar content
    const startDateFormatted = date.replace(/-/g, "");
    const startTimeFormatted = timeSlot.replace(/[^0-9]/g, "").padEnd(4, "0");
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Atelier Mens Grooming//Appointment//EN
BEGIN:VEVENT
UID:${appointmentId}@atelierbarbershop.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${startDateFormatted}T${startTimeFormatted}00
SUMMARY:${serviceName} at Atelier Men's Grooming
DESCRIPTION:Master appointment with ${barberName}. 142 Elm St, Suite 104, Auburn AL. Phone: (334) 555-0192.
LOCATION:142 Elm Street, Suite 104, Auburn AL 36830
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointmentId,
        serviceName,
        price,
        barberName,
        date,
        timeSlot,
        clientName,
        clientPhone,
        clientEmail: clientEmail || "client@domain.com",
        status: "CONFIRMED",
        createdTime: new Date().toISOString(),
        smsPreview: `Atelier Grooming: Hi ${clientName}, your appointment for ${serviceName} with ${barberName} is confirmed for ${date} at ${timeSlot}. Reply 1 to confirm, 2 to reschedule. See you in the chair!`,
        icsCalendarString: icsContent,
        location: "142 Elm St, Suite 104, Auburn, AL",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Booking reservation failed" },
      { status: 500 }
    );
  }
}

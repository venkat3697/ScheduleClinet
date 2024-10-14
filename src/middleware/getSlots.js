export const getAvailableTimeSlots = (
  startDateProp,
  endDateProp,
  slotDurationProp
) => {
  const intervals = [];

  // Parse the input dates in UTC
  let startDate = new Date(startDateProp);
  let endDate = new Date(endDateProp);

  console.log("Parsed Start Date (UTC):", startDate.toISOString());
  console.log("Parsed End Date (UTC):", endDate.toISOString());

  const slotMinutes = slotDurationProp || 30; // Default to 30 minutes
  const slotDuration = slotMinutes * 60 * 1000; // Convert minutes to milliseconds

  // Validate the dates and the duration
  if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) {
    console.log("Invalid dates or start date is after end date.");
    return intervals; // Return empty array if invalid
  }

  const duration = endDate - startDate; // Total duration in milliseconds
  if (duration < slotDuration) {
    console.log("Duration is less than slot duration.");
    return intervals; // No slots if duration is less than slot duration
  }

  // Loop to generate time slots
  while (startDate < endDate) {
    let nextSlotTime = new Date(startDate.getTime() + slotDuration);

    if (nextSlotTime <= endDate) {
      intervals.push({
        slotStart: formatTimeToUTC(startDate), // Format start to UTC
        slotEnd: formatTimeToUTC(nextSlotTime), // Format end to UTC
        date: formatDateToUTC(startDate), // Format date to UTC
        slotID: generateSlotID(), // Generate a unique slot ID
        available: true,
      });
    } else {
      break; // Stop creating slots
    }

    startDate = nextSlotTime; // Move to the next slot
  }

  console.log("Available Time Slots:", intervals);
  return intervals;
};

// Helper function to format time as "HH:mm" in UTC
function formatTimeToUTC(date) {
  return date.toISOString().substring(11, 16); // Extract "HH:mm" from ISO string in UTC
}

// Helper function to format date as "YYYY-MM-DD" in UTC
function formatDateToUTC(date) {
  return date.toISOString().split("T")[0]; // Get "YYYY-MM-DD" from ISO string
}

// Helper function to generate a random 5-digit slot ID
function generateSlotID() {
  return Math.floor(Math.random() * 100000);
}

// Example usage
// const startDate = "2024-10-13T19:01:00Z";
// const endDate = "2024-10-13T21:01:00Z";
// const slotDuration = 30; // Slot duration in minutes
// const availableSlots = getAvailableTimeSlots(startDate, endDate, slotDuration);
// console.log(availableSlots);

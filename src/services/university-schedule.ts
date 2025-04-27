/**
 * Represents a university class.
 */
export interface UniversityClass {
  /**
   * The class name (e.g., Calculus 101).
   */
  className: string;
  /**
   * The day of the week the class is on (e.g., Monday, Wednesday).
   */
  dayOfWeek: string;
  /**
   * The start time of the class (e.g., 9:00 AM).
   */
  startTime: string;
  /**
   * The end time of the class (e.g., 9:50 AM).
   */
  endTime: string;
  /**
   * The location of the class.
   */
   location: string;
}

/**
 * Asynchronously retrieves the schedule for a student.
 *
 * @param studentId The ID of the student.
 * @returns A promise that resolves to an array of UniversityClass objects.
 */
export async function getStudentSchedule(studentId: string): Promise<UniversityClass[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      className: 'Calculus 101',
      dayOfWeek: 'Monday',
      startTime: '9:00 AM',
      endTime: '9:50 AM',
      location: 'Some Hall'
    },
    {
      className: 'Linear Algebra',
      dayOfWeek: 'Tuesday',
      startTime: '10:00 AM',
      endTime: '11:50 AM',
      location: 'Some Hall'
    },
  ];
}

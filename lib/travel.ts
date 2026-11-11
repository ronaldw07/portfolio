export type Place = {
  /** e.g. "Tokyo, Japan" */
  name: string;
  /** One line on why you love it. */
  note: string;
  /** Optional: a photo in public/, e.g. "/media/travel/tokyo.jpg". */
  photo?: string;
};

export const places: Place[] = [
  { name: "China", note: "Street food I still think about." },
  { name: "Japan", note: "The place I'd go back to tomorrow." },
];

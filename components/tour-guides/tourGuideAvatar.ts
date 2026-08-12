/** Gender-based avatars when a tour guide has no profile photo. */
export const TOUR_GUIDE_AVATAR_FEMALE = "/assets/tourist-guides/female.jpg";
export const TOUR_GUIDE_AVATAR_MALE = "/assets/tourist-guides/male.jpg";

export function isTourGuideFemale(
  gender: string | null | undefined,
): boolean {
  return Boolean(gender && /^(أنثى|female|f)$/i.test(gender.trim()));
}

export function tourGuidePlaceholderAvatar(
  gender: string | null | undefined,
): string {
  return isTourGuideFemale(gender)
    ? TOUR_GUIDE_AVATAR_FEMALE
    : TOUR_GUIDE_AVATAR_MALE;
}

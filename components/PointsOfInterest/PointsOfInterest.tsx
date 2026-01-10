import { fetchPointsOfInterest } from "./data";
import { PointsOfInterestCarousel } from "./PointsOfInterestCarousel";

export const PointsOfInterest = async () => {
  const points = await fetchPointsOfInterest();

  return <PointsOfInterestCarousel points={points} />;
};

export default PointsOfInterest;

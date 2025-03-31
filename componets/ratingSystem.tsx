interface RatingProps {
  rating: number;
}

export default function RatingSystem({ rating }: RatingProps) {
  const stars = Array.from({ length: rating }, (_, i) => (
    <span key={i}>⭐</span>
  ));
  return <div className="flex">{stars}</div>;
}

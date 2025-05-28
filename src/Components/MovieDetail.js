export function MovieDetail({ children, emoji }) {
  return (
    <p>
      <span>{emoji}</span>
      <span>{children}</span>
    </p>
  );
}

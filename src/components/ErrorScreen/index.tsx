interface IProps {
  error: Error;
}

/**
 * Show error screen
 */
export function ErrorScreen({ error }: IProps) {
  return (
    <section>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </section>
  );
}

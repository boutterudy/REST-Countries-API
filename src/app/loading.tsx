import Loader from '../components/Loader';

export default function Loading() {
  return (
    <main id="content">
      <Loader
        style={{
          display: 'block',
          margin: 'auto',
        }}
      />
    </main>
  );
}

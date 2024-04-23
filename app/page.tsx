import dynamic from "next/dynamic";
// Import GlobeComponent dynamically and only on the client side
const GlobeComponent = dynamic(() => import("./_components/Globe"), {
  ssr: false,
});

export default function Home() {
  // Example data
  const myData = [
    { lat: 51.5074, lng: -0.1278, size: 0.05, color: "red" },
    { lat: 40.7128, lng: -74.006, size: 0.05, color: "blue" },
    // Add more points as needed
  ];

  return (
    <main className="flex">
      <div className="w-full">
        <GlobeComponent />
      </div>
    </main>
  );
}
